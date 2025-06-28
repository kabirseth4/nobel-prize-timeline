import { Box, Paper, Typography } from "@mui/material";
import type { Prize } from "../types/nobel";

interface TimelineProps {
  prizes: Prize[];
}

export const Timeline = ({ prizes }: TimelineProps) => {
  if (prizes.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="text.secondary">
          No prizes found matching your criteria
        </Typography>
      </Box>
    );
  }

  // Get year range from prizes
  const years = prizes.map((prize) => parseInt(prize.year));
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  // Create array of all years in range
  const allYears = [];
  for (let year = minYear; year <= maxYear; year++) {
    allYears.push(year);
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        overflowX: "auto",
        minHeight: 200,
        position: "relative",
      }}
      className="timeline-container"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minWidth: `${allYears.length * 60}px`,
          height: 150,
          position: "relative",
        }}
      >
        {/* Timeline axis */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: "grey.300",
            zIndex: 1,
          }}
        />

        {/* Year markers */}
        {allYears.map((year, index) => {
          const showYearLabel =
            year % 10 === 0 || year === minYear || year === maxYear;

          return (
            <Box
              key={year}
              sx={{
                position: "absolute",
                left: `${(index / (allYears.length - 1)) * 100}%`,
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 2,
              }}
            >
              {/* Year label */}
              {showYearLabel && (
                <Typography
                  variant="caption"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    color: "text.secondary",
                  }}
                >
                  {year}
                </Typography>
              )}

              {/* Year marker line */}
              {showYearLabel && (
                <Box
                  sx={{
                    width: 1,
                    height: 20,
                    backgroundColor: "grey.400",
                    mt: 1,
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};
