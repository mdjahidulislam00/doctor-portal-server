const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = 5000;

const app = express();
app.use(bodyParser.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.du1ey7l.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//Data insert to Patient Appointment
app.post('/addAppointment', async (req, res) => {
    const data = req.body;
    try {
        await client.connect();

        const db = client.db(process.env.DB_NAME);
        const coll = db.collection(process.env.DB_COLL);

        const result = await coll.insertOne(data);
        res.send(result.insertedId);
        console.log(result.insertedId);
      } finally {
        await client.close();
    }
})




app.listen(port, () => console.log('running on port 5000'))