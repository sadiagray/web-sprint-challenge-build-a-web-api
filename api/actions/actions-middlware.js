const Actions = require('./actions-model')
const Project = require('../projects/projects-model')


async function checkId(req, res, next){
    try {
        const action = await Actions.get(req.params.id);
        if(action){
            req.action = action;
            next();
        }else{
            next({ status: 404, message: `Could not find an action with and id of: ${req.params.id}`})
        }
    } catch (error) {
        next(error)
    }
}

async function actionCreator(req,res,next){
    const { description, notes } = req.body;
    if(description !== undefined &&
         typeof description === 'string' &&
         description.length &&
         notes !== undefined &&
         notes.length &&
         notes.trim().length){
        next()
    }else{
        res.status(400).json({
            message: 'New actions need a name and description'
        })
    }
}

async function projectValidation(req,res,next){
    const { project_id } = req.body
    const validProject = await Project.get(project_id)
    try {
        if(validProject){
            next();
        }else{
            next({ status: 404, message: `Project with id: ${project_id} not found`})
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    checkId,
    actionCreator,
    projectValidation,
}
