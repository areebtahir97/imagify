import userModel from "../models/userModel.js";
import FormData from 'form-data'
import axios from 'axios'

export const generateImage=async (req,res)=>{ //used to generate img using the prompt
try {
    const {userId,prompt}=req.body; //we get userid from token and prompt from body
    const user=await userModel.findById(userId)
    console.log("userId:", userId);
    console.log("prompt:", prompt);
    console.log("req.body:", req.body);
    if (!user || !prompt){      
        return res.json({success:false,message:'Missing Details'})
    }
    if (user.creditBalance===0 || userModel.creditBalance<0){       //if credit balance is less than 0 or 0
        return res.json({success:false,message:'No Credit Balance',creditBalance:user.creditBalance})
    }
    //acc to api docs,the req must be in mltipart form data,so here we convert it
    const formData=new FormData()
    formData.append('prompt',prompt)
    //calling the api using axios
   const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
  headers: {
    'x-api-key': process.env.CLIPDROP_API,
    ...formData.getHeaders()
    } ,
    responseType: 'arraybuffer'  // ✅ CORRECT
    });
    //we have to convert bufferarray img to base64
    const base64Image=Buffer.from(data,'binary').toString('base64')
    const resultImage=`data:image/png;base64,${base64Image}`
    //deduct 1 credit and send response
    await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1});
    res.json({success:true,message:"Image Generated",creditBalance:user.creditBalance-1,resultImage})

} catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
}
}