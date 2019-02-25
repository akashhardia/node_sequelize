module.exports = (db, Sequelize) => {
  return db.define('employee_projects', {
    project_id: {
      type: Sequelize.INTEGER
    },
    employee_id: {
      type: Sequelize.INTEGER
    }
  })
}
