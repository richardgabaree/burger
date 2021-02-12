const express = require("express");
const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log('GET', hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  burger.create([
    "burger_name", "devour"
  ], [
    req.body.burger_name, req.body.devour
  ], function() {
    res.redirect("/");
  });
});

router.put('/api/burgers/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log('condition', condition);

  burger.update(
    {
      devour: req.body.devour,
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.delete('/api/burgers/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('con', condition);

  burger.delete(condition, (result) => {
    if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});
// Export routes for server.js to use.
module.exports = router;