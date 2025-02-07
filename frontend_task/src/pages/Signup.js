import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container, Card, CardContent, TextField, Button, Typography, Box, CircularProgress
} from "@mui/material";

const API_URL = "https://task-manger-yar3.onrender.com/api/auth/signup"; // Change if needed

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      await axios.post(API_URL, { email, password });
      navigate("/login");
    } catch (error) {
      setError("Signup failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Card sx={{ padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Signup
          </Typography>

          <form onSubmit={handleSignup}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
            />

            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Signup"}
            </Button>
          </form>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Already have an account? <a href="/">Login</a>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Signup;
