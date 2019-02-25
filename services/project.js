const { Projects, Employees } = require('../db/sequelize');

function fetchProjectsFromdDB() {
  return Projects.findAll({ raw: true })
    .then(projects => projects)
    .catch(err => {
      throw new Error('Error occured while fetching Projects', err);
    });
}

function fetchProjectByIdFromDB(id) {
  return Projects.findOne({
      where: { id: id },
      include: [{
        model: Employees,
        as: 'employees',
        attributes: ['id', 'name']
      }]
    })
    .then(projects => projects)
    .catch(err => {
      console.log('\n\n==== error in findone: ====\n', err);
    });
}

function createProjectInDB(id, name, duration, cost, c_id) {
  return Projects.create({
    p_id: id,
    p_name: name,
    duration: duration,
    cost: cost,
    c_id: c_id
  });
}

function addSalariesOfEmployees(employees, duration) {
  let sum = 0;
  employees.forEach(function(employee) {
    sum += (employee.dataValues.salary / 12) * duration;
  });
  return sum;
}

function fetchProfitableProjectsFromDB() {
  return Projects.findAll({
      include: [{
        model: Employees,
        as: 'employees',
        attributes: ['name', 'salary']
      }]
    })
    .then(projects => {
      const profitableProjects = projects.filter(project => {
        return project.cost > addSalariesOfEmployees(project.employees, project.duration);
      });
      return profitableProjects
    })
    .catch(err => {
      throw new Error('Error occured while fetching Profitable Projects', err);
    });
}

module.exports = {
  fetchProjectsFromdDB,
  createProjectInDB,
  fetchProjectByIdFromDB,
  fetchProfitableProjectsFromDB
};
