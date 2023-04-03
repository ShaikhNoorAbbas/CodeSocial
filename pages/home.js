import Head from "next/head";
import Home from "@components/Home/Index";
import Plus from "@components/Add/Index";
import { Box } from "@mui/material";
const HomePage = () => {
  return (
    <Box>
      <Head>
        <title>CodeSocial - Home</title>
      </Head>
      <Home />
      <Plus />
    </Box>
  );
};

export default HomePage;
