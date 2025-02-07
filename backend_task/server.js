const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const authMiddleware = require('./middleware/authMiddleware')

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://task-manger-eight-tau.vercel.app", // Deployed frontend on Vercel
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});


app.use('/api/auth', authRoutes);
app.use('/api/tasks', require('./routes/taskRoutes'));
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: "Welcome to the protected route!", userId: req.user.id });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
