const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
//let myquery = { _id: ObjectId( req.params.id )};

/***************************************/
//              General                //
/***************************************/

//getStudent
recordRoutes.route("/api/user/getUser/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = {UserId: req.params.id};
  
  db_connect
      .collection("User")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

//post newUser Record
recordRoutes.route("/api/user/newUser").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { UserId: req.body.id};
  let myobj = {
    $set: req.body
  };
  db_connect.collection("User").updateOne(myquery, myobj, { upsert: true },function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//post newUser Empty Quiz Stats
recordRoutes.route("/api/user/:type/newUserQuizStats").post(function (req, response) {
  let courseType = req.params.type;
  let db_connect = dbo.getDb();
  let myquery = { UserId: req.body.id, topicNum: req.body.topicNum};
  let myobj = {
    $set: req.body
  };
  db_connect.collection(courseType+"QuizStats").updateOne(myquery, myobj, { upsert: true },function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//get user Quiz Stats
recordRoutes.route("/api/user/:type/getUserQuizStats/:topics/:UserId").get(function (req, res) {
  let courseType = req.params.type;
  let topics = JSON.parse(req.params.topics);
  let UserId = req.params.UserId;
  let db_connect = dbo.getDb();
  let myquery = { UserId: UserId, topicNum: {$in: topics}};
  db_connect
      .collection(courseType+"QuizStats")
      .aggregate(
        [
          {$match: myquery},
      ]).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});


/***************************************/
//                  LO                 //
/***************************************/

//Get a list of the possible topics for the course type
recordRoutes.route("/api/LO/getTopicDirectory/:type").get(function (req, res) {
  let courseType = req.params.type;
  let db_connect = dbo.getDb();
  let myquery = { type: "Directory"};
  
  db_connect
      .collection(courseType+"LO")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});


/***************************************/
//               COURSE                //
/***************************************/
//Post course Settings
recordRoutes.route("/api/courses/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { courseID: req.params.id};
  let myobj = {
    $set:{
          type: req.body.type,
          topics: req.body.topics,
          members: req.body.members
      }
  };
  db_connect.collection("Courses").updateOne(myquery, myobj, { upsert: true },function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//Get Course Details
recordRoutes.route("/api/getCourse/:OrgUnitId").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { courseID: req.params.OrgUnitId};
  db_connect
      .collection("Courses")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

/***************************************/
//                  QB                 //
/***************************************/

//Get random sample of Questions based on section
//Get Course Details
recordRoutes.route("/api/QB/getQuestions/:type/:sections/:numQ").get(function (req, res) {
  let courseType = req.params.type;
  let sections = JSON.parse(req.params.sections);
  let numQ = parseInt(req.params.numQ);
  let db_connect = dbo.getDb();
  let myquery = { section: {$in: sections}};
  db_connect
      .collection(courseType+"QB")
      .aggregate(
        [
          {$match: myquery},
          {$sample:{size: numQ}}
      ]).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

/***************************************/
//             Student Data            //
/***************************************/
//Post initial Student data for a class
recordRoutes.route("/api/initStudent").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { email: req.body.email};
  let myobj = {
    $set:{
          name: req.body.name,
          courseID: req.body.courseID,
          userThumb: req.body.userThumb
      }
  };
  db_connect.collection("Student").updateOne(myquery, myobj, { upsert: true },function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//Get students from Course
recordRoutes.route("/api/getStudents/:OrgUnitId").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { courseID: req.params.OrgUnitId};
  db_connect
      .collection("Student")
      .find(myquery)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

//Post Add Parents
recordRoutes.route("/api/addParents").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { userThumb: req.body.userThumb};
  let myobj = {
    $set:{
          parents: req.body.parents
      }
  };
  db_connect.collection("Student").updateOne(myquery, myobj, { upsert: true },function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//Post Reflection
recordRoutes.route("/api/addReflection").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { email: req.body.email };
  let key = "reflections."+req.body.title;
  let myobj = {
    $set:{
          
      }
  };
  myobj["$set"][key] = req.body.reflection;
  db_connect.collection("Student").updateOne(myquery, myobj, { upsert: true },function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});


// Adds/Updates user of OrgUnit by email
recordRoutes.route("/api/update").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { email: req.body.email};
  let myobj = {
    $set:{
          Skills: req.body.skills
      }
  };
  db_connect.collection(req.body.OrgUnitId).updateOne(myquery, myobj, { upsert: true },function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// Adds/Updates user of OrgUnit by email
recordRoutes.route("/api/updateSkillsTemplate").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { template: "skills"};
  let myobj = {
    $set:{
          Skills: req.body.skills
      }
  };
  db_connect.collection(req.body.OrgUnitId).updateOne(myquery, myobj, { upsert: true },function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//UpdateChemistry Learning Objectives
recordRoutes.route("/api/updateChemistryLO").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = {};
  let myobj = req.body;
  db_connect.collection("ChemistryLO").insertOne(myobj, { upsert: true },function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//UpdateChemistry QuestionBank
recordRoutes.route("/api/updateChemistryQB").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = {};
  let myobj = req.body;
  db_connect.collection("ChemistryQB").insertOne(myobj, { upsert: true },function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

recordRoutes.route("/api/skillsTemplate/:OrgUnitId").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { template: "skills"};
  db_connect
      .collection(req.params.OrgUnitId)
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

recordRoutes.route("/api/skills/:OrgUnitId/:email").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = {email: req.params.email};
  db_connect
      .collection(req.params.OrgUnitId)
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you get a list of all the records.
recordRoutes.route("/api/:OrgUnitId").get(function (req, res) {
  let db_connect = dbo.getDb("BH");
  db_connect
    .collection(req.params.OrgUnitId)
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});


module.exports = recordRoutes;