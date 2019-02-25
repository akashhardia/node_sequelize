const {
  fetchEmployeesFromdDB,
  createEmployeeInDB,
  fetchEmployeeByIdFromDB,
  assignEmployeeToProject
} = require('../services/employee');

function getEmployees(req, res) {
  fetchEmployeesFromdDB()
    .then(employees => {
      res.send(employees);
    });
}

function createEmployee(req, res) {
  const body = req.body;
  createEmployeeInDB(body.e_id, body.e_name, body.age, body.dob, body.account_no, body.salary, body.c_id)
    .then(employee => {
      res.send(employee);
    })
}

function getEmployeeById(req, res) {
  fetchEmployeeByIdFromDB(req.params.id)
    .then(employee => {
      res.send(employee);
    });
}

function assignEmployee(req, res) {
  assignEmployeeToProject(req.params.id, req.body)
    .then(message => {
      res.json({ 'response': message });
    })
}

module.exports = {
  getEmployees,
  createEmployee,
  getEmployeeById,
  assignEmployee
};
