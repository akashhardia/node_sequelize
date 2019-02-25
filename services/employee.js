const {
  Employees,
  Projects,
  EmployeeProjects
} = require('../db/sequelize');

function fetchEmployeesFromdDB() {
  return Employees.findAll({ raw: true })
    .then(projects => projects)
    .catch(err => {
      throw new Error('Error occured while fetching Projects', err);
    });
}

function createEmployeeInDB(id, name, age, dob, acc_no, salary, c_id) {
  return Employees.create({
    e_id: id,
    e_name: name,
    age: age,
    dob: dob,
    account_no: acc_no,
    salary: salary,
    c_id: c_id
  })
}

function fetchEmployeeByIdFromDB(id) {
  return Employees.findOne({
      where: { id: id },
      include: [{
        as: 'projects',
        model: Projects,
        attributes: ['id', 'name']
      }]
    })
    .then(project => project)
    .catch(err => {
      throw new Error('\n\n==== Error occured while fetching Employee ====\n', err);
    });
}

function assignEmployeeToProject(employee_id, body) {
  return Employees.findOne({
      where: { id: employee_id }
    })
    .then(employee => {
      if (employee)
        return Projects.findOne({ where: { id: body.project_id } })
      throw new Error('Employee doesnot exist');
    })
    .then(project => {
      if (project) {
        EmployeeProjects.findOrCreate({
            where: {
              'employee_id': employee_id,
              'project_id': body.project_id,
              'role_name': body.role_name
            },
            defaults: {
              'employee_id': employee_id,
              'project_id': body.project_id,
              'role_name': body.role_name
            }
          })
          .spread(function(found, created) {
            if (found)
              return 'Employee already assigned';
            if (created)
              return 'Employee assigned';
          })
      }
      else {
        throw new Error('Project doesnot exist');
      }
    })


}

module.exports = {
  fetchEmployeesFromdDB,
  createEmployeeInDB,
  fetchEmployeeByIdFromDB,
  assignEmployeeToProject
};
