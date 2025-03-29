const Task = require("../models/Task");

let message = "";
let type = "";

const getAllTasks = async (req,res) => {
    try {
        const userId = req.params.user;
        // apos um segundos, se recarregar a pagina, notificacao desaparece
        setTimeout(() => {
            message = ''
        }, 1000);
        const taskList = await Task.find({userId});
        return res.render("index", {
            userId,
            taskList, 
            task: null, 
            taskDelete: null,
            message,
            type
        });
    } catch (err) {
        res.status(500).send({error: err.message})
    }
};

const createTask = async (req,res) => {
    const task = req.body;
    const userId = req.params.user;
    if(!task.task){
        message = 'Insira um texto antes de adicionar a tarefa!'
        type = 'danger'
        return res.redirect(`/task/${userId}`)
    }

    try {
        const taskModel = {
            task: task.task,
            userId
        }
        const response = await Task.create(taskModel)
        message = 'Tarefa criada com sucesso!'
        type = 'success'
        return res.redirect(`/task/${userId}`)
    } catch (err) {
        res.status(500).send({error: err.message})
    }
}

const getById = async (req,res) => {
    try {
        const userId = req.params.user;
        const taskList = await Task.find({userId});
        if(req.params.method == "update"){
            const task = await Task.findOne({_id: req.params.id});
            res.render("index",{
                userId,
                task,
                taskList, 
                taskDelete: null,
                message,
                type
            })
        }else{
            const taskDelete = await Task.findOne({_id: req.params.id});
            res.render("index",{
                userId,
                task: null,
                taskList, 
                taskDelete,
                message,
                type
            })
        }
    } catch (err) {
        res.status(500).send({error: err.message})
    }
}

const updateOneTask = async (req,res) => {
    try {
        const userId = req.params.user;
        const task = req.body;
        await Task.updateOne({_id: req.params.id}, task)
        message = 'Tarefa atualizada com sucesso!'
        type = 'success'
        res.redirect(`/task/${userId}`)
    } catch (err) {
        res.status(500).send({error: err.message})
    }
}

const deleteOneTask = async (req,res) => {
    try {
        const userId = req.params.user;
        await Task.deleteOne({_id: req.params.id})
        message = 'Tarefa deletada com sucesso!'
        type = 'success'
        res.redirect(`/task/${userId}`)
    } catch (err) {
        res.status(500).send({error: err.message})
    }
}

const taskCheck = async (req,res) => {
    try {
        const task = await Task.findOne({_id: req.params.id});
        task.check = !task.check;
        await Task.updateOne({_id: req.params.id}, task);
        res.redirect(`/task/${task.userId}`);
    } catch (err) {
        res.status(500).send({error: err.message})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getById,
    updateOneTask,
    deleteOneTask,
    taskCheck,

};