import React from 'react';
import { Card as MuiCard, Chip, Typography } from '@mui/material';
import styles from './Card.module.css';

const Card = ({ album }) => {
  return (
    <div className={styles.cardWrapper}>
      <MuiCard className={styles.card}>
        <div className={styles.mediaWrapper}>
          <img src={album.image} alt={album.title} className={styles.image} />
          <Chip label={`${album.follows} Follows`} className={styles.chip} />
        </div>
      </MuiCard>
      <Typography className={styles.title} noWrap>
        {album.title}
      </Typography>
    </div>
  );
};

export default Card;
