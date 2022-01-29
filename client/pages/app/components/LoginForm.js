import {
  Box,
  Grid,
  Checkbox,
  TextField,
  FormHelperText,
  FormControlLabel,
} from "@mui/material";
import React from "react";
import * as yup from "yup";
import Link from "next/link";
import LoadingButton from "@mui/lab/LoadingButton";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginForm = ({ onSubmit, isPending }) => {
  // This Form Handling Should be in Generic Way !
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup
        .object({
          password: yup.string().required(),
          email: yup.string().email().required(),
        })
        .required()
    ),
  });

  return (
    <Box
      noValidate
      sx={{ mt: 1 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        defaultValue=""
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Email Address"
            error={typeof errors.email === "object"}
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        defaultValue=""
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            error={typeof errors.password === "object"}
            {...field}
          />
        )}
      />

      <FormControlLabel
        label="Remember me"
        control={<Checkbox value="remember" color="primary" />}
      />

      {errors.email && (
        <FormHelperText error>{errors.email.message}</FormHelperText>
      )}

      {errors.password && (
        <FormHelperText error>{errors.password.message}</FormHelperText>
      )}

      <Box margin={"16px 0"}>
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          loading={isPending}
          sx={{ mt: 3, mb: 2 }}
        >
          Send Code To Me
        </LoadingButton>
      </Box>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="#">{"Don't have an account? Sign Up"}</Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
