import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import Menu from "./Menu";

const TopBar = ({ user }) => {
  // Mock market data - can be fetched from API
  const marketIndices = [
    { name: "NIFTY", value: 21453.95, changePercent: 0.59, isUp: true },
    { name: "SENSEX", value: 71186.24, changePercent: 0.58, isUp: true },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "white",
        color: "text.primary",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 56 }}>
        {/* Left Side - Logo and Market Indices */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <img src="Zlogo.jpeg" alt="ZenoTrade" style={{ width: "100px", height: "auto" }} />

          {/* Market Indices - Compact */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {marketIndices.map((index, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                  {index.name}
                </Typography>
                <Typography variant="body2" fontWeight={500} sx={{ fontSize: "0.85rem" }}>
                  {index.value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right Side - User Menu */}
        <Menu user={user} />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;