import {
  AppBar,
  Typography,
  Box,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  FormControlLabel,
  Button,
} from "@mui/material";
import {
  Icons,
  IconsContainer,
  MaterialUISwitch,
  StyledToolbar,
} from "./Custom";
import SourceIcon from "@mui/icons-material/Source";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import { useDispatch, Selector, useSelector } from "react-redux";
import { change } from "@Redux/modeSlice";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
// Component Code Startes From here
const Navbar = (props) => {
  const { data: SessionName } = useSession();
  const mode = useSelector((state) => state.mode.mode);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar position="fixed">
        <StyledToolbar>
          <SourceIcon sx={{ display: { xs: "inline-block", sm: "none" } }} />
          <Typography
            variant="h5"
            color="inherit"
            sx={{ display: { xs: "none", sm: "inline-block" } }}
          >
            <SourceIcon />
            CodeSocial
          </Typography>
          {/* Icons Container Code  */}
          <IconsContainer>
            <Icons>
              <Badge
                badgeContent={4}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                color="error"
              >
                <MailIcon />
              </Badge>
              <Badge
                badgeContent={8}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            </Icons>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Avatar
                id="avatar-btn"
                sx={{ width: 30, height: 30 }}
                src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                onClick={handleClick}
                aria-controls={open ? "avatar-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              />
              <Typography
                variant="span"
                onClick={handleClick}
                aria-controls={open ? "avatar-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                {SessionName.user.name}
              </Typography>
            </Box>
            <Box>
              <FormControlLabel
                onChange={() =>
                  dispatch(change(mode === "light" ? "dark" : "light"))
                }
                control={<MaterialUISwitch sx={{ m: 1 }} />}
              />
            </Box>
          </IconsContainer>
        </StyledToolbar>
        {/* Menu Items Startes From Here */}
        <Menu
          id="avatar-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{
            "aria-labelledby": "avatar-btn",
          }}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
        </Menu>

        {/* Menu Ended */}
      </AppBar>
      {props.children}
    </>
  );
};
export default Navbar;
