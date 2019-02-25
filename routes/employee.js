const { Router } = require('express');
const employeeRouter = Router();
const {
  getEmployees,
  createEmployee,
  getEmployeeById,
  assignEmployee
} = require('../controller/employee');

employeeRouter.get('/', getEmployees);
employeeRouter.post('/', createEmployee);
employeeRouter.get('/:id', getEmployeeById);
employeeRouter.post('/:id/assign', assignEmployee);

module.exports = employeeRouter;
