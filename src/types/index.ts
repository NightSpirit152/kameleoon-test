export type TVariation = {
  id: number;
  name: string;
  _hide?: boolean;
};

export type TRawDay = {
  date: string;
  visits: Record<string, number | undefined>;
  conversions: Record<string, number | undefined>;
};

export type TChartData = {
  variations: TVariation[];
  data: TRawDay[];
};

export type Theme = "light" | "dark";

export type TViewMode = "day" | "week";
