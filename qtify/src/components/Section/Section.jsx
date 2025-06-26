import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import { Typography, Button } from "@mui/material";
import Card from "../Card/Card";

const Section = ({ title }) => {
  const [albums, setAlbums] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Match Cypress intercept endpoints exactly
  const endpoint =
    title === "Top Albums"
      ? "https://qtify-backend-labs.crio.do/albums/top"
      : "https://qtify-backend-labs.crio.do/albums/new";

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error(err));
  }, [endpoint]);

  const visibleAlbums = isCollapsed ? albums.slice(0, 7) : albums;

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.header}>
        <Typography className={styles.title}>{title}</Typography>
        <Button
          variant="text"
          disableElevation
          disableRipple
          className={styles.toggleButton}
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          {isCollapsed ? "Show All" : "Collapse"}
        </Button>
      </div>
      <div className={styles.cardRow}>
        {visibleAlbums.map((album) => (
          <Card key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default Section;
