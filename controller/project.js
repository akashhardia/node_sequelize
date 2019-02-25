const {
  fetchProjectsFromdDB,
  createProjectInDB,
  fetchProjectByIdFromDB,
  fetchProfitableProjectsFromDB
} = require('../services/project');

function getProjects(req, res) {
  fetchProjectsFromdDB()
    .then(projects => {
      res.send(projects)
    });
}

function createProject(req, res) {
  const body = req.body;
  createProjectInDB(body.p_id, body.p_name, body.duration, body.cost, body.c_id)
    .then(project => {
      res.send(project);
    })
}

function getProjectById(req, res) {
  fetchProjectByIdFromDB(req.params.id)
    .then(project => {
      res.send(project)
    });
}

function getProfitableProjects(req, res) {
  fetchProfitableProjectsFromDB()
    .then(projects => {
      res.json({ 'profitable_projects': projects });
    });
}

module.exports = {
  getProjects,
  createProject,
  getProjectById,
  getProfitableProjects
};
