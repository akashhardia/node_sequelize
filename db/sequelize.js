const projectModel = require('./model/project');
const employeeModel = require('./model/employee');
// const employeeProjectsModel = require('./model/employee_projects');
const Sequelize = require('sequelize');

const db = new Sequelize('newapi', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: 'localhost'
});

db.authenticate()
  .then(() => {
    console.log('\n\n==== Connection stablished ====\n');
  })
  .catch(err => {
    console.error('\n\n Error occured at connection\n', err);
  })

const EmployeeProjects = db.define('employees_projects', {});
const Projects = projectModel(db, Sequelize);
const Employees = employeeModel(db, Sequelize);

Employees.belongsToMany(Projects, {
  as: 'projects',
  through: 'employee_projects',
  foreignKey: 'employee_id'
});

Projects.belongsToMany(Employees, {
  as: 'employees',
  through: 'employee_projects',
  foreignKey: 'project_id'
})

db.sync()
  .then(() => {
    console.log('\n==== Tables have been created ====\n');
  })

module.exports = {
  Projects,
  Employees,
  EmployeeProjects
};



// Employees.create({
//     id: 4,
//     name: 'Ujjawal',
//     age: '21',
//     salary: '300000',
//     account_no: '32347'
// });

// Projects.create({
//     id: 2,
//     name: 'React_app',
//     duration: '7',
//     cost: '40000'
// })

// EmployeeProjects.create({
//     id: 4,
//     project_id: 2,
//     employee_id: 4
// })

// Employees.findAll({ raw: true })
//     .then(employees => {
//         console.log('\n\n findAll employees:\n', employees);
//     })
//     .catch(err => {
//         console.error('Error occured find in findAll', err);
//     });


// Projects.findAll({ raw: true })
//     .then(projects => {
//         console.log('\n\nfindall projects:\n', projects);
//     })

// ====================================================================
// 									ASSOCIATIONS
// ====================================================================





//===================================================================
//===================================================================
// Projects.find({
//     // raw: true,
//     where: { id: 2 },
//     include: [{
//       model: Employees,
//       as: 'employees',
//       required: false,
//       attributes: ['id', 'name'],
//       through: { attributes: [] }
//     }]
//   })
//   .then(projects => {
//     console.log('\n\nfindone by id:\n', projects);
//   })
//   .catch(err => {
//     console.log('\n\n error in findone: \n', err);
//   })
