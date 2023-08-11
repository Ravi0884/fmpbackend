const con = require('../connection')
const express = require('express')
const router = express.Router()
const uuid = require('uuid');

const serializeArray = (array) => {
  return JSON.stringify(array);
};

const deserializeArray = (serializedArray) => {
  return JSON.parse(serializedArray);
};
router.post('/seller-listing', async (req, res) => {
  try {
    // Your previous code for extracting the request body values
    const user_id = req.body.id
    const propertyType = req.body.propertyType
    const buy = req.body.buy
    const rent = req.body.rent
    const rate = req.body.rate
    const state = req.body.state
    const dist = req.body.dist
    const full = req.body.full
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const mobile = req.body.mobile
    const bhk = req.body.bhk
    const selectedBathroom = req.body.selectedBathroom
    const parkingOption = req.body.parkingOption
    const selectedFloor = req.body.selectedFloor
    const propertyAge = req.body.propertyAge
    const propertyStatus = req.body.propertyStatus
    const furnishing = req.body.furnishing
    const category = req.body.category
    const length = req.body.length
    const plotType = req.body.plotType
    const pgFloor = req.body.pgFloor
    const pgFood = req.body.pgFood
    const pgBathroom = req.body.pgBathroom
    const pgFurnish = req.body.pgFurnish
    const pgParking = req.body.pgParking
    const imageNameArray = req.body.imageName;
    const date = new Date()
    const admin_approval = "Pending"

    // Serialize the imageNameArray before inserting into the database
    const serializedImageNames = serializeArray(imageNameArray);

    const sql = "INSERT INTO listed_project (user_id, propertyType, buy, rent, rate, state, dist, full, firstName, lastName, email, mobile, bhk, selectedBathroom, parkingOption, selectedFloor, propertyAge, propertyStatus, furnishing, category, length, plotType, pgFloor, pgFood, pgBathroom, pgFurnish, pgParking, imageName,date,admin_approval) VALUES ?";
    const values = [
      [
        user_id,
        propertyType,
        buy,
        rent,
        rate,
        state,
        dist,
        full,
        firstName,
        lastName,
        email,
        mobile,
        bhk,
        selectedBathroom,
        parkingOption,
        selectedFloor,
        propertyAge,
        propertyStatus,
        furnishing,
        category,
        length,
        plotType,
        pgFloor,
        pgFood,
        pgBathroom,
        pgFurnish,
        pgParking,
        serializedImageNames,
        date,
        admin_approval,
      ]
    ];

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



router.post('/filter-properties', async (req, res) => {
  try {
    const propertyType = req.body.propertyType;
    const buy = req.body.buy;
    const rent = req.body.rent;
    const minRate = req.body.minRate; // Minimum rate value from user input
    const maxRate = req.body.maxRate; // Maximum rate value from user input
    const state = req.body.state;
    const dist = req.body.dist;
    const full = req.body.full;
    const bhk = req.body.bhk
    const selectedBathroom = req.body.selectedBathroom
    const parkingOption = req.body.parkingOption
    const selectedFloor = req.body.selectedFloor
    const propertyAge = req.body.propertyAge
    const propertyStatus = req.body.propertyStatus
    const furnishing = req.body.furnishing
    const category = req.body.category
    const length = req.body.length
    const plotType = req.body.plotType
    const pgFloor = req.body.pgFloor
    const pgFood = req.body.pgFood
    const pgBathroom = req.body.pgBathroom
    const pgFurnish = req.body.pgFurnish
    const pgParking = req.body.pgParking
    // ... (other property filter options)

    let sql = "SELECT * FROM listed_project WHERE 1 = 1"; // Initial query

    // Add filters based on user input
    if (propertyType) sql += ` AND propertyType = '${propertyType}'`;
    if (buy) sql += ` AND buy = '${buy}'`;
    if (rent) sql += ` AND rent = '${rent}'`;
    if (minRate && maxRate) sql += ` AND rate BETWEEN ${minRate} AND ${maxRate}`;
    if (state) sql += ` AND state = '${state}'`;
    if (dist) sql += ` AND dist = '${dist}'`;
    if (full) sql += ` AND full = '${full}'`;
    if (bhk) sql += ` AND bhk = '${bhk}'`;
    if (selectedBathroom) sql += ` AND selectedBathroom = '${selectedBathroom}'`;
    if (parkingOption) sql += ` AND parkingOption = '${parkingOption}'`;
    if (selectedFloor) sql += ` AND selectedFloor = '${selectedFloor}'`;
    if (propertyAge) sql += ` AND propertyAge = '${propertyAge}'`;
    if (propertyStatus) sql += ` AND propertyStatus = '${propertyStatus}'`;
    if (furnishing) sql += ` AND furnishing = '${furnishing}'`;
    if (category) sql += ` AND category = '${category}'`;
    if (length) sql += ` AND length = '${length}'`;
    if (plotType) sql += ` AND plotType = '${plotType}'`;
    if (pgFloor) sql += ` AND pgFloor = '${pgFloor}'`;
    if (pgFood) sql += ` AND pgFood = '${pgFood}'`;
    if (pgBathroom) sql += ` AND pgBathroom = '${pgBathroom}'`;
    if (pgParking) sql += ` AND pgParking = '${pgParking}'`;
    if (pgFurnish) sql += ` AND pgFurnish = '${pgFurnish}'`;
    // ... (add other property filter options)

    con.query(sql, function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Error while filtering properties",
    });
  }
});


router.get('/found-listing/:id',async(req,res)=>{
  try{
    const id = req.params.id
    const sql = "SELECT * FROM listed_project WHERE user_id=?"
    con.query(sql,[id],function(err,result){
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(200).send({
            status: false,
            message: "Nothing found"
          });
        } else {
          // Here, you can handle the login logic based on the result returned
          // For example, check the password or generate a session token for the user
         res.send(result)
          
        }
      }
    });
  }catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred during login"
    });
  }
});

router.get('/find-property/:id',async(req,res)=>{
  try{
    const id = req.params.id
    const sql = "SELECT * FROM listed_project WHERE date=?"
    con.query(sql,[id],function(err,result){
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(200).send({
            status: false,
            message: "Nothing found"
          });
        } else {
         res.send(result)
          
        }
      }
    });
  }catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred during login"
    });
  }
});

router.get('/find-approval', async (req, res) => {
  try {
    const sql = "SELECT * FROM listed_project WHERE admin_approval  IN ('Pending')";
    con.query(sql, async function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(200).send({
            result,
            status: false,
            message: "Nothing found"
          });
        } else {
          res.send(result);
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred while fetching listings with pending approval"
    });
  }
});


router.get('/find-approved',async(req,res)=>{
  try{
    const sql = "SELECT * FROM listed_project WHERE admin_approval=?"
    con.query(sql,["Approve"],function(err,result){
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(200).send({
            result,
            status: false,
            message: "Nothing found"
          });
        } else {
          // Here, you can handle the login logic based on the result returned
          // For example, check the password or generate a session token for the user
         res.send(result)
          
        }
      }
    });
  }catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred during login"
    });
  }
});

router.get('/find-rejected',async(req,res)=>{
  try{
    const sql = "SELECT * FROM listed_project WHERE admin_approval=?"
    con.query(sql,["Reject"],function(err,result){
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(200).send({
            result,
            status: false,
            message: "Nothing found"
          });
        } else {
          // Here, you can handle the login logic based on the result returned
          // For example, check the password or generate a session token for the user
         res.send(result)
          
        }
      }
    });
  }catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred during login"
    });
  }
});


router.get('/find-all',async(req,res)=>{
  try{
    const sql = "SELECT * FROM listed_project"
    con.query(sql,function(err,result){
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(200).send({
            result,
            status: false,
            message: "Nothing found"
          });
        } else {
          // Here, you can handle the login logic based on the result returned
          // For example, check the password or generate a session token for the user
         res.send(result)
          
        }
      }
    });
  }catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred during login"
    });
  }
});

router.post('/admin-approval/:id', async (req, res) => {
  try {
    const date = req.params.id; // Get the listing ID from the URL parameter
    // Extract the fields that can be updated from the request body
    const { admin_approval, rank, propertyType } = req.body;

    // Check if there is an existing listing with the same propertyType and rank
    const checkSql = "SELECT * FROM listed_project WHERE propertyType = ? AND ranking = ?";
    const checkValues = [propertyType, rank];

    con.query(checkSql, checkValues, function (err, existingResult) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (existingResult.length > 0) {
          // If there is an existing listing with the same rank and propertyType
          // Update the existing listing's rank to ""
          const updateSql = "UPDATE listed_project SET ranking = '' WHERE propertyType = ? AND ranking = ?";
          const updateValues = [propertyType, rank];

          con.query(updateSql, updateValues, function (updateErr, updateResult) {
            if (updateErr) {
              res.status(500).send(updateErr);
            } else {
              // After updating the previous listing's rank, update the current listing's admin_approval and rank
              const updateCurrentSql = "UPDATE listed_project SET admin_approval = ?, ranking = ? WHERE date = ?";
              const updateCurrentValues = [admin_approval, rank, date];

              con.query(updateCurrentSql, updateCurrentValues, function (updateCurrentErr, updateCurrentResult) {
                if (updateCurrentErr) {
                  res.status(500).send(updateCurrentErr);
                } else {
                  if (updateCurrentResult.affectedRows === 0) {
                    res.status(200).send({
                      status: false,
                      message: "Listing not found or no changes made"
                    });
                  } else {
                    res.send({
                      status: true,
                      message: "Listing updated successfully"
                    });
                  }
                }
              });
            }
          });
        } else {
          // If there is no existing listing with the same rank and propertyType,
          // directly update the current listing's admin_approval and rank
          const updateCurrentSql = "UPDATE listed_project SET admin_approval = ?, ranking = ? WHERE date = ?";
          const updateCurrentValues = [admin_approval, rank, date];

          con.query(updateCurrentSql, updateCurrentValues, function (updateCurrentErr, updateCurrentResult) {
            if (updateCurrentErr) {
              res.status(500).send(updateCurrentErr);
            } else {
              if (updateCurrentResult.affectedRows === 0) {
                res.status(200).send({
                  status: false,
                  message: "Listing not found or no changes made"
                });
              } else {
                res.send({
                  status: true,
                  message: "Listing updated successfully"
                });
              }
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred while updating the listing"
    });
  }
});


router.get('/flat-ranking', async (req, res) => {
  try {
    // SQL query to get rankings ordered by rank where propertyType is House or Flat
    const sql = "SELECT * FROM listed_project WHERE ranking <> '' AND propertyType IN ('House/Flat') ORDER BY ranking ASC";

    con.query(sql, function (err, results) {
      if (err) {
        res.status(500).send(err);
      } else {
        // Check if there are any rankings in the results
        if (results.length === 0) {
          res.status(200).send({
            status: false,
            message: "No rankings found"
          });
        } else {
          // Return the rankings as a response
          res.send({
            status: true,
            rankings: results
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred while fetching rankings"
    });
  }
});

router.get('/plot-ranking', async (req, res) => {
  try {
    // SQL query to get rankings ordered by rank where propertyType is House or Flat
    const sql = "SELECT * FROM listed_project WHERE ranking <> '' AND propertyType IN ('Plot') ORDER BY ranking ASC";

    con.query(sql, function (err, results) {
      if (err) {
        res.status(500).send(err);
      } else {
        // Check if there are any rankings in the results
        if (results.length === 0) {
          res.status(200).send({
            status: false,
            message: "No rankings found"
          });
        } else {
          // Return the rankings as a response
          res.send({
            status: true,
            rankings: results
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred while fetching rankings"
    });
  }
});

router.get('/pg-ranking', async (req, res) => {
  try {
    // SQL query to get rankings ordered by rank where propertyType is House or Flat
    const sql = "SELECT * FROM listed_project WHERE ranking <> '' AND propertyType IN ('PG/Hostel') ORDER BY ranking ASC";

    con.query(sql, function (err, results) {
      if (err) {
        res.status(500).send(err);
      } else {
        // Check if there are any rankings in the results
        if (results.length === 0) {
          res.status(200).send({
            status: false,
            message: "No rankings found"
          });
        } else {
          // Return the rankings as a response
          res.send({
            status: true,
            rankings: results
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred while fetching rankings"
    });
  }
});


// Update a listing by its ID
router.post('/update-listing/:id', async (req, res) => {
  try {
    const date = req.params.id; // Get the listing ID from the URL parameter
    // Extract the fields that can be updated from the request body
    console.log(date);
    const {
      propertyType,
      buy,
      rent,
      rate,
      state,
      dist,
      full,
      firstName,
      lastName,
      email,
      mobile,
      bhk,
      selectedBathroom,
      parkingOption,
      selectedFloor,
      propertyAge,
      propertyStatus,
      furnishing,
      category,
      length,
      plotType,
      pgFloor,
      pgFood,
      pgBathroom,
      pgFurnish,
      pgParking
    } = req.body;

    const sql =
  "UPDATE listed_project SET propertyType=?, buy=?, rent=?,rate=?, state=?, dist=?, full=?, firstName=?, lastName=?, email=?, mobile=?, bhk=?, selectedBathroom=?, parkingOption=?, selectedFloor=?, propertyAge=?, propertyStatus=?, furnishing=?, category=?, length=?, plotType=?, pgFloor=?, pgFood=?, pgBathroom=?, pgFurnish=?, pgParking=? WHERE date=?";
const values = [
  propertyType,
  buy,
  rent,
  rate,
  state,
  dist,
  full,
  firstName,
  lastName,
  email,
  mobile,
  bhk,
  selectedBathroom,
  parkingOption,
  selectedFloor,
  propertyAge,
  propertyStatus,
  furnishing,
  category,
  length,
  plotType,
  pgFloor,
  pgFood,
  pgBathroom,
  pgFurnish,
  pgParking,
  date
];

con.query(sql, values, function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.affectedRows === 0) {
          res.status(200).send({
            status: false,
            message: "Listing not found or no changes made"
          });
        } else {
          res.send({
            status: true,
            message: "Listing updated successfully"
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred while updating the listing"
    });
  }
});

router.post('/interseted-buyer/:userId', (req, res) => {
  try{
  const userId = req.params.userId;
  const favorite = req.body.favorite;

  // Query to check if the favorite already exists for the user
  const checkQuery = 'SELECT * FROM listed_project WHERE date = ?';
  con.query(checkQuery, [userId], (err, result) => {
    if (err) throw err;

    // Check if the user exists
    if (result.length === 0) {
      res.status(404).json({ message: 'Listing not found' });
      return;
    }

    const userFavorites = result[0].interested_buyer ? JSON.parse(result[0].interested_buyer) : [];

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
    const updateQuery = 'UPDATE listed_project SET interested_buyer = ? WHERE date = ?';
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


router.get('/find-ranking',async(req,res)=>{
  try{
    
    const sql = "SELECT * FROM listed_project WHERE ranking>0"
    con.query(sql,function(err,result){
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(200).send({
            status: false,
            message: "Nothing found"
          });
        } else {
         res.send(result)
          
        }
      }
    });
  }catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred during login"
    });
  }
});


router.post('/blogregister', async (req, res) => {
  try {
    const name = req.body.name
    const message = req.body.message
    const image = req.body.image

    // Generate a new UUID for the user
    const uid = uuid.v4();

    const sql = "INSERT INTO blogs (id, name, message, image) VALUES ?";
    const values = [[uid, name, message, image]];

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
      message: "Error while adding Testimonial"
    });
  }
});

router.post('/update-blog/:id', async (req, res) => {
  try {
    const id = req.params.id; // Get the user ID from the URL parameter
    // Extract the fields that can be updated from the request body
    const { name, message, image } = req.body;

    const sql =
      "UPDATE blogs SET name=?, message=?, image=? WHERE id=?";
    const values = [name, message, image, id];

    con.query(sql, values, function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.affectedRows === 0) {
          res.status(200).send({
            status: false,
            message: "Testimonial not found or no changes made"
          });
        } else {
          res.send({
            status: true,
            message: "Testimonial updated successfully"
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred while updating the Testimonial"
    });
  }
});

router.get('/find-blog/:id', async (req, res) => {
  try {
    const id = req.params.id
    const sql = "SELECT * FROM blogs WHERE id = ?";

    con.query(sql, [id], function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(404).send({
            status: false,
            message: "Blog Not Found"
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
      message: "Error occurred while searching"
    });
  }
});

router.get('/admin-blog', async (req, res) => {
  try {
    const sql = "SELECT * FROM blogs ";

    con.query(sql, function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(404).send({
            status: false,
            message: "Blog Not Found"
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
      message: "Error occurred while searching"
    });
  }
});

router.post('/pressregister', async (req, res) => {
  try {
    const title = req.body.title
    const link = req.body.link
    const image = req.body.image

    // Generate a new UUID for the user
    const uid = uuid.v4();

    const sql = "INSERT INTO press (id, title, link, image) VALUES ?";
    const values = [[uid, title, link, image]];

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
      message: "Error while adding Press"
    });
  }
});

router.post('/update-press/:id', async (req, res) => {
  try {
    const id = req.params.id; // Get the user ID from the URL parameter
    // Extract the fields that can be updated from the request body
    const { title, link, image } = req.body;

    const sql =
      "UPDATE press SET title=?, link=?, image=? WHERE id=?";
    const values = [title, link, image, id];

    con.query(sql, values, function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.affectedRows === 0) {
          res.status(200).send({
            status: false,
            message: "Press not found or no changes made"
          });
        } else {
          res.send({
            status: true,
            message: "Press updated successfully"
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error occurred while updating the Press"
    });
  }
});

router.get('/find-press/:id', async (req, res) => {
  try {
    const id = req.params.id
    const sql = "SELECT * FROM press WHERE id = ?";

    con.query(sql, [id], function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(404).send({
            status: false,
            message: "Blog Not Found"
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
      message: "Error occurred while searching"
    });
  }
});

router.get('/admin-press', async (req, res) => {
  try {
    const sql = "SELECT * FROM press ";

    con.query(sql, function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(404).send({
            status: false,
            message: "Blog Not Found"
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
      message: "Error occurred while searching"
    });
  }
});


module.exports = router