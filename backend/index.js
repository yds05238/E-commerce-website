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

const postsCollection = db.collection('posts');
const postsCollection2 = db.collection('posts2');
const contactsCollection = db.collection('contacts');

// create a card
app.post('/contactcard', async (req, resp) => {
  const contact = req.body;
  const em = contact.email;
  const snapShot = await contactsCollection.doc(em).get();
  if (snapShot.exists) {
    resp.status(200).send('NOT_OK');
  } else {
    const addDoc = await contactsCollection.doc(em).set(contact);
    resp.status(200).send(addDoc.id);
  }
});

// read all contacts
app.get('/contactcard', async (_, resp) => {
  const allPostsDoc = await contactsCollection.get();
  resp.status(200).json(allPostsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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

// update a card
app.post('/contactcard/:id', async (req, res) => {
  const id = req.params['id'];
  const newPost = req.body;
  await contactsCollection.doc(id).update(newPost);
  res.status(200).send('UPDATED');
});

// delete a card
app.delete('/contactcard/:id', async (req, res) => {
  const id = req.params['id'];
  await contactsCollection.doc(id).delete();
  res.status(200).send('DELETED');
});

/*
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




// create a post
app.put('/post', async (req, resp) => {
  const post = req.body;
  const addedDoc = await postsCollection.add(post);
  resp.status(200).send(addedDoc.id);
});

// read all posts
app.get('/post', async (_, resp) => {
  const allPostsDoc = await postsCollection.get();
  resp.status(200).json(allPostsDoc.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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

// update a post
app.post('/post/:id', async (req, res) => {
  const id = req.params['id'];
  const newPost = req.body;
  await postsCollection.doc(id).update(newPost);
  res.status(200).send('UPDATED');
});

// delete a post
app.delete('/post/:id', async (req, res) => {
  const id = req.params['id'];
  await postsCollection.doc(id).delete();
  res.status(200).send('DELETED');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
