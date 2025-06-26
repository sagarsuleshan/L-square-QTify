// qtify/src/components/Card/Card.jsx
import React from "react";
import styles from "./Card.module.css";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

/**
 * Reusable Card component for displaying album information.
 *
 * @param {object} props - The component props.
 * @param {string} props.image - The URL of the album image.
 * @param {number} props.follows - The number of follows for the album.
 * @param {string} props.title - The title/name of the album.
 * @param {string} props.slug - The slug for navigation (future use).
 * @param {Array<object>} [props.songs=[]] - Array of songs (for tooltip in future).
 * @param {boolean} [props.isSong=false] - Flag to indicate if it's a song card (for future conditional rendering).
 */
function Card({ image, follows, title, slug, songs = [], isSong = false }) {
  // For Milestone 2, we mainly use image, follows, and title.
  // Slug and songs are placeholders for future functionality.

  return (
    <div className={styles.wrapper} data-testid="album-card">
      <Tooltip
        title={isSong ? "" : `${songs.length} songs`}
        placement="top"
        arrow
      >
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src={image} alt={title} className={styles.cardImage} />
            <div className={styles.chipContainer}>
              <Chip
                label={`${follows} Follows`}
                className={styles.chip}
                size="small"
              />
            </div>
          </div>
        </div>
      </Tooltip>
      <p className={styles.cardTitle}>{title}</p>
    </div>
  );
}

export default Card;
