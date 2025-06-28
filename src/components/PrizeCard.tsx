import { Close } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import type { Prize } from "../types/nobel";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "../types/nobel";
import { highlightText } from "../utils/highlightText";

interface PrizeCardProps {
  prize: Prize;
  onClose: () => void;
  searchQuery?: string;
}

export const PrizeCard = ({
  prize,
  onClose,
  searchQuery = "",
}: PrizeCardProps) => {
  const categoryColor = CATEGORY_COLORS[prize.category] || "#666";
  const categoryLabel = CATEGORY_LABELS[prize.category] || prize.category;

  return (
    <Card
      elevation={4}
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
        maxWidth: 600,
        maxHeight: "80vh",
        overflow: "auto",
        zIndex: 1000,
        backgroundColor: "background.paper",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header with category and close button */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Chip
              label={categoryLabel}
              sx={{
                backgroundColor: categoryColor,
                color: "white",
                fontWeight: "bold",
              }}
            />
            <Typography variant="h6" component="span" color="text.secondary">
              {prize.year}
            </Typography>
          </Stack>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Stack>

        {/* Laureates */}
        {prize.laureates && prize.laureates.length > 0 ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {prize.laureates.length === 1 ? "Laureate" : "Laureates"}
            </Typography>
            {prize.laureates.map((laureate) => (
              <Box key={laureate.id} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {highlightText(
                    `${laureate.firstname} ${laureate.surname || ""}`.trim(),
                    searchQuery
                  )}
                  {laureate.share !== "1" && (
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      (Share: {laureate.share})
                    </Typography>
                  )}
                </Typography>
                {laureate.motivation && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontStyle: "italic", mt: 0.5 }}
                  >
                    {highlightText(laureate.motivation, searchQuery)}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Organization Award
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This prize was awarded to an organization.
            </Typography>
          </Box>
        )}

        {/* Overall motivation if available */}
        {prize.overallMotivation && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Overall Motivation
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              "{highlightText(prize.overallMotivation, searchQuery)}"
            </Typography>
          </Box>
        )}

        {/* Additional info */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Nobel Prize in {categoryLabel} • {prize.year}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
