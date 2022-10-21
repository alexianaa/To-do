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

const sign = async (req,res) => {
    try {
        return res.render("unsigned", {user: null, message: null, type: null})
    } catch (error) {
        return res.send({message: 'erro ao entrar na pagina', error: error})
    }
}

const register = async (req,res) => {
    try {
        return res.render("register", {user: null})
    } catch (error) {
        return res.send({message: 'erro ao entrar na pagina', error: error})
    }
}

const auth = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}).select('+password');

        if(!email || !password){
            message = 'Preencha todos os campos!'
            type = 'danger'
            return res.render('unsigned', {
                user: null,
                message,
                type
            })
        }

        if(!user){
            message = 'Email nao encontrado!'
            type = 'danger'
            return res.render('unsigned', {
                user: null,
                message,
                type
            })
        }

        if(!await bcrypt.compare(password, user.password)){
            message = 'Senha incorreta'
            type = 'danger'
            return res.render('unsigned', {
                user: null,
                message,
                type
            })
        }  

        user.password = undefined
        message = 'Login realizado com sucesso, bem vindo!'
        type = 'success'

        const taskList = await Task.find();

        return res.render("index",{
            // user, 
            // token: gerarToken({id: user.id}),
            taskList, 
            task: null,
            taskDelete: null,
            message,
            type
        })
            
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

const createUser = async (req,res) => {
    try {
        const email  = req.body.email;
        if (await User.findOne({email})){
            message = "Já existe uma conta cadastrada com esse e-mail!"
            type = "danger"
            return res.render("unsigned", {
                user: null,
                message,
                type
            })
        }else{
            const user = await User.create(req.body);
            message = "Conta cadastrada com sucesso"
            type = "success"
            user.password = undefined;
            return res.render("index",{
                // user, 
                // token: gerarToken({id: user._id})
                taskList: null, 
                task: null,
                taskDelete: null,
                message,
                type
            })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

module.exports = {
    createUser,
    auth,
    sign,
    register
};