const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// middle were
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bfaqolh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const doctorCollection = client.db('doctorsCollection').collection('services');

    app.post('/service', async (req, res) => {
      const doctorServices = req.body;
      console.log(doctorServices);
      const result = await doctorCollection.insertOne(doctorServices);
      res.send(result);
    })

    app.get('/service', async (req, res) => {
      const cursor = doctorCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/service/:id', async (req, res) => {
      const id = req.params.id;
      const qurey = { _id: new ObjectId(id) }
      const result = await doctorCollection.findOne(qurey);
      res.send(result);
    })

    // Services


    app.get('/services/:email', async (req, res) => {
      const result = await doctorCollection.find({ providerEmail: req.params.email }).toArray();
      res.send(result)
      })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('assignment eleven server is running')
})

app.listen(port, () => {
  console.log(`Assignment eleven server is running ${port}`)
})