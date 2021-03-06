import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import {User} from "./interfaces/user.model";

// Initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

// Initialize express server
const app = express();
const main = express();

// add the path to receive request and 
// set json as bodyParser to process the body
main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

//  intizlize the databse and the collection
const db = admin.firestore();
const userCollection = "users";

// define goodle cloud function name
export const webApi = functions.https.onRequest(main);
// Create new user
app.post("/users", async (req, res) => {
  try {
    const user: User = {
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      email: req.body["email"],
      areaNumber: req.body["areaNumber"],
      department: req.body["department"],
      id: req.body["id"],
      contactNumber: req.body["contactNumber"],
    };

    const newDoc = await db.collection(userCollection).add(user);
    res.status(201).send(`Cread a new user: ${newDoc.id}`);
  } catch (e) {
    res.status(400).send(`User should contain firstName, lastName, email, areaNumber, department, id and contactNumber!!!`)
  }
});

// Get all user
app.get("/users", async (req, res) => {
  try {
    const userQuerySnapshot = await db.collection(userCollection).get();
    const users: any[] = [];

    userQuerySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single User
app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  db.collection(userCollection).doc(userId).get().then(user => {
    if (!user.exists) throw new Error("User not found");
    res.status(200).json({id: user.id, data: user.data})

  }).catch(error => res.status(500).send(error));
});

// Delete a user
app.delete("/users/:userId", (req, res) => {
  db.collection(userCollection).doc(req.params.userId).delete()
  .then(() => res.status(204).send("Document successfully deleted!"))
  .catch(function(error)  {
    res.status(500).send(error);
  });
});

// Update a user
app.put("/users/:userId", (req, res) => {
   const user: User = {
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      email: req.body["email"],
      areaNumber: req.body["areaNumber"],
      department: req.body["department"],
      id: req.body["id"],
      contactNumber: req.body["contactNumber"],
    };

  db.collection(userCollection).doc(req.params.userId).update(user).then(() => {
    res.status(200).send("Document successfully updated!!!");
  }).catch((err) => {
    res.status(500).send(err);
  });
})