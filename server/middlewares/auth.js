import jwt from 'jsonwebtoken';

const userAuth=async (req,res,next)=>{
    const {token}=req.headers; //extract token  from header

    if (!token){    //if token is not available
        return res.json({success:false,message:'Not Authorized.Login Again'})
    }
    try {
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET) //decode/verify the token
        if (tokenDecode.id){ //if token.id is available add that to the req.body 
            if (!req.body) req.body = {};   //to make sure req.body is initialized otherwise it will be undefined
            req.body.userId = tokenDecode.id;
        }else{
            return res.json({success:false,message:'Not Authorized.Login Again'})
        }

        next(); //will execute the controller func that will return the user credit

    } catch (error) {
        res.json({success:false,message:error.message})

    }
}

export default userAuth