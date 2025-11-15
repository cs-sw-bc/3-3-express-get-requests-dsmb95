import express from 'express';
const app = express();
import cors from 'cors';
// This is needed to use the fetch in an async function
import fetch from 'node-fetch';

app.use(express.json());
app.use(cors());

const HARD_CODED_JSON = {
  results: [
    {
      name: {
        title: "Miss",
        first: "Jennie",
        last: "Nichols",
      },
      email: "jennie.nichols@example.com",
      dob: {
        age: 30,
      },
    },
  ],
};

app.get("/", (req, res) => {
  res.send("Welcome to the Users API!");
});

app.get("/users", async (req, res) => {
    // For now, we're using hardcoded JSON data
      const url = 'https://randomuser.me/api';
      try {
        const response = await fetch(url);
        const json = await response.json();

        // Extract first user form results array
        const randomUser = json.results[0];

        // Create a user Profile template
        const userProfile = {
          name: randomUser.name,
          email: randomUser.email,
          dob: {
            age: randomUser.dob.age
          },
          picture: randomUser.picture
        };
        res.json(userProfile);
      } catch(err) {
        console.log(err);
        res.status(500).json({
          error: 'Failed to fetch user'
        });
      }
    // TODO: Replace the hardcoded JSON with a real API request to get a random user
    // For example, you might use the `axios` library to make a GET request to the API endpoint
  });

  app.post('/health/:status', (req, res) => {
    const status = req.params.status.toLowerCase();

    if (status.includes('ok')) {
      res.json({
        healthy: true,
        message: 'Status is OK, You are healthy!'
      });
    } else {
      res.json({
        healthy: false,
        message: 'Status is NOT OK. Please check with your doctor!'
      });
    }
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
