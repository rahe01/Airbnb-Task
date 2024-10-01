const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 8000;

// Middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Verify Token Middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'unauthorized access' });
    }
    req.user = decoded;
    next();
  });
};

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ncq0h0t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const roomsCollection = client.db("stayVista").collection("rooms");

    // Auth related API
    app.post('/jwt', async (req, res) => {
      try {
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '365d',
        });
        res
          .cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true });
      } catch (error) {
        res.status(500).send({ message: "Error generating token" });
      }
    });



    // Get all rooms from the DB
    app.get("/rooms", async (req, res) => {
      try {
        const category = req.query.category;
        let query = {};
        if (category && category != "null") {
          query = { category };
        }
        const result = await roomsCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch rooms" });
      }
    });

    // Update priceWithTaxShow for all rooms
    app.patch("/rooms/update-tax-status", async (req, res) => {
      try {
        const { priceWithTaxShow } = req.body;
        const result = await roomsCollection.updateMany(
          {},
          { $set: { priceWithTaxShow: priceWithTaxShow } }
        );
        res.send({ success: true, result });
      } catch (error) {
        res.status(500).send({ success: false, message: "Failed to update status" });
      }
    });

    // Get rooms based on price range
app.get("/rooms/price-range", async (req, res) => {
  try {
    const minPrice = parseInt(req.query.minPrice, 10);
    const maxPrice = parseInt(req.query.maxPrice, 10);

    const query = {
      price: { $gte: minPrice, $lte: maxPrice }
    };

    const result = await roomsCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch rooms by price range" });
  }
});


    // Ping MongoDB
    await client.db('admin').command({ ping: 1 });
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error in the run function:', error);
  }
}

// Run the server and handle errors properly
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from Airbnb Server..');
});

app.listen(port, () => {
  console.log(`Airbnb is running on port ${port}`);
});
