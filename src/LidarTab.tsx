import React, { useEffect } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import MultiSelect from "./MultiSelect";

const sampleItems: string[] = [
  "Ceramic insulator",
  "Cross arm",
  "Glass insulator",
];

type Props = {
  setActive: (active: boolean) => void;
};

export default function LidarTab({ setActive }: Props) {
  const [electricFilter, setElectricFilter] = React.useState<string[]>([]);

  useEffect(() => {
    setActive(electricFilter.length > 0);
  }, [electricFilter]);

  return (
    <Stack sx={{ px: 2, py: 2, width: 300 }}>
      <Typography variant="h5" component="h2">
        Inventory Filter
      </Typography>
      <Typography variant="body1">
        Filter for defects connected with electrical equipment
      </Typography>
      <Divider sx={{ my: 2 }} />

      <MultiSelect
        title="Inventory"
        options={sampleItems}
        selectedOptions={electricFilter}
        setOptions={setElectricFilter}
      />
    </Stack>
  );
}
