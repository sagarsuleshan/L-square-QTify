// src/components/Card/Card.jsx
import React from 'react';
import { Card as MuiCard, Chip, Typography } from '@mui/material';
import styles from './Card.module.css';

// Add isSong prop
const Card = ({ album, isSong = false }) => { // Default to false
  const chipLabel = isSong ? `${album.likes} Likes` : `${album.follows} Follows`;

  return (
    <div className={styles.cardWrapper}>
      <MuiCard className={styles.card}>
        <div className={styles.mediaWrapper}>
          <img src={album.image} alt={album.title} className={styles.image} />
          <Chip label={chipLabel} className={styles.chip} /> {/* Use dynamic label */}
        </div>
      </MuiCard>
      <Typography className={styles.title} noWrap>
        {album.title}
      </Typography>
    </div>
  );
};

export default Card;