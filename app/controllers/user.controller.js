const db = require("../models");
const User = db.users;
// Create and Save a new User Data
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({ message: "Data can not be empty!" });
    return;
  }

    // res.status(400).send({ message: req.body})
  // Create a User Data
  const user = new User({
    userName: req.body.userName,
    accountNumber: req.body.accountNumber,
    emailAddress: req.body.emailAddress,
    identityNumber: req.body.identityNumber
  });
//   Save User Data in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user data."
      });
    });
};
// Retrieve all User Data from the database.
exports.findAll = (req, res) => {
    const userName = req.query.userName;
    var condition = userName ? { userName: { $regex: new RegExp(userName), $options: "i" } } : {};
    User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving User data."
        });
      });
};
// Find a single User Data with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User Data with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User Data with id=" + id });
      });
};
// Find a single User Data with an AccountNumber
exports.findAccountNum = (req, res) => {
  const accountNum= req.params.accountNumber;
  User.find({accountNumber : accountNum })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User Data with Account Number " + accountNumber });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User Data with Account Number =" + accountNumber });
    });
};

// Find a single User Data with an IdentityNumber
exports.findIdentityNum = (req, res) => {
  const identityNum = req.params.identityNumber;
  User.find({identityNumber: identityNum})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User Data with Identity Number " + identityNumber });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User Data with Identity Number=" + identityNumber });
    });
};

// Update a User Data by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update User Data with id=${id}. Maybe User Data was not found!`
            });
          } else res.send({ message: "User Data was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating User Data with id=" + id
          });
        });
};
// Delete a User Data with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User Data with id=${id}. Maybe User Data was not found!`
          });
        } else {
          res.send({
            message: "User Data was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User Data with id=" + id
        });
      });
};
// Delete all User Data from the database.
exports.deleteAll = (req, res) => {
    User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} User Data were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all User Data."
      });
    });
};