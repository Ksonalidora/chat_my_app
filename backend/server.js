const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require('./config/db');
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound,errorHandler} = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Default route
app.get("/", (req, res) => {
    res.send("API is running successfully");
});

// Chat routes (previously defined)
app.get("/api/chat", (req, res) => {
    res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});

// User routes (imported from routes/userRoutes)
app.use("/api/user/", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound)
app.use(errorHandler)

// Listen on the defined port
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`.yellow.bold));
