import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
  Modal,
} from "@mui/material";
import SourceIcon from "@mui/icons-material/Source";
import LoginIcon from "@mui/icons-material/Login";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MailIcon from "@mui/icons-material/Mail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Signup from "@components/Signup/Index";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
// Form Component Code Startes From here
const Form = () => {
  const router = useRouter();
  const schema = yup.object().shape({
    email: yup.string().required("Please enter your email address").email(),
    password: yup.string().required("Please enter your password").min(7),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitHandle = async (data) => {
    const status = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
    console.log(status);
    if (status.ok) {
      router.push("/");
    }
    reset();
  };
  const [visible, setVisible] = useState(false);
  const [openModal, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <Box height="100vh" p={5} mt={10}>
      <Grid container alignItems="center" gap={12} spacing={2}>
        <Grid item xs={12} sm={5}>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {" "}
            <SourceIcon fontSize="large" />
            CodeSocial
          </Typography>
          <Typography variant="h6">
            CodeSocial Place where All the Developers Come to Talk About New
            Technology
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Paper
            elevation={20}
            sx={{ height: "370px", p: 3 }}
            onSubmit={handleSubmit(submitHandle)}
            component="form"
            noValidate
          >
            <TextField
              type="email"
              required
              label="Email"
              fullWidth
              placeholder="Enter Your Email"
              variant="outlined"
              sx={{ my: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {errors.email ? <ErrorIcon color="error" /> : <MailIcon />}
                  </InputAdornment>
                ),
              }}
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email && errors.email.message}
            />
            <TextField
              type={visible ? "text" : "password"}
              required
              label="Password"
              variant="outlined"
              fullWidth
              placeholder="Enter Your Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    sx={{ cursor: "pointer" }}
                    position="end"
                    onClick={() => setVisible((prevState) => !prevState)}
                  >
                    {visible ? (
                      <VisibilityIcon color={errors.password ? "error" : ""} />
                    ) : (
                      <VisibilityOffIcon
                        color={errors.password ? "error" : ""}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password && errors.password.message}
            />
            <Button
              type="submit"
              size="large"
              sx={{ my: 3, fontWeight: 800, letterSpacing: "10px", p: 2 }}
              variant="contained"
              fullWidth
              endIcon={<LoginIcon />}
            >
              Login
            </Button>
            <Divider>Create New Account</Divider>
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <Button
                color="success"
                variant="contained"
                endIcon={<AddCircleIcon />}
                sx={{ fontWeight: 600, letterSpacing: "2px" }}
                onClick={handleClickOpen}
              >
                Create Account
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Signup />
      </Modal>
    </Box>
  );
};

export default Form;
