'use strict'

module.exports.getEmployees = (req, res, next) => {
  const { Employee } = req.app.get('models');
  const { Department } = req.app.get('models'); //require this in order to include it below
  Employee.findAll({include: [Department]}) //include Department and it becomes a property on the incoming GET
    .then( (employees) => {
      let emps = employees.map( (emps) => {
        return emps.dataValues;
      });
      res.render('employees', {emps});  //in PUG you just take it one dot further (emps.Department.whateverPropertyYouWanted)
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
  });
};


module.exports.getSingleEmployee = (req, res, next) => {
  const { Employee } = req.app.get('models');  
  Employee.findById(req.params.id) // love those built-in Sequelize methods
    .then( (employee) => {
      let emp = employee.dataValues;
      res.render('employee', {emp});
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
  });
};

// module.exports.postEmployee = (req, res, next) => {
//   const { Employee } = req.app.get('models');
//   const { Computer } = req.app.get('models');
//   Employee.findById(req.params.id) // love those built-in Sequelize methods
//   .then( (employee) => {
//     let emp = employee.dataValues;
//     res.render('employee', {emp});  
// })
// .catch( (err) => {
//   next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
// });
// };
