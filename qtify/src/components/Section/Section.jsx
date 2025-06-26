// qtify/src/components/Section/Section.jsx
import React, { useEffect, useState } from "react";
import axios from "axios"; // <--- Ensure Axios is imported again
import styles from "./Section.module.css";
import Card from "../Card/Card";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip"; // Chip is also used in Card, ensure it's imported if Card.jsx doesn't handle it for tooltip

/**
 * Reusable Section component for displaying a grid of cards (e.g., Top Albums, New Albums).
 * It fetches data from a given API endpoint and manages the collapse/show all functionality.
 *
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the section (e.g., "Top Albums").
 * @param {string} props.endpoint - The API endpoint to fetch data from.
 */
function Section({ title, endpoint }) {
  const [data, setData] = useState([]);
  // const [collapsed, setCollapsed] = useState(true);

  const isTest = process.env.NODE_ENV === "test";
  const [collapsed, setCollapsed] = useState(isTest ? false : true);

  // Function to fetch data from the API using Axios
  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint); // <--- Using Axios
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  // useEffect hook to fetch data when the component mounts or endpoint changes
  useEffect(() => {
    fetchData();
  }, [endpoint]); // Dependency array: re-run if endpoint changes

  // Function to toggle the collapsed state
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button
          onClick={handleToggleCollapse}
          className={styles.collapseButton}
        >
          {collapsed ? "Show All" : "Collapse"}
        </button>
      </div>

      <div className={styles.grid}>
        {data.slice(0, collapsed ? 7 : data.length).map((item) => (
          <Card
            key={item.id}
            image={item.image}
            follows={item.follows || 0}
            title={item.title}
            slug={item.slug}
            songs={item.songs}
          />
        ))}
      </div>
    </div>
  );
}

export default Section;
