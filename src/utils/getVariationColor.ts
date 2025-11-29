import { COLORS } from "../constants";

export const getVariationColor = (index: number) =>
  COLORS[index % COLORS.length];
