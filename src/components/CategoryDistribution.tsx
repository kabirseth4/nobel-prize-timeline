import { Box, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import type { Prize } from "../types/nobel";
import { calculateCategoryDistribution } from "../utils/dataUtils";

interface CategoryDistributionProps {
  prizes: Prize[];
}

export const CategoryDistribution = ({ prizes }: CategoryDistributionProps) => {
  const distribution = useMemo(
    () => calculateCategoryDistribution(prizes),
    [prizes]
  );

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Prize Distribution by Category
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} gap={2} flexWrap="wrap">
        {distribution.map(({ category, count, percentage, color, label }) => (
          <Box
            key={category}
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" },
              mb: 1,
            }}
          >
            <Stack gap={0.5}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: color,
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" flex={1}>
                  {label}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {count}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: color,
                    borderRadius: 3,
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {percentage.toFixed(1)}%
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};
