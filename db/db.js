const Sequelize = require('sequelize');
const db = new Sequelize('newapi', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'localhost'
});

db.authenticate()
    .then(() => {
        console.log('\n\nconnection established');
    })
    .catch(err => {
        console.error('\n\nError occured at connection', err);
    })

const Projects = db.define('projects', {
    name: {
        type: Sequelize.STRING
    },
    duration: {
        type: Sequelize.INTEGER
    },
    cost: {
        type: Sequelize.INTEGER
    }
});

Projects.sync();

const Employees = db.define('employees', {
    name: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    },
    salary: {
        type: Sequelize.INTEGER
    },
    account_no: {
        type: Sequelize.INTEGER
    }
});

Employees.sync();

const EmployeeProjects = db.define('employee_projects', {
    project_id: {
        type: Sequelize.INTEGER
    },
    employee_id: {
        type: Sequelize.INTEGER
    }
})
EmployeeProjects.sync();

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

Employees.findAll({ raw: true })
    .then(employees => {
        console.log('\n\n findAll employees:\n', employees);
    })
    .catch(err => {
        console.error('Error occured find in findAll', err);
    });


Projects.findAll({ raw: true })
    .then(projects => {
        console.log('\n\nfindall projects:\n', projects);
    })

// ====================================================================
// 									ASSOCIATIONS
// ====================================================================

Employees.belongsToMany(Projects, {
    as: 'projects',
    through: 'employee_projects',
    foreignKey: 'employee_id'
})

Projects.belongsToMany(Employees, {
    as: 'employees',
    through: 'employee_projects',
    foreignKey: 'project_id'
})

//===================================================================
//===================================================================

Projects.find({
        raw: true,
        include: [{
            model: Employees,
            as: 'employees',
            required: false,
            attributes: ['id', 'name'],
            through: { attributes: [] }
        }],
        where: { id: 1 }
    })
    .then(projects => {
        console.log('\n\nfindone by id:\n', projects);
    })
    .catch(err => {
        console.log('\n\n error in findone: \n', err);
    })

module.exports = {
    db
};
