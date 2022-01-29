import React from "react";
import Link from "next/link";

import withAuth from "./app/utils/withAuth";
import { Box, Container, Typography } from "@mui/material";

const MainPage = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Test Example
        </Typography>

        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
      </Box>
    </Container>
  );
};

export default withAuth(MainPage);
