import { Box } from "@mui/material";

export const highlightText = (text: string, searchQuery: string) => {
  if (!searchQuery.trim()) {
    return text;
  }

  const regex = new RegExp(
    `(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <Box
          key={index}
          component="span"
          sx={{
            backgroundColor: "yellow",
            color: "black",
            borderRadius: "2px",
          }}
        >
          {part}
        </Box>
      );
    }
    return part;
  });
};
