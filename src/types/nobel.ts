export interface Laureate {
  id: string;
  firstname: string;
  surname?: string;
  motivation: string;
  share: string;
}

export interface Prize {
  year: string;
  category: string;
  laureates?: Laureate[];
  overallMotivation?: string;
}

export interface NobelData {
  prizes: Prize[];
}

export type Category =
  | "physics"
  | "chemistry"
  | "medicine"
  | "literature"
  | "peace"
  | "economics";

export const CATEGORIES: Category[] = [
  "physics",
  "chemistry",
  "medicine",
  "literature",
  "peace",
  "economics",
];

export const CATEGORY_COLORS: Record<Category, string> = {
  physics: "#2196F3",
  chemistry: "#4CAF50",
  medicine: "#F44336",
  literature: "#9C27B0",
  peace: "#FF9800",
  economics: "#009688",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  medicine: "Medicine",
  literature: "Literature",
  peace: "Peace",
  economics: "Economics",
};
