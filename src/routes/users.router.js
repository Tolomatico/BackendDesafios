const express = require("express")
const router = express.Router()
const usersModel = require("../models/users.model")
const {createHash} =require("../utils/hashBcrypt")
const passport  = require("passport")
const generateToken = require("../utils/jsonwebtoken")

/*
router.post("/", async (req, res) => {
    const { first_name, last_name, email, password, age, rol } = req.body
    const userPost = {
        first_name,
        last_name,
        email,
        password:createHash(password),
        age,
        rol: rol ? rol : "user"
    }

    try {

        const user = await usersModel.findOne({email:userPost.email})
        if(!user){
           const newUser= await usersModel.create(userPost)

            req.session.login=true
            req.session.user={
                ...newUser._doc
            }
        
         res.redirect("/products")
        
        }else{
            res.send("Ya se encuentra registrado un usuario con ese email")
        }

    } catch (error) {
        res.status(400).send({ error: "Error al crear el usuario" })
    }

})
*/

        /// Registro con JSON Web Token ///

// router.post("/",async (req,res)=>{
//     const {first_name,last_name,age,password ,email}=req.body
// try {
//     const user= await usersModel.findOne({email:email})
//     if(user){
//         return res.status(400).send({error:"Ya existe un usuario con ese email"})
//     }
//     const newUser= await usersModel.create({
//         first_name,
//         last_name,
//         email,
//         age,
//         password:createHash(password.toString())
//     })

//     const token=generateToken({id:newUser._id})
//     res.status(200).send({status:"success",token})
    
// } catch (error) {
//     return res.status(400).send({status:"error",message:"Credenciales invalidas"})
// }

// })

        /// passport register ///

router.post("/",passport.authenticate("register",{
        failureRedirect:"/failedregister"
}),async(req,res)=>{
    if(!req.user){
        return res.status(401).send({status:"error",message:"Credenciales invalidas"})
    }

    req.session.user={
        first_name:req.user.first_name,
        last_name:req.user.last_name,
        age:req.user.age,
        email:req.user.email
    }

    req.session.login=true
    res.redirect("/profile")


})

router.get("/failedregister",async (req,res)=>{
    try {
        res.send("Error al registrarse")
    } catch (error) {
        console.log(error)
    }
})    


module.exports = router