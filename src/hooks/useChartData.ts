import type { TChartData, Theme, TVariation, TViewMode } from "../types";
import { useCallback, useRef, useState } from "react";
import { buildChartData } from "../utils/buildChartData.ts";
import * as htmlToImage from "html-to-image";

export const useChartData = (chart: TChartData) => {
  const { variations: chartVariations, data } = chart;

  const [theme, setTheme] = useState<Theme>("light");
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [lineStyle, setStyle] = useState("monotone");
  const [viewMode, setViewMode] = useState<TViewMode>("day");
  const [selectedVariations, setSelectedVariations] =
    useState<TVariation[]>(chartVariations);

  const chartData = buildChartData(selectedVariations, data, viewMode);

  const handleSelectedVariations = useCallback(
    (variationIds: number[]) => {
      const variations = chartVariations?.map((value) =>
        variationIds.includes(value.id) ? value : { ...value, _hide: true },
      );

      if (variations.length > 0 && !variations.every((v) => v._hide)) {
        setSelectedVariations(variations);
      } else {
        setSelectedVariations(chartVariations);
      }
    },
    [chartVariations],
  );

  const handleSelectedLineStyle = useCallback((style: string) => {
    setStyle(style);
  }, []);

  const handleSelectedViewMode = useCallback((viewMode: TViewMode) => {
    setViewMode(viewMode);
  }, []);

  const handleExportPng = async () => {
    if (!chartRef.current) return;

    const dataUrl = await htmlToImage.toPng(chartRef.current);
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = dataUrl;
    link.click();
  };

  const handleSetTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  return {
    data: chartData,
    allVariations: chartVariations,
    selectedVariations,
    lineStyle,
    viewMode,
    chartRef,
    isDark: theme === "dark",
    handleSelectedLineStyle,
    handleSelectedVariations,
    handleSelectedViewMode,
    handleExportPng,
    handleSetTheme,
  };
};
