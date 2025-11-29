import { Select } from "antd";
import type { TVariation } from "../types";
import styles from "../styles/Selects.module.css";

type TVariationsFilterProps = {
  variations: TVariation[];
  handleSelectedVariations: (variationIds: number[]) => void;
};

export const VariationsFilter = ({
  variations,
  handleSelectedVariations,
}: TVariationsFilterProps) => {
  const variationItems = variations.map((variation: TVariation) => ({
    value: variation?.id,
    label: variation?.name,
  }));

  return (
    <Select
      mode="multiple"
      maxTagCount={5}
      allowClear
      className={styles.variationsFilter}
      placeholder="All variations selected"
      onChange={handleSelectedVariations}
      options={variationItems}
    />
  );
};
