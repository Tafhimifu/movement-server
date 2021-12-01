const express = require('express')
const app = express()
const cors = require('cors');
const admin = require("firebase-admin");
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.igc4i.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const port = process.env.PORT || 5000;
const serviceAccount = require("./movement-b0e2d-firebase-adminsdk-3w3hd-46d67e6182.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology:true });
async function verifyToken(req, res, next) {
  if (req.headers?.authorization?.startsWith('Bearer ')) {
      const token = req.headers.authorization.split(' ')[1];

      try {
          const decodedUser = await admin.auth().verifyIdToken(token);
          req.decodedEmail = decodedUser.email;
      }
      catch {

      }

  }
  next();
}
async function run() {
  try {
      await client.connect();
  const indoorCollection = client.db("movement").collection("indoor");
  const plantEventCollection = client.db("movement").collection("treeEvent");
  const usersCollection = client.db("movement").collection("users");
  const plantRegCollection = client.db("movement").collection("plantEventReg");
  const drainRegCollection = client.db("movement").collection("drainEventReg");
  const dustRegCollection = client.db("movement").collection("dustEventReg");
  const team1DataCollection = client.db("movement").collection("managementTeam");
  const team2DataCollection = client.db("movement").collection("supportTeam");
  const team3DataCollection = client.db("movement").collection("technicalTeam");
  const nurseriesDataCollection = client.db("movement").collection("nurseries");
  const shopDataCollection = client.db("movement").collection("onlineShop");
  const outdoorCollection = client.db("movement").collection("outdoorPlant");
  const supportDataCollection = client.db("movement").collection("support");
  const drainageCollection = client.db("movement").collection("drainageEvent");
  const dustCollection = client.db("movement").collection("dustbinEvent");
  const userDataCollection = client.db("movement").collection("userData");
 
 
  app.post('/load',(req,res) => {
    const dataLoad =req.body;
    console.log(dataLoad)
    indoorCollection.insertMany(dataLoad)
    .then(result => {
      console.log(result.insertedCount)
    
      res.send(result.insertedCount);
    })
    
  })
  app.get('/data',(req,res) => {
    indoorCollection.find({}).limit(20)
    .toArray((err,documents)=>{
      res.send(documents);
  
    })
  })
  app.post('/outdoorLoad',(req,res) => {
    const dataLoad =req.body;
    console.log(dataLoad)
    outdoorCollection.insertMany(dataLoad)
    .then(result => {
      console.log(result.insertedCount)
    
      res.send(result.insertedCount);
    })
    
  })
  app.get('/outdoorData',(req,res) => {
    outdoorCollection.find({}).limit(20)
    .toArray((err,documents)=>{
      res.send(documents);
  
    })
  })
  app.post('/drainage',(req,res) => {
    const dataLoad =req.body;
    console.log(dataLoad)
    drainageCollection.insertMany(dataLoad)
    .then(result => {
      console.log(result.insertedCount)
    
      res.send(result.insertedCount);
    })
    
  })
  app.get('/drainage',(req,res) => {
    drainageCollection.find({}).limit(20)
    .toArray((err,documents)=>{
      res.send(documents);
  
    })
  })
  app.post('/dust',(req,res) => {
    const dataLoad =req.body;
    console.log(dataLoad)
    dustCollection.insertMany(dataLoad)
    .then(result => {
      console.log(result.insertedCount)
    
      res.send(result.insertedCount);
    })
    
  })
  app.get('/dust',(req,res) => {
    dustCollection.find({}).limit(20)
    .toArray((err,documents)=>{
      res.send(documents);
  
    })
  })
 
  app.post('/treeLoad',(req,res) => {
    const plantLoad =req.body;
    console.log(plantLoad)
    plantEventCollection.insertMany(plantLoad)
    .then(result => {
      console.log(result.insertedCount)
    
      res.send(result.insertedCount);
    })
    
  })
  app.get('/treeData',(req,res) => {
    plantEventCollection.find({}).limit(20)
    .toArray((err,documents)=>{
      res.send(documents);
  
    })
  })
  app.post('/team1Load',(req,res) => {
    const plantLoad =req.body;
    console.log(plantLoad)
    team1DataCollection.insertMany(plantLoad)
    .then(result => {
      console.log(result.insertedCount)
    
      res.send(result.insertedCount);
    })
    
  })
  app.get('/team1Data',(req,res) => {
    team1DataCollection.find({}).limit(20)
    .toArray((err,documents)=>{
      res.send(documents);
  
    })
  })
  app.post('/team2Load',(req,res) => {
    const plantLoad =req.body;
    console.log(plantLoad)
    team2DataCollection.insertMany(plantLoad)
    .then(result => {
      console.log(result.insertedCount)
    
      res.send(result.insertedCount);
    })
    
  })
  app.get('/team2Data',(req,res) => {
    team2DataCollection.find({}).limit(20)
    .toArray((err,documents)=>{
      res.send(documents);
  
    })
  })
  app.post('/team3Load',(req,res) => {
    const plantLoad =req.body;
    console.log(plantLoad)
    team3DataCollection.insertMany(plantLoad)
    .then(result => {
      console.log(result.insertedCount)
    
      res.send(result.insertedCount);
    })
    
  })
  app.get('/team3Data',(req,res) => {
    team3DataCollection.find({}).limit(20)
    .toArray((err,documents)=>{
      res.send(documents);
  
    })
  })
  app.post('/plantReg',(req,res) => {
    const newReg =req.body;
    plantRegCollection.insertOne(newReg)
    .then(result => {
      res.send(result.insertOne > 0);
    })
  
  })
  app.get('/plantReg',(req,res) => {
    plantRegCollection.find({}).limit(20)
    .toArray((err,documents)=>{
      res.send(documents);
  
    })
  })
  app.post('/drainReg',(req,res) => {
    const newReg =req.body;
    drainRegCollection.insertOne(newReg)
    .then(result => {
      res.send(result.insertOne > 0);
    })
  
  })
  app.get('/drainReg',(req,res) => {
    drainRegCollection.find({}).limit(20)
    .toArray((err,documents)=>{
      res.send(documents);
  
    })
  })
  app.post('/dustReg',(req,res) => {
    const newReg =req.body;
    dustRegCollection.insertOne(newReg)
    .then(result => {
      res.send(result.insertOne > 0);
    })
  
  })
  app.get('/dustReg',(req,res) => {
    dustRegCollection.find({}).limit(20)
    .toArray((err,documents)=>{
      res.send(documents);
  
    })
  })
  app.post('/support', async (req,res) => {
    const support = req.body;
    
const result = await  supportDataCollection.insertOne(support);
res.json(result);
})
  app.get('/support/:id', async (req, res) => {
    const query = { _id: ObjectId(req.params.id) }
    const support = await supportDataCollection.findOne(query);
    res.json(support);
});
app.get('/support',(req,res) => {
  supportDataCollection.find({}).limit(20)
  .toArray((err,documents)=>{
    res.send(documents);

  })
})

  app.post('/nurseriesLoad',(req,res) => {
    const plantLoad =req.body;
    console.log(plantLoad)
    nurseriesDataCollection.insertMany(plantLoad)
    .then(result => {
      console.log(result.insertedCount)
    
      res.send(result.insertedCount);
    })
    
  })
  app.get('/nurseriesData',(req,res) => {
    nurseriesDataCollection.find({}).limit(20)
    .toArray((err,documents)=>{
      res.send(documents);
  
    })
  })
  app.post('/shopLoad',(req,res) => {
    const plantLoad =req.body;
    console.log(plantLoad)
    shopDataCollection.insertMany(plantLoad)
    .then(result => {
      console.log(result.insertedCount)
    
      res.send(result.insertedCount);
    })
    
  })
  app.get('/shopData',(req,res) => {
    shopDataCollection.find({}).limit(20)
    .toArray((err,documents)=>{
      res.send(documents);
  
    })
  })
  
  
  app.get('/users/:email', async (req, res) => {
    const email = req.params.email;
    const query = { email: email };
    const user = await usersCollection.findOne(query);
    let isAdmin = false;
    if (user?.role === 'admin') {
        isAdmin = true;
    }
    res.json({ admin: isAdmin });
})

app.post('/users', async (req, res) => {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    console.log(result);
    res.json(result);
});
app.post('/userData', async (req, res) => {
  const user = req.body;
  const result = await userDataCollection.insertOne(user);
  console.log(result);
  res.json(result);
});

app.put('/users', async (req, res) => {
    const user = req.body;
    const filter = { email: user.email };
    const options = { upsert: true };
    const updateDoc = { $set: admin };
    const result = await usersCollection.updateOne(filter, updateDoc, options);
    res.json(result);
});
app.put('/userData', async (req, res) => {
  const user = req.body;
  const filter = { email: user.email };
  const options = { upsert: true };
  const updateDoc = { $set: user };
  const result = await userDataCollection.updateOne(filter, updateDoc, options);
  res.json(result);
});
app.get('/usersData',(req,res) => {
  usersCollection.find({}).limit(20)
  .toArray((err,documents)=>{
    res.send(documents);

  })
})
app.get('/userData',(req,res) => {
  userDataCollection.find({}).limit(20)
  .toArray((err,documents)=>{
    res.send(documents);

  })
})
app.post('/users', verifyToken, async (req, res) => {
    const user = req.body;
    const requester = req.decodedEmail;
    if (requester) {
        const requesterAccount = await usersCollection.findOne({ email: requester });
        if (requesterAccount.role === 'admin') {
            const filter = { email: user.email };
            const updateDoc = { $set: { role: 'admin' } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        }
    }
    else {
        res.status(403).json({ message: 'you do not have access to make admin' })
    }

})



}
finally {
// await client.close();
}
}

run().catch(console.dir);
 app.listen(port, () => {
  console.log(`listening at ${port}`)
})
