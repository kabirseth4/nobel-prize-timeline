import { Backdrop, Box, Paper, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import type { Prize } from "../types/nobel";
import { CATEGORY_COLORS } from "../types/nobel";
import { PrizeCard } from "./PrizeCard";

interface TimelineProps {
  prizes: Prize[];
}

export const Timeline = ({ prizes }: TimelineProps) => {
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);

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
  const allYears: number[] = [];
  for (let year = minYear; year <= maxYear; year++) {
    allYears.push(year);
  }

  // Group prizes by year for easier rendering
  const prizesByYear = prizes.reduce((acc, prize) => {
    const year = parseInt(prize.year);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(prize);
    return acc;
  }, {} as Record<number, Prize[]>);

  const getPositionForYear = (year: number) => {
    const index = allYears.indexOf(year);
    return (index / (allYears.length - 1)) * 100;
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          overflowX: "auto",
          minHeight: 200,
          position: "relative",
        }}
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
                  top: "50%",
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
                      position: "absolute",
                      top: "1.25rem",
                      fontWeight: "bold",
                      color: "text.secondary",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {year}
                  </Typography>
                )}
              </Box>
            );
          })}

          {/* Prize markers */}
          {Object.entries(prizesByYear).map(([yearStr, yearPrizes]) => {
            const year = parseInt(yearStr);
            const position = getPositionForYear(year);

            return yearPrizes.map((prize, prizeIndex) => {
              const verticalOffset = prizeIndex * 16; // Stack multiple prizes vertically
              const color =
                CATEGORY_COLORS[
                  prize.category as keyof typeof CATEGORY_COLORS
                ] || "#666";

              const laureateNames =
                prize.laureates
                  ?.map((l) => `${l.firstname} ${l.surname || ""}`.trim())
                  .join(", ") || "Organization";

              const tooltipTitle = `${prize.year} ${
                prize.category.charAt(0).toUpperCase() + prize.category.slice(1)
              }: ${laureateNames}`;

              return (
                <Tooltip
                  key={`${year}-${prizeIndex}`}
                  title={tooltipTitle}
                  arrow
                >
                  <Box
                    onClick={() => setSelectedPrize(prize)}
                    sx={{
                      position: "absolute",
                      left: `${position}%`,
                      top: `calc(50% - ${verticalOffset}px)`,
                      transform: "translate(-50%, -50%)",
                      width: yearPrizes.length > 1 ? 14 : 12,
                      height: yearPrizes.length > 1 ? 14 : 12,
                      borderRadius: "50%",
                      backgroundColor: color,
                      border:
                        selectedPrize === prize
                          ? "3px solid #333"
                          : "2px solid white",
                      cursor: "pointer",
                      zIndex: 3,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translate(-50%, -50%) scale(1.2)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      },
                    }}
                  />
                </Tooltip>
              );
            });
          })}
        </Box>
      </Paper>

      {/* Prize Card Modal */}
      {selectedPrize && (
        <Backdrop
          open={true}
          onClick={() => setSelectedPrize(null)}
          sx={{ zIndex: 999 }}
        >
          <Box onClick={(e) => e.stopPropagation()}>
            <PrizeCard
              prize={selectedPrize}
              onClose={() => setSelectedPrize(null)}
            />
          </Box>
        </Backdrop>
      )}
    </>
  );
};
