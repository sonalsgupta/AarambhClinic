import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if (data.success) {

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        navigate(from, { replace: true });

      } else {
        setError("Invalid username or password");
      }

    } catch (err) {
      setError("Cannot connect to server. Is backend running?");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#f9e7f7 0%, #e8f0ff 100%)"
      }}
    >

      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 380,
          borderRadius: 3
        }}
      >

        <Box sx={{ textAlign: "center", mb: 3 }}>

          <LockOutlinedIcon
            sx={{
              fontSize: 40,
              color: "#1976d2"
            }}
          />

          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ mt: 1 }}
          >
            Aarambh Clinic
          </Typography>

          <Typography variant="body2">
            Doctor Login
          </Typography>

        </Box>


        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}


        <form onSubmit={handleLogin}>

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

            InputProps={{
              endAdornment: (
                <InputAdornment position="end">

                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}

                  </IconButton>

                </InputAdornment>
              )
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              height: 44,
              fontWeight: 600
            }}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>

        </form>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            mt: 2
          }}
        >
          Test Users: Ritwick / Sonal — Password: Aarambh
        </Typography>

      </Paper>
    </Box>
  );
}