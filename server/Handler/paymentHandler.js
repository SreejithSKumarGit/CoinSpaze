function validateEmail(input)
{
    return /\S+@\S+\.\S+/.test(input);
}

async function payment(req,res,next)
{
    try {
        if(req.body.email!=="")
        {
            if(validateEmail(req.body.email) && req.body.amount>=0)
            {
                return res.status(200).json({status:"Success",message:"Successfully initiated payment"})
            }
            else
            {
                return res.status(401).json({status:"Error",message:"Unauthorized"})
            }
        }
        else
        {
            return res.status(400).json({status:"Error",message:"Bad Request"})
        }
    } catch (error) {
        return res.status(400).json({status:"Error",message:"Bad Request"})
    }
}
module .exports=payment;