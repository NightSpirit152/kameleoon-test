import { Select } from "antd";
import { VIEW_MODE_SELECT_ITEMS } from "../constants";
import styles from "../styles/Selects.module.css";
import type { TViewMode } from "../types";

type TViewModeSelectProps = {
  handleSelectedViewMode: (viewMode: TViewMode) => void;
};

export const ViewModeSelect = ({
  handleSelectedViewMode,
}: TViewModeSelectProps) => {
  return (
    <Select
      className={styles.viewModeSelect}
      placeholder="Select view mode"
      onChange={handleSelectedViewMode}
      defaultValue="day"
      options={VIEW_MODE_SELECT_ITEMS}
    />
  );
};
