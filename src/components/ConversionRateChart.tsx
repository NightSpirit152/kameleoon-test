import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { TChartData } from "../types";
import { useChartData } from "../hooks/useChartData.ts";
import type { CurveType } from "recharts/types/shape/Curve";
import styles from "../styles/ConversionRateChart.module.css";
import ChartHeader from "./ChartHeader.tsx";
import { getVariationColor } from "../utils/getVariationColor.ts";

type TConversionRateChartProps = {
  chart: TChartData;
};

export function ConversionRateChart({ chart }: TConversionRateChartProps) {
  const {
    data,
    selectedVariations,
    lineStyle,
    viewMode,
    chartRef,
    isDark,
    ...chartHeaderProps
  } = useChartData(chart);

  return (
    <div className={`${styles.root} ${isDark ? styles.rootDark : ""}`}>
      <ChartHeader {...chartHeaderProps} />
      <div className={`${styles.chartWrapper}`} ref={chartRef}>
        <ResponsiveContainer>
          {lineStyle !== "area" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis unit="%" />
              <Tooltip
                wrapperClassName={isDark ? styles.tooltipDark : ""}
                formatter={(value) =>
                  value == null ? "n/a" : `${(value as number).toFixed(2)}%`
                }
              />
              <Legend />
              {selectedVariations?.map((v, i) => {
                return (
                  <>
                    {lineStyle === "shadow" && (
                      <Line
                        key={`shadow-${v?.id}-${viewMode}-${lineStyle}`}
                        tooltipType="none"
                        type="monotone"
                        dataKey={v.name}
                        stroke={getVariationColor(i)}
                        fill={getVariationColor(i)}
                        strokeWidth={20}
                        strokeOpacity={0.3}
                        dot={false}
                        legendType="none"
                        activeDot={false}
                        connectNulls
                      />
                    )}
                    <Line
                      key={`main-${v?.id}-${viewMode}-${lineStyle}`}
                      type={
                        lineStyle === "shadow"
                          ? "monotone"
                          : (lineStyle as CurveType)
                      }
                      stroke={getVariationColor(i)}
                      fill={getVariationColor(i)}
                      dataKey={v.name}
                      dot={false}
                      strokeWidth={2}
                      hide={v?._hide}
                      connectNulls
                    />
                  </>
                );
              })}
            </LineChart>
          ) : (
            <AreaChart data={data} responsive>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis unit="%" />
              <Tooltip
                formatter={(value) =>
                  value == null ? "n/a" : `${(value as number).toFixed(2)}%`
                }
              />
              <Legend />
              {selectedVariations?.map((v, i) => (
                <Area
                  key={`main-${v?.id}-${viewMode}-${lineStyle}`}
                  type={lineStyle as CurveType}
                  stroke={getVariationColor(i)}
                  fill={getVariationColor(i)}
                  dataKey={v.name}
                  dot={false}
                  strokeWidth={2}
                  connectNulls
                />
              ))}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
