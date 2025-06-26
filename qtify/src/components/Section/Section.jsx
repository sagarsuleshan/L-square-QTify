// src/components/Section/Section.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import { Typography, Button } from "@mui/material";
import Carousel from "../Carousel/Carousel";
import Tabs from "@mui/material/Tabs"; // Import Tabs
import Tab from "@mui/material/Tab";   // Import Tab

// Helper function to get the correct API endpoint based on type
const getEndpoint = (type, title) => {
  if (type === "albums") {
    return title === "Top Albums"
      ? "https://qtify-backend-labs.crio.do/albums/top"
      : "https://qtify-backend-labs.crio.do/albums/new";
  } else if (type === "songs") {
    return "https://qtify-backend-labs.crio.do/songs";
  }
  return "";
};

// Helper function to get genre endpoint
const getGenreEndpoint = () => "https://qtify-backend-labs.crio.do/genres";

const Section = ({ title, type = "albums", showCollapseButton = true }) => { // Added type and showCollapseButton props
  const [data, setData] = useState([]); // Renamed from albums to data to be generic
  const [genres, setGenres] = useState([]); // State for genres
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(0); // State for active tab/genre index
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Effect to fetch data (albums or songs)
  useEffect(() => {
    const endpoint = getEndpoint(type, title);
    if (endpoint) {
      axios
        .get(endpoint)
        .then((res) => setData(res.data))
        .catch((err) => console.error(`Error fetching ${type}:`, err));
    }
  }, [type, title]);

  // Effect to fetch genres, only if type is 'songs'
  useEffect(() => {
    if (type === "songs") {
      axios
        .get(getGenreEndpoint())
        .then((res) => {
          // Add 'All' genre at the beginning
          setGenres([{ key: "all", label: "All" }, ...res.data.data]);
        })
        .catch((err) => console.error("Error fetching genres:", err));
    }
  }, [type]);

  const toggleView = () => setIsCollapsed((prev) => !prev);

  const handleGenreChange = (event, newValue) => {
    setSelectedGenreIndex(newValue);
  };

  // Filtered data based on selected genre
  const filteredData = React.useMemo(() => {
    if (type !== "songs") return data; // No filtering for albums
    if (selectedGenreIndex === 0) return data; // 'All' tab

    const selectedGenreKey = genres[selectedGenreIndex]?.key;
    if (!selectedGenreKey) return [];

    return data.filter(item => item.genre.key === selectedGenreKey);
  }, [data, genres, selectedGenreIndex, type]);

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.header}>
        <Typography className={styles.title}>{title}</Typography>
        {showCollapseButton && ( // Conditionally render the button
          <Button
            variant="text"
            disableElevation
            disableRipple
            className={styles.toggleButton}
            onClick={toggleView}
          >
            {isCollapsed ? "Show All" : "Collapse"}
          </Button>
        )}
      </div>

      {type === "songs" && genres.length > 0 && ( // Render tabs only for songs section
        <div className={styles.tabsContainer}>
          <Tabs
            value={selectedGenreIndex}
            onChange={handleGenreChange}
            aria-label="song genres tabs"
            TabIndicatorProps={{ style: { backgroundColor: '#34C94B' } }} // Example styling for indicator
            className={styles.tabs}
          >
            {genres.map((genre, index) => (
              <Tab
                key={genre.key}
                label={genre.label}
                className={styles.tab}
                // Apply active class if selected
                classes={{ selected: styles.selectedTab }}
              />
            ))}
          </Tabs>
        </div>
      )}

      {/* Conditional rendering for Carousel vs Grid remains, but uses filteredData */}
      {isCollapsed || type === "songs" ? ( // Carousel is always displayed for songs (no collapse button)
        <Carousel
          data={filteredData}
          renderItem={(item) => (
            <Card
              key={item.id}
              album={item} // Still passing as album for consistency, but will adjust Card for songs
              isSong={type === "songs"} // Prop to indicate if it's a song
            />
          )}
        />
      ) : (
        <div className={`${styles.cardRow} ${styles.cardRowExpanded}`}>
          {data.map((item) => (
            <Card
              key={item.id}
              album={item}
              isSong={type === "songs"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;