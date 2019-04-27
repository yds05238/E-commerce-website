const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerceweb-7acd7.firebaseio.com"
});

const db = admin.firestore();

const app = express();
const port = 8080;
app.use(bodyParser.json());

app.get('/', (_, resp) => resp.send('Hello World!'));

const productsCollection = db.collection('products');
//const postsCollection2 = db.collection('posts2');
const usersCollection = db.collection('users');

// create a user
app.post('/user', async (req, resp) => {
  const user = req.body;
  const em = user.email;
  const snapShot = await usersCollection.doc(em).get();
  if (snapShot.exists) {
    resp.status(200).send('NOT_OK');
  } else {
    const addDoc = await usersCollection.doc(em).set(user);
    resp.status(200).send(addDoc.id);
  }
});

// read all users
app.get('/user', async (_, resp) => {
  const allUsersDoc = await usersCollection.get();
  resp.status(200).json(allUsersDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});
/*
// 2019-04-17
app.get('/contactcard/today', async (_, resp) => {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const todayPostsDoc = await contactsCollection.where('date', '==', todayString).get();
  resp.status(200).json(todayPostsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});

// sorted cards
app.get('/contactcard/sorted', async (_, resp) => {
  const sortedPosts = await contactsCollection.orderBy('date', 'desc').get();
  resp.status(200).json(sortedPosts.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});*/

// update a user
app.post('/user/:id', async (req, res) => {
  const id = req.params['id'];
  const newUser = req.body;
  await usersCollection.doc(id).update(newUser);
  res.status(200).send('UPDATED');
});

// delete a user
app.delete('/user/:id', async (req, res) => {
  const id = req.params['id'];
  await usersCollection.doc(id).delete();
  res.status(200).send('DELETED');
});


// create a product
app.put('/product', async (req, resp) => {
  const product = req.body;
  const addedDoc = await productsCollection.add(product);
  resp.status(200).send(addedDoc.id);
});

// read all products
app.get('/product', async (_, resp) => {
  const allProductsDoc = await productsCollection.get();
  resp.status(200).json(allProductsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});
/*
// 2019-04-17
app.get('/post/today', async (_, resp) => {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const todayPostsDoc = await postsCollection.where('date', '==', todayString).get();
  resp.status(200).json(todayPostsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});

// sorted posts
app.get('/post/sorted', async (_, resp) => {
  const sortedPosts = await postsCollection.orderBy('date', 'desc').get();
  resp.status(200).json(sortedPosts.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});*/

// update a product
app.post('/product/:id', async (req, res) => {
  const id = req.params['id'];
  const newProduct = req.body;
  await productsCollection.doc(id).update(newProduct);
  res.status(200).send('UPDATED');
});

// delete a product
app.delete('/product/:id', async (req, res) => {
  const id = req.params['id'];
  await productsCollection.doc(id).delete();
  res.status(200).send('DELETED');
});







/**
// create a post
app.put('/post2', async (req, resp) => {
  const post2 = req.body;
  const addedDoc = await postsCollection2.add(post2);
  resp.status(200).send(addedDoc.id);
});

// read all posts
app.get('/post2', async (_, resp) => {
  const allPostsDoc = await postsCollection2.get();
  resp.status(200).json(allPostsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});
// 2019-04-17
app.get('/post2/today', async (_, resp) => {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const todayPostsDoc = await postsCollection2.where('date', '==', todayString).get();
  resp.status(200).json(todayPostsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});

// sorted posts
app.get('/post2/sorted', async (_, resp) => {
  const sortedPosts = await postsCollection2.orderBy('date', 'desc').get();
  resp.status(200).json(sortedPosts.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});

// update a post
app.post('/post2/:id', async (req, res) => {
  const id = req.params['id'];
  const newPost = req.body;
  await postsCollection2.doc(id).update(newPost);
  res.status(200).send('UPDATED');
});

// delete a post
app.delete('/post2/:id', async (req, res) => {
  const id = req.params['id'];
  await postsCollection2.doc(id).delete();
  res.status(200).send('DELETED');
});
*/





app.listen(port, () => console.log(`Example app listening on port ${port}!`));
