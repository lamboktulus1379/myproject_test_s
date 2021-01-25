import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as admin from "firebase-admin";
import firebase from "firebase"
import * as express from "express";
import * as bodyParser from "body-parser";
import {Product} from "./interfaces/product.model";

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

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5nAHP7qZ1JH222lUVrsLOktzexhVzXhc",
  authDomain: "message-dbb84.firebaseapp.com",
  databaseURL: "https://message-dbb84.firebaseio.com",
  projectId: "message-dbb84",
  storageBucket: "message-dbb84.appspot.com",
  messagingSenderId: "183096149608",
  appId: "1:183096149608:web:c9d50c64c048daeafa5ddd",
  measurementId: "G-BWHX9HX0C2"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database();

var productRef = db.ref("products");
// define goodle cloud function name
export const webApi = functions.https.onRequest(main);


// Create new product
app.post("/products", async (req, res) => {
  try {
    const product: Product = {
      name: req.body["name"],
      price: req.body["price"],
      quantity: req.body["quantity"],
    };

    const newDoc = await productRef.push(product);
    res.status(201).send(`Cread a new product: ${newDoc}`);
  } catch (e) {
    res.status(400).send(`product should contain name, price, quantity!!!`)
  }
});

// Get all product
app.get("/products", async (req, res) => {
  try {
    const productQuerySnapshot = await db.ref("products").get();
    const products: any[] = [];

    productQuerySnapshot.forEach((doc) => {
      products.push({
        name: doc.child("name"),
        price: doc.child("price"),
        quantity: doc.child("quantity"),      
      });
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single product
app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  console.log(productId);
  db.ref("products/" + productId).get().then(product => {
       if (!product.exists) throw new Error("product not found");
       let pr = product.val();
       console.log(product, pr);
    res.status(200).json(pr);

  // }).catch(error => res.status(500).send(error));
  // db.collection(productCollection).doc(productId).get().then(product => {
  //   if (!product.exists) throw new Error("product not found");
  //   res.status(200).json({id: product.id, data: product.data})

  }).catch(error => res.status(500).send(error));
});

// Delete a product
app.delete("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  // db.collection(productCollection).doc(req.params.productId).delete()
  // .then(() => res.status(204).send("Document successfully deleted!"))
  // .catch(function(error)  {
  //   res.status(500).send(error);
  // });
  let product = db.ref('products/' + productId).remove();

  res.status(200).send("Product successfully removed");
});

// Update a product
app.put("/products/:productId", (req, res) => {
  const productId = req.params.productId;

  db.ref("products").child(productId).update({
    "name": "AA",
    "price": 123,
    "quantity": 234
  });
  res.status(200).send("Product updated successfully");
})
