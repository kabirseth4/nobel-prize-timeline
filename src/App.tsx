import { Search } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Chip,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Timeline } from "./components/Timeline";
import {
  CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  type Category,
  type Prize,
} from "./types/nobel";
import { loadNobelData } from "./utils/dataUtils";

export const App = () => {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    new Set(CATEGORIES)
  );
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredPrizes = useMemo(() => {
    return prizes.filter((prize) => {
      // Category filter
      if (!selectedCategories.has(prize.category as Category)) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();

        // Search in laureate names
        const nameMatch = prize.laureates?.some((laureate) =>
          `${laureate.firstname} ${laureate.surname || ""}`
            .toLowerCase()
            .includes(query)
        );

        // Search in motivations
        const motivationMatch =
          prize.overallMotivation?.toLowerCase().includes(query) ||
          prize.laureates?.some((laureate) =>
            laureate.motivation.toLowerCase().includes(query)
          );

        return nameMatch || motivationMatch;
      }

      return true;
    });
  }, [prizes, selectedCategories, searchQuery]);

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

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
        {/* Search and Filters */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by laureate name or motivation keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {CATEGORIES.map((category) => (
              <Chip
                key={category}
                label={CATEGORY_LABELS[category]}
                onClick={() => handleCategoryToggle(category)}
                variant={
                  selectedCategories.has(category) ? "filled" : "outlined"
                }
                sx={{
                  backgroundColor: selectedCategories.has(category)
                    ? CATEGORY_COLORS[category]
                    : "transparent",
                  color: selectedCategories.has(category)
                    ? "white"
                    : CATEGORY_COLORS[category],
                  borderColor: CATEGORY_COLORS[category],
                  "&:hover": {
                    backgroundColor: selectedCategories.has(category)
                      ? CATEGORY_COLORS[category]
                      : `${CATEGORY_COLORS[category]}20`,
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Statistics */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredPrizes.length} of {prizes.length} Nobel Prizes from{" "}
            {new Set(filteredPrizes.map((p) => p.year)).size} years
          </Typography>
        </Box>

        {/* Timeline */}
        <Timeline prizes={filteredPrizes} />
      </Container>
    </Box>
  );
};
