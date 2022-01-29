import { toast } from "react-toastify";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Container, Typography } from "@mui/material";

import OtpForm from "./app/components/OtpForm";
import LoginForm from "./app/components/LoginForm";
import { loginUser } from "./app/logic/user/userAPI";
import { authProfile } from "./app/logic/user/userSlice";
import { loginUserToApp } from "./app/logic/user/userActions";

const Login = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const [userEmail, setEmail] = useState("");
  const [isPending, setPending] = useState(false);
  const userProfile = useSelector(authProfile);

  useEffect(() => {
    if (userProfile) {
      Router.replace("/");
    }
  }, [userProfile]);

  const handleLogin = (values) => {
    setPending(true);
    loginUser(values)
      .then((data) => {
        setEmail(data.user.email);
        toast.success("Otp Code Sent To Your Email Address.");
      })
      .finally(() => setPending(false));
  };

  const handleOtpLogin = (values) => {
    const formValues = {
      email: userEmail,
      code: values.code,
    };

    dispatch(loginUserToApp(formValues));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h2">
          Sign in
        </Typography>

        {userEmail ? (
          <OtpForm
            isPending={isPending}
            onSubmit={handleOtpLogin}
            backToLogin={() => setEmail(undefined)}
          />
        ) : (
          <LoginForm onSubmit={handleLogin} isPending={isPending} />
        )}
      </Box>
    </Container>
  );
};

export default Login;
