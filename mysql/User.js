const con = require('../connection')
const express = require('express')
const router = express.Router()
const uuid = require('uuid');

router.get('/user', async (req, res) => {
  con.query("SELECT * FROM fix_my_plot", function (err, result) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(result)
    }

  })
})


router.post('/userRegistration', async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const mobile = req.body.mobile;
    const user = req.body.user;

    // Generate a new UUID for the user
    const uid = uuid.v4();

    const sql = "INSERT INTO users (uid, firstName, lastName, email, password, mobile, user) VALUES ?";
    const values = [[uid, firstName, lastName, email, password, mobile, user]];

    con.query(sql, [values], function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });

  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Error while adding User"
    });
  }
});

router.post('/userlogin', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const sql = "SELECT * FROM users WHERE email = ?";

    con.query(sql, [email], function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(404).send({
            status: false,
            message: "User Not Found"
          });
        } else {
          // Here, you can handle the login logic based on the result returned
          // For example, check the password or generate a session token for the user
          if (result[0].password === password) {
            res.send(result);
          } else {
            res.send("Password not match")
          }

        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred during login"
    });
  }
});

router.post('/adminlogin', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const sql = "SELECT * FROM admin WHERE email = ?";

    con.query(sql, [email], function (err, result) {
      // res.send(result)
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(404).send({
            status: false,
            message: "Admin Not Found"
          });
        } else {
          // Here, you can handle the login logic based on the result returned
          // For example, check the password or generate a session token for the user
          if (result[1].password === password) {
            res.send(result[1]);
          } else {
            res.send("NOOO")
          }

        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred during login"
    });
  }
});

router.get('/find-admin/:id', async (req, res) => {
  try {
    const id = req.params.id
    const sql = "SELECT * FROM admin WHERE id = ?";

    con.query(sql, [id], function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(404).send({
            status: false,
            message: "Admin Not Found"
          });
        } else {
          // Here, you can handle the login logic based on the result returned
          // For example, check the password or generate a session token for the user
          res.send(result[0])

        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred during login"
    });
  }
});

router.get('/find-user/:id', async (req, res) => {
  try {
    const id = req.params.id
    const sql = "SELECT * FROM users WHERE uid = ?";

    con.query(sql, [id], function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(404).send({
            status: false,
            message: "User Not Found"
          });
        } else {
          // Here, you can handle the login logic based on the result returned
          // For example, check the password or generate a session token for the user
          res.send(result[0])

        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred during login"
    });
  }
});

router.get('/admin-seller', async (req, res) => {
  try {
    const sql = "SELECT * FROM users WHERE user = ?";

    con.query(sql, ["Seller"], function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(404).send({
            status: false,
            message: "User Not Found"
          });
        } else {
          // Here, you can handle the login logic based on the result returned
          // For example, check the password or generate a session token for the user
          res.send(result)

        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred during login"
    });
  }
});

router.get('/admin-buyer', async (req, res) => {
  try {
    const sql = "SELECT * FROM users WHERE user = ?";

    con.query(sql, ["Buyer"], function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(404).send({
            status: false,
            message: "User Not Found"
          });
        } else {
          // Here, you can handle the login logic based on the result returned
          // For example, check the password or generate a session token for the user
          res.send(result)

        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred during login"
    });
  }
});

router.post('/user-password-reset/:user', async (req, res) => {
  try {
    const id = req.params.user
    const password = req.body.password
    const sql = "UPDATE users set password = ? WHERE uid = ?";

    con.query(sql, [password, id], function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(404).send({
            status: false,
            message: "User Not Found"
          });
        } else {
          // Here, you can handle the login logic based on the result returned
          // For example, check the password or generate a session token for the user
          res.send(result)

        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred during login"
    });
  }
});

router.post('/update-user/:id', async (req, res) => {
  try {
    const id = req.params.id; // Get the user ID from the URL parameter
    // Extract the fields that can be updated from the request body
    const { email, password, firstName, lastName } = req.body;

    const sql =
      "UPDATE users SET email=?, password=?, firstName=?, lastName=? WHERE uid=?";
    const values = [email, password, firstName, lastName, id];

    con.query(sql, values, function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.affectedRows === 0) {
          res.status(200).send({
            status: false,
            message: "User not found or no changes made"
          });
        } else {
          res.send({
            status: true,
            message: "User updated successfully"
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred while updating the user"
    });
  }
});


// POST endpoint to handle adding or removing favorites
router.post('/favourite/:userId', (req, res) => {
  try{
  const userId = req.params.userId;
  const favorite = req.body.favorite;

  // Query to check if the favorite already exists for the user
  const checkQuery = 'SELECT * FROM users WHERE uid = ?';
  con.query(checkQuery, [userId], (err, result) => {
    if (err) throw err;

    // Check if the user exists
    if (result.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const userFavorites = result[0].favourite ? JSON.parse(result[0].favourite) : [];

    // Check if the favorite is already present
    const favoriteIndex = userFavorites.indexOf(favorite);
    if (favoriteIndex !== -1) {
      // Remove the favorite if it already exists
      userFavorites.splice(favoriteIndex, 1);
    } else {
      // Add the favorite if it doesn't exist
      userFavorites.push(favorite);
    }

    // Update the user's favorites in the database
    const updateQuery = 'UPDATE users SET favourite = ? WHERE uid = ?';
    con.query(updateQuery, [JSON.stringify(userFavorites), userId], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Favorite updated successfully' });
    });
  });
}catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred while updating in user"
    });
  }
});



module.exports = router
