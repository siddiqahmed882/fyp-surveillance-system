import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setAuthToken, setMode } from "../state/index";
import profileImage from "../assets/profile.jpg";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const isOpen = Boolean(anchorEl);
  const isOpen2 = Boolean(anchorEl2);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClick2 = (event) => setAnchorEl2(event.currentTarget);
  const handleClose = (type) => {
    if (type === "close") {
      setAnchorEl(null);
      return;
    }
    setAnchorEl(null);
    dispatch(setAuthToken(null));
    localStorage.removeItem("token");
    localStorage.removeItem("baseUrl");
    localStorage.removeItem("roles");
    localStorage.removeItem("fullName");
    navigate("/login");
  };
  const handleClose2 = (url) => {
    if (url.cancelable) {
      setAnchorEl2(null);
      return;
    }
    localStorage.setItem("baseUrl", url);
    setAnchorEl2(null);
    window.location.reload();
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          {/* <FlexBetween>
            <IconButton onClick={handleClick2}>
              <SettingsOutlined sx={{ fontSize: "25px" }} />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {localStorage.getItem("baseUrl")}
              </Typography>
            </IconButton>
            <Menu
              anchorEl={anchorEl2}
              open={isOpen2}
              onClose={handleClose2}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem
                onClick={() =>
                  handleClose2(process.env.REACT_APP_API_URL_LOCAL)
                }
              >
                Local Url
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleClose2(process.env.REACT_APP_API_URL_PORT_FORWARD)
                }
              >
                Dev Url
              </MenuItem>
              <MenuItem
                onClick={() => handleClose2(process.env.REACT_APP_API_URL_LIVE)}
              >
                Production Url
              </MenuItem>
            </Menu>
          </FlexBetween> */}

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {localStorage.getItem("fullName")}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {localStorage.getItem("roles")}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={() => handleClose("close")}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={() => handleClose("logout")}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
