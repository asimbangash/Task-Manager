const Task = require("../models/task");
const asyncWraper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const getAllTasks = asyncWraper( async(req,res)=>{
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
});

const createTask = asyncWraper( async(req,res)=>{
        const task = await Task.create(req.body);
        res.status(201).json({ task });
});

const getTasks = asyncWraper( async(req, res, next)=>{
        const { id:taskID } = req.params;
        const task = await Task.findOne({ _id:taskID });
        if(!task){
            return next(createCustomError(`no task with this id : ${ taskID }`, 404));
        }
        res.status(200).json({ task });
});

const deleteTask  = asyncWraper( async(req, res)=>{
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        if(!task){
            return next(createCustomError(`no task with this id : ${ taskID }`, 404));
        }
        res.status(200).json({ task });
});

const updateTask = asyncWraper( async(req,res)=>{
        const { id:taskID } = req.params;
        const task = await Task.findOneAndUpdate( { _id:taskID }, req.body, {
            new: true,
            runValidators:true
        });
        if(!task){
            return next(createCustomError(`no task with this id : ${ taskID }`, 404));
        };
        res.status(200).json({ task });
});

module.exports = {
    getAllTasks,createTask,getTasks,deleteTask,updateTask
}










// const getAllTasks = async(req,res)=>{
//     try {
//         const tasks = await Task.find();
//         res.status(200).json({ tasks });
//     } catch (error) {
//         res.status(500).json({ msg:error });
//     }
// }

// const createTask = async(req,res)=>{
//     try {
//         const task = await Task.create(req.body);
//         res.status(201).json({ task });
        
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }

// const getTasks = async(req, res)=>{
//     try {
//         const { id:taskID } = req.params;
//         const task = await Task.findOne({ _id:taskID });
//         if(!task){
//             return res.status(404).json({ msg: `no task with this id : ${ taskID }` });
//         }
//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }

// const deleteTask  = async(req, res)=>{
//     try {
//         const { id: taskID } = req.params;
//         const task = await Task.findOneAndDelete({ _id: taskID });
//         if(!task){
//             return res.status(404).json({ msg: `no task with this id : ${taskID}` });
//         }
//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({ msg:error })
//     }
// }

// const updateTask = async(req,res)=>{
//     try {
//         const { id:taskID } = req.params;
//         const task = await Task.findOneAndUpdate( { _id:taskID }, req.body, {
//             new: true,
//             runValidators:true
//         });
//         if(!task){
//             return res.status(404).json({ msg: `no task with this id: ${taskID}` });
//         };
//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({ msg:error })
//     }
// }

// module.exports = {
//     getAllTasks,createTask,getTasks,deleteTask,updateTask
// }