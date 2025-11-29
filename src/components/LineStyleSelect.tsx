import { Select } from "antd";
import { LINE_STYLE_SELECT_ITEMS } from "../constants";
import styles from "../styles/Selects.module.css";

type TLineStyleSelectProps = {
  handleSelectedLineStyle: (style: string) => void;
};

export const LineStyleSelect = ({
  handleSelectedLineStyle,
}: TLineStyleSelectProps) => {
  return (
    <Select
      className={styles.lineStyleSelect}
      placeholder="Select line style"
      onChange={handleSelectedLineStyle}
      defaultValue="monotone"
      options={LINE_STYLE_SELECT_ITEMS}
    />
  );
};
