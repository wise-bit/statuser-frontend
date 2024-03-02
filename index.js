// Import necessary modules
const express = require("express");
const axios = require("axios");

// Create Express app
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Route to get state
app.get("/get-state", async (_req, res) => {
  try {
    const response = await axios.get(
      "https://wisebit.pythonanywhere.com/get-state"
    );
    const state = response.data.status;
    res.send(`Current state is: ${state}`);
  } catch (error) {
    console.error("Error fetching state:", error);
    res.status(500).send("Error fetching state");
  }
});

// Route to change state
app.post("/change-state", async (req, res) => {
  try {
    const password = req.body.password;
    const response = await axios.post(
      "https://wisebit.pythonanywhere.com/change-state",
      {},
      {
        auth: {
          username: "username",
          password: password,
        },
      }
    );
    const newState = response.data.new_state;
    res.send(`State changed successfully. New state is: ${newState}`);
  } catch (error) {
    console.error("Error changing state:", error);
    res.status(500).send("Error changing state");
  }
});

// Serve HTML for both routes
app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
