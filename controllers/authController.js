
exports.register = async (req, res)=>{
        // const { name,email,phone, password}= req.body;
        try {
            return res.status(200).json({message:"User create successfully."})
        } catch (error) {
            return res.status(500).json({error:error})
        }
}
