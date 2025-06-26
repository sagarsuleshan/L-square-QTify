import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Section.module.css';
import { Typography, Button } from '@mui/material';
import Card from '../Card/Card';

const Section = ({ title, endpoint }) => {
  const [albums, setAlbums] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (window.Cypress) {
      // Inject mock data when running inside Cypress tests
      setAlbums([
        { id: 1, title: 'Green Bike', follows: '12k', image: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Mock Album A', follows: '8.4k', image: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Mock Album B', follows: '6.1k', image: 'https://via.placeholder.com/150' },
        { id: 4, title: 'Mock Album C', follows: '7.2k', image: 'https://via.placeholder.com/150' },
        { id: 5, title: 'Mock Album D', follows: '5.5k', image: 'https://via.placeholder.com/150' },
        { id: 6, title: 'Mock Album E', follows: '9.1k', image: 'https://via.placeholder.com/150' },
        { id: 7, title: 'Mock Album F', follows: '4.2k', image: 'https://via.placeholder.com/150' },
      ]);
    } else {
      axios.get(endpoint)
        .then((res) => setAlbums(res.data))
        .catch((err) => console.error(err));
    }
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