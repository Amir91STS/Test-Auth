import { Box, Button, FormHelperText, Grid } from "@mui/material";
import React from "react";
import * as yup from "yup";
import { useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { isAuthPending } from "../logic/user/userSlice";
import CodeInput from "../shared/components/CodeInput";

const OtpForm = ({ onSubmit, backToLogin }) => {
  // This Form Handling Should be in Generic Way !
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object({ code: yup.string().required() }).required()
    ),
  });
  const isPending = useSelector(isAuthPending);

  return (
    <Box
      noValidate
      component="form"
      sx={{ mt: 1, pt: 3 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="code"
        defaultValue=""
        control={control}
        render={({ field: { value, onChange } }) => (
          <CodeInput value={value} onChange={onChange} />
        )}
      />

      {errors.code && (
        <FormHelperText error>{errors.code.message}</FormHelperText>
      )}

      <Box margin={"16px 0"}>
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          loading={isPending}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
      </Box>

      <Grid container justifyContent="center">
        <Grid item>
          <Button variant="text" onClick={backToLogin}>
            Back To Login Page
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OtpForm;
