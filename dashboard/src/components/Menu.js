import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AppsIcon from "@mui/icons-material/Apps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import API_URL from "../api";

const Menu = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Orders", icon: <ShoppingCartIcon />, path: "/orders" },
    { text: "Holdings", icon: <AccountBalanceWalletIcon />, path: "/holdings" },
    { text: "Positions", icon: <ShowChartIcon />, path: "/positions" },
    { text: "Funds", icon: <TrendingUpIcon />, path: "/funds" },
    { text: "Apps", icon: <AppsIcon />, path: "/apps" },
  ];

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // if you store user data
    sessionStorage.clear(); // clear any session data

    handleClose();
    navigate("/login");
  };

  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Desktop Menu */}
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              sx={{
                px: 2,
                py: 1,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: location.pathname === item.path ? "#f0f0f0" : "transparent",
                color:
                  location.pathname === item.path ? "primary.main" : "text.secondary",
                fontWeight: location.pathname === item.path ? 600 : 400,
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                  color: "primary.main",
                },
              }}
            >
              <Box sx={{ fontSize: 20 }}>{item.icon}</Box>
              <Typography variant="body2">{item.text}</Typography>
            </Box>
          </Link>
        ))}
      </Box>

      {/* User Profile */}
      <IconButton onClick={handleProfileClick} sx={{ ml: 1 }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: "primary.main",
            fontSize: "0.9rem",
          }}
        >
          {getUserInitials()}
        </Avatar>
      </IconButton>

      <MuiMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
          <Typography variant="body2" fontWeight={600}>
            {user?.displayName || user?.email || "User"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </MuiMenu>
    </Box>
  );
};

export default Menu;