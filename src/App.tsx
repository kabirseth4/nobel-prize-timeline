import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Prize } from "./types/nobel";
import { loadNobelData } from "./utils/dataUtils";

export const App = () => {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadNobelData();
        setPrizes(data.prizes);
      } catch (error) {
        console.error("Failed to load Nobel Prize data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h6">Loading Nobel Prize data...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nobel Prize Timeline Explorer
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl">
        <Typography variant="body1">
          Loaded {prizes.length} Nobel Prizes from{" "}
          {new Set(prizes.map((p) => p.year)).size} years
        </Typography>
      </Container>
    </Box>
  );
};
