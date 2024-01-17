const Projects = require('./projects-model');

async function checkProjId(req, res, next){
    try {
        const project = await Projects.get(req.params.id);
        if(project){
            req.project = project;
            next();
        }else{
            next({ status: 404, message: `Could not find a project with id: ${req.params.id}`})
        }
    } catch (error) {
        next(error)
    }
}

async function projCreator(req,res,next){
    const { name, description, completed } = req.body;
    if(name !== undefined &&
         typeof name === 'string' &&
         name.length &&
         name.trim().length &&
         description !== undefined &&
         description.length &&
         completed !== undefined){
        next()
    }else{
        res.status(400).json({
            message: 'New projects need a name and description'
        })
    }
}

module.exports = {
    checkProjId,
    projCreator,
}
