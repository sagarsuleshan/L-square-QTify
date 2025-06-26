import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Section.module.css';
import Card from '../Card/Card';
import { Typography, Button } from '@mui/material';

const Section = ({ title, endpoint }) => {
  const [albums, setAlbums] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    axios.get(endpoint)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error(err));
  }, [endpoint]);

  const handleToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  const visibleAlbums = isCollapsed ? albums.slice(0, 7) : albums;

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.header}>
        <Typography className={styles.title}>{title}</Typography>
        <Button className={styles.showAllBtn} onClick={handleToggle}>
          {isCollapsed ? 'Show All' : 'Collapse'}
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
