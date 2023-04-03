import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Box,
  InputAdornment,
  Button,
} from "@mui/material";
import { StyledTextField } from "./custom";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

async function createUser(name, email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something Went Wrong !");
  } else {
    return data;
  }
}

//Component Startes From Code Here
const Signup = (props) => {
  const schema = yup.object().shape({
    name: yup.string().required("Please Share Your FullName"),
    email: yup.string().required("Please Enter Valid Email").email(),
    password: yup
      .string()
      .required("Password Must be atleast 7 Character")
      .min(7),
    confirmPassword: yup
      .string()
      .required("Please Enter Confirm Password")
      .oneOf([yup.ref("password"), null], "Password Should Match"),
  });
  const {
    reset,
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [visible, setVisible] = useState(false);
  const handleVisiblity = () => {
    setVisible((prevState) => !prevState);
  };
  const submitHandle = async (data) => {
    console.log(data);
    try {
      const result = await createUser(data.name, data.email, data.password);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    reset();
  };
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "340px",
        height: "80vh",
        m: "10px auto",
      }}
    >
      {/* Form Startes from here */}
      <Box
        component="form"
        p={1}
        onSubmit={handleSubmit(submitHandle)}
        noValidate
      >
        <Avatar sx={{ m: "0px auto" }}>
          <AddCircleOutlineIcon color="primary" />
        </Avatar>
        <Typography variant="h5" textAlign="center" mt={1}>
          Signup
        </Typography>
        <StyledTextField
          type="text"
          variant="outlined"
          label="FullName"
          fullWidth
          required
          placeholder="Enter Your FullName"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {errors.name ? (
                  <ErrorOutlineOutlinedIcon color="error" />
                ) : (
                  <AccountCircleIcon />
                )}
              </InputAdornment>
            ),
          }}
          {...register("name")}
          error={Boolean(errors.name)}
          helperText={errors.name && errors.name.message}
        />
        <StyledTextField
          type="email"
          label="Email"
          required
          fullWidth
          variant="outlined"
          placeholder="Enter Your Email"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {errors.email ? (
                  <ErrorOutlineOutlinedIcon color="error" />
                ) : (
                  <EmailRoundedIcon />
                )}
              </InputAdornment>
            ),
          }}
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email.message}
        />
        <StyledTextField
          type={visible ? "text" : "password"}
          required
          label="Password"
          variant="outlined"
          fullWidth
          placeholder="Enter Password"
          InputProps={{
            endAdornment: (
              <InputAdornment
                sx={{ cursor: "pointer" }}
                position="end"
                onClick={handleVisiblity}
              >
                {visible ? (
                  <VisibilityRoundedIcon color={errors.password && "error"} />
                ) : (
                  <VisibilityOffRoundedIcon
                    color={errors.password && "error"}
                  />
                )}
              </InputAdornment>
            ),
          }}
          {...register("password")}
          error={Boolean(errors.password)}
          helperText={errors.password && errors.password.message}
        />
        <StyledTextField
          type={visible ? "text" : "password"}
          required
          fullWidth
          placeholder="Enter Password Again"
          label="Confirm Password"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={handleVisiblity}
                sx={{ cursor: "pointer" }}
              >
                {visible ? (
                  <VisibilityRoundedIcon
                    color={errors.confirmPassword && "error"}
                  />
                ) : (
                  <VisibilityOffRoundedIcon
                    color={errors.confirmPassword && "error"}
                  />
                )}
              </InputAdornment>
            ),
          }}
          {...register("confirmPassword")}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
        />
        <Button type="submit" variant="contained" fullWidth>
          Signup
        </Button>
      </Box>
    </Paper>
  );
};
export default Signup;
