import Head from "next/head";
import Form from "@components/Form/Index";
import { Box } from "@mui/material";
const IndexPage = () => {
  return (
    <Box>
      <Head>
        <title>CodeSocial - Login or Signup</title>
      </Head>
      <Form />
    </Box>
  );
};

export default IndexPage;
