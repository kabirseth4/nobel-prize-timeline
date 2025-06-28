import type { NobelData } from "../types/nobel";

export const loadNobelData = async (): Promise<NobelData> => {
  const response = await import("../data/prize.json");
  return response.default as NobelData;
};
