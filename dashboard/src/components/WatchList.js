import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import { watchlist } from "../data/data";

import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter watchlist based on search query
  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Define color palette with increased opacity (0.7)
  const colorPalette = [
    { bg: 'rgba(229, 35, 77, 0.7)', border: 'rgba(229, 35, 77, 1)' },
    { bg: 'rgba(54, 162, 235, 0.7)', border: 'rgba(54, 162, 235, 1)' },
    { bg: 'rgba(255, 206, 86, 0.7)', border: 'rgba(255, 206, 86, 1)' },
    { bg: 'rgba(75, 192, 192, 0.7)', border: 'rgba(75, 192, 192, 1)' },
    { bg: 'rgba(153, 102, 255, 0.7)', border: 'rgba(153, 102, 255, 1)' },
    { bg: 'rgba(255, 159, 64, 0.7)', border: 'rgba(255, 159, 64, 1)' },
  ];

  // Generate colors for filtered stocks - maintain original index
  const getColors = () => {
    const bgColors = [];
    const borderColors = [];
    filteredWatchlist.forEach((stock) => {
      // Find the original index of this stock in the full watchlist
      const originalIndex = watchlist.findIndex(s => s.name === stock.name);
      const colorIndex = originalIndex % colorPalette.length;
      bgColors.push(colorPalette[colorIndex].bg);
      borderColors.push(colorPalette[colorIndex].border);
    });
    return { bgColors, borderColors };
  };

  const { bgColors, borderColors } = getColors();

  const data = {
    labels: filteredWatchlist.map((stock) => stock.name),
    datasets: [
      {
        label: 'Price',
        data: filteredWatchlist.map((stock) => stock.price),
        backgroundColor: bgColors,
        borderColor: borderColors,
        borderWidth: 1,
      },]
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search stocks..."
          className="search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="counts"> {filteredWatchlist.length} / {watchlist.length}</span>
      </div>

      <ul className="list">
        {filteredWatchlist.length > 0 ? (
          filteredWatchlist.map((stock, index) => {
            return <WatchListItem stock={stock} key={index} />;
          })
        ) : (
          <li style={{ padding: "20px", textAlign: "center", color: "#999" }}>
            No stocks found
          </li>
        )}
      </ul>
      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchListActions, setShowWatchListActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchListActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchListActions(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="ItemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
        </div>
      </div>
      {showWatchListActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  // Find stock price from watchlist
  const stock = watchlist.find(s => s.name === uid);
  const stockPrice = stock ? stock.price : 0;

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid, stockPrice);
  };

  const handleSellClick = () => {
    generalContext.openSellWindow(uid, stockPrice);
  }

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleBuyClick}
        >
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleSellClick}
        >
          <button className="sell">Sell</button>
        </Tooltip>
      </span>
    </span>
  );
};