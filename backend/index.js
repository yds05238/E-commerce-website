const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ecommerceweb-7acd7.firebaseio.com'
});

const db = admin.firestore();

const app = express();
const port = 8080;
app.use(bodyParser.json());

app.get('/', (_, resp) => resp.send('Hello World!'));

const usersCollection = db.collection('users');
const productsCollection = db.collection('products');

//Create accounts
app.put('/user', async (req, resp) => {
  const user = req.body;
  const allUsersDoc = await usersCollection.get();
  const users = [allUsersDoc.docs.map(doc => ({ id: doc.id, ...doc.data() }))];
  if (users.some(c => c.email === card.email)) {
    resp.status(200).send('NOT_OK');
  } else {
    const addedDoc = await usersCollection.add(user);
    resp.status(200).send(addedDoc.id);
  }
});


// Read all users
app.get('/user', async (_, resp) => {
  const allUsersDoc = await usersCollection.get();
  resp.status(200).json(allUsersDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});

// Update a user
app.post('/user/:id', async (req, res) => {
  const id = req.params['id'];
  const newUser = req.body;
  await usersCollection.doc(id).update(newUser);
  res.status(200).send('UPDATED');
});

// Delete a user
app.delete('/user/:id', async (req, res) => {
  const id = req.params['id'];
  await usersCollection.doc(id).delete();
  res.status(200).send('DELETED');
});

// Create a product
app.put('/product', async (req, resp) => {
  const product = req.body;
  const addedDoc = await productsCollection.add(product);
  resp.status(200).send(addedDoc.id);
});

// Read all products
app.get('/product', async (_, resp) => {
  const allProductsDoc = await productsCollection.get();
  resp.status(200).json(allProductsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});

// Update a product
app.post('/product/:id', async (req, res) => {
  const id = req.params['id'];
  const newProduct = req.body;
  await productsCollection.doc(id).update(newProduct);
  res.status(200).send('UPDATED');
});

// Delete a product
app.delete('/product/:id', async (req, res) => {
  const id = req.params['id'];
  await productsCollection.doc(id).delete();
  res.status(200).send('DELETED');
});



// login (set user to not be null) 
app.get('/login', async (req, resp) => {
  const user = req.body;
  const allUsersDoc = await usersCollection.get();
  const users = [allUsersDoc.docs.map(doc => ({ id: doc.id, ...doc.data() }))];
  if (users.some(c => c.email === user.email) && (c.password === user.password)) {
    resp.status(200).json(user);
  } else {
    resp.status(200).json(null);
  }
});


app.listen(port, () => console.log(`Web app listening on port ${port}!`));
