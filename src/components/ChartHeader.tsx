import styles from "../styles/ConversionRateChart.module.css";
import { VariationsFilter } from "./VariationsFilter.tsx";
import { ViewModeSelect } from "./ViewModeSelect.tsx";
import { LineStyleSelect } from "./LineStyleSelect.tsx";
import { Button, Switch } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import type { TVariation, TViewMode } from "../types";

type TChartHeaderProps = {
  allVariations: TVariation[];
  handleSelectedVariations: (variationIds: number[]) => void;
  handleSelectedViewMode: (viewMode: TViewMode) => void;
  handleSelectedLineStyle: (style: string) => void;
  handleExportPng: () => void;
  handleSetTheme: () => void;
};

const ChartHeader = ({
  allVariations,
  handleSelectedVariations,
  handleSelectedViewMode,
  handleSelectedLineStyle,
  handleExportPng,
  handleSetTheme,
}: TChartHeaderProps) => {
  return (
    <div className={styles.controls}>
      <VariationsFilter
        variations={allVariations}
        handleSelectedVariations={handleSelectedVariations}
      />
      <ViewModeSelect handleSelectedViewMode={handleSelectedViewMode} />
      <LineStyleSelect handleSelectedLineStyle={handleSelectedLineStyle} />
      <Switch className={styles.themeSwitch} onChange={handleSetTheme} />
      <Button
        type="primary"
        icon={<ExportOutlined />}
        onClick={handleExportPng}
      />
    </div>
  );
};

export default ChartHeader;
