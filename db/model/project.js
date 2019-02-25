module.exports = (db, Sequelize) => {
  return db.define('projects', {
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
}





// Projects.associate(model => {
//   Projects.belongsToMany(model.Employees, {
//     as: 'employees',
//     through: 'employee_projects',
//     foreignKey: 'project_id'
//   })
// })
