module.exports = (db, Sequelize) => {
  return db.define('employees', {
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
}



// Employees.belongsToMany(db.Projects, {
//     as: 'projects',
//     through: 'employee_projects',
//     foreignKey: 'employee_id'
// });
