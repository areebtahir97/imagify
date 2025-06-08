import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import razorpay from 'razorpay';
import transactionModel from '../models/transactionModel.js'

//Creating controller function for registering a user
const registerUser=async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        if (!name || !email || !password){      //if the request is missing details
            return res.json({success:false,message:'Missing Details'})
        }
        //For encrypting pw
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)
        const userData={name,email,password:hashedPassword}
        const newUser=new userModel(userData) //save userdata in mongo db database
        const user=await newUser.save()

        //For generating a token for then this userid
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token,user:{name:user.name}}) //Sennding back the response
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//Creating controller function for user login
const loginUser= async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email}) //will find the user with the provided email id (req.body)
        //if user is not available
        if (!user){ 
            return res.json({success:false,message:'User does not exist'})
        }

        const isMatch=await bcrypt.compare(password,user.password)  //compare given pw with db pw
        if (isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET) //gen token if pw is correct
            res.json({success:true,token,user:{name:user.name}})
        }else{
            return res.json({success:false,message:'Invalid credentials'})    
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//Creating controller function for user credit
const userCredits=async (req,res)=>{
    try {
        const {userId}=req.body //here we need to get the id from the body but we get it by using a middleware (userAuth)
        const user=await userModel.findById(userId)
        res.json({success:true,credits:user.creditBalance,user:
            {name:user.name}
        })  //will basically get the user credits
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const razorpayInstance=new razorpay({   //create a rp instance
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
})

const paymentRazorpay=async(req,res)=>{
    try {
        const {userId,planId}=req.body;
        const userData=await userModel.findById(userId) //find the given user in db
        if (!userId || !planId){    //if userid and plan id are not available
            return res.json({success:false,message:"Missing Details"})
        }
        let credits,plan,amount,date;

        switch (planId) {
            case 'Basic':
                plan='Basic'
                credits=100
                amount=10
                break;

            case 'Advanced':
                plan='Advanced'
                credits=500
                amount=50
                break;
            
            case 'Business':
                plan='Business'
                credits=5000
                amount=250
                break;

            default:
                return res.json({success:false,message:'Plan not found'})
                
        }

        date=Date.now() //store current time date stamp

        const transactionData={     //for storing the data in db we will create a model
            userId,plan,amount,credits,date
        }

        const newTransaction=await transactionModel.create(transactionData) //will store the trans data in mg sb
        
        const options={
            amount:amount*100, //because in razor pay e.g 150 is 1.50
            currency:process.env.CURRENCY,
            receipt:newTransaction._id
        }
        const order = await razorpayInstance.orders.create(options); // ✅ no callback
        res.json({ success: true, order });

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API Controller function to verify razorpay payment
const verifyRazorpay = async (req, res) => {
    try {

        const { razorpay_order_id } = req.body;

        // Fetching order data from razorpay
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        // Checking for payment status
        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment Failed' })
            }

            // Adding Credits in user data
            const userData = await userModel.findById(transactionData.userId)
            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, { creditBalance })

            // Marking the payment true 
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

            res.json({ success: true, message: "Credits Added" });
        }
        else {
            res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}




export {registerUser,loginUser,userCredits,paymentRazorpay,verifyRazorpay}