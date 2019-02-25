const { Router } = require('express');
const projectRouter = Router();
const {
    getProjects,
    createProject,
    getProjectById,
    getProfitableProjects
} = require('../controller/project');

projectRouter.get('/', getProjects);
projectRouter.post('/', createProject);
projectRouter.get('/profitable', getProfitableProjects);
projectRouter.get('/:id', getProjectById);

module.exports = projectRouter;
