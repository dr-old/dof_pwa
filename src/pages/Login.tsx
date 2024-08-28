import React, { useState } from "react";
import { LockRounded } from "@mui/icons-material";
import { Input } from "../components/Form";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { FormContainer } from "react-hook-form-mui";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/userService";
import LayoutAuth from "../components/LayoutAuth";
import { useColorMode } from "../context/useColorMode";
import ToggleTheme from "../components/ToggleTheme";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const theme = useTheme();
  const auth = useAuth();
  const { toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const color =
    theme.palette.mode === "light"
      ? theme.palette.warning.main
      : theme.palette.background.default;

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      auth.loginAction(data);
      // toast.success("Login successful!");
    },
    onError: (error: any) => {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      // toast.error(
      //   "Login failed: " + error.response?.data?.message || error.message
      // );
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <LayoutAuth>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        {/* Column 1: Full-Height Image */}
        <Grid
          item
          xs={12}
          md={6}
          order={{ xs: 0, md: 1 }} // Reverse order on small screens
        >
          <Box
            sx={{
              height: "100%",
              borderRadius: theme.shape.borderRadius * 2.5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Box
              sx={{
                width: 80, // Adjust the size as needed
                height: 80, // Adjust the size as needed
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%", // Fully rounded
                backgroundColor: color, // Light background for better visibility
                marginBottom: 5,
              }}>
              <LockRounded fontSize="large" color="primary" />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Typography
                variant="h4"
                fontWeight={700}
                align="center"
                color={color}
                gutterBottom>
                DOF
              </Typography>
              <Typography
                variant="h4"
                fontWeight={400}
                align="center"
                color={color}
                gutterBottom>
                |
              </Typography>
              <Typography
                variant="h4"
                fontWeight={400}
                align="center"
                color={color}
                gutterBottom>
                Dashboard
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Column 2: Login Box */}
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          order={{ xs: 1, md: 0 }} // Reverse order on small screens
        >
          <Box
            sx={{
              paddingX: 5,
              paddingY: 7,
              border: `1px solid ${theme.palette.warning.main}`,
              borderRadius: theme.shape.borderRadius * 2.5,
              backgroundColor: color,
            }}>
            <Typography variant="caption">Welcome back</Typography>
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{ marginBottom: 5 }}
              gutterBottom>
              Log In
            </Typography>
            <FormContainer
              defaultValues={{ email: "", password: "" }}
              onSuccess={onSubmit}>
              <Input
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                required
              />
              <Input
                name="password"
                label="Password"
                type="password"
                fullWidth
                required
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                sx={{
                  marginTop: 2,
                  borderRadius: theme.shape.borderRadius * 2.5,
                  textTransform: "none",
                }}>
                Log In
              </Button>
            </FormContainer>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          order={{ xs: 2, md: 2 }}>
          <ToggleTheme reverseColor={true} />
        </Grid>
      </Grid>
    </LayoutAuth>
  );
};

export default Login;
