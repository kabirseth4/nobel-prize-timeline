import {
  CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  type Category,
  type NobelData,
  type Prize,
} from "../types/nobel";

export const loadNobelData = async (): Promise<NobelData> => {
  const response = await import("../data/prize.json");
  return response.default as NobelData;
};

export const calculateCategoryDistribution = (prizes: Prize[]) => {
  const distribution = CATEGORIES.reduce((acc, category) => {
    acc[category] = 0;
    return acc;
  }, {} as Record<Category, number>);

  prizes.forEach((prize) => {
    if (CATEGORIES.includes(prize.category)) {
      distribution[prize.category]++;
    }
  });

  const total = prizes.length;
  return CATEGORIES.map((category) => ({
    category,
    count: distribution[category],
    percentage: total > 0 ? (distribution[category] / total) * 100 : 0,
    color: CATEGORY_COLORS[category],
    label: CATEGORY_LABELS[category],
  }));
};
