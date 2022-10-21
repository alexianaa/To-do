const User = require('../models/User');
const Task = require("../models/Task");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require('./config/auth.json')

let message = "";
let type = "";

function gerarToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

const createUser = async (req,res) => {
    try {
        const email  = req.body.email;
        if (await User.findOne({email})){
            message = "Já existe uma conta cadastrada com esse e-mail!"
            type = "danger"
            return res.redirect("/")
        }else{
            const user = await User.create(req.body);
            message = "Conta cadastrada com sucesso"
            type = "success"
            user.password = undefined;
            return res.send({
                user, 
                token: gerarToken({id: user._id})
            })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

// const login = async (req,res) => {
//     try {
//         const {email, password} = req.body;
//         const response = await User.findOne(email);
//         if(response){
//             const taskList = await Task.find();
//             message = 'Login efetuado com sucesso'
//             type = 'success'
//             return res.render("index", {
//                 taskList, 
//                 task: null, 
//                 taskDelete: null,
//                 message,
//                 type
//             });
//         }
//         return res.render("unsigned", {
//             user: null
//         });
//     } catch (error) {
//         res.status(500).send({error: error.message})
//     }
// }

const auth = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}).select('+password');

        if(!user){
            return res.status(400).send({error: 'Email nao encontrado'})
        }

        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error: 'Senha incorreta'})
        }  

        user.password = undefined
      
        return res.send({
            user, 
            token: gerarToken({id: user.id})
        })
            
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

module.exports = {
    createUser,
    auth
};