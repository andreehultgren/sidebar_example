import { Divider, Stack, Typography } from "@mui/material";
import MultiSelect from "../components/MultiSelect";
import { useSearchParams } from "react-router-dom";

const sampleItems: string[] = [
  "Leaning pole",
  "Broken pole",
  "Cracked insulator",
  "Sagging guy wire",
  "Tree too close",
];

export default function ElectricTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defectFilter = searchParams.get("defects")?.split(",") || [];

  function setElectricFilter(defects: string[]) {
    if (defects.length > 0) {
      searchParams.set("defects", defects.join(","));
      setSearchParams(searchParams);
    } else {
      searchParams.delete("defects");
      setSearchParams(searchParams);
    }
  }

  return (
    <Stack sx={{ px: 2, py: 2, width: 300 }}>
      <Typography variant="h5" component="h2">
        Electric defect filter
      </Typography>
      <Typography variant="body1">
        Filter for defects connected with electrical equipment
      </Typography>
      <Divider sx={{ my: 2 }} />

      <MultiSelect
        title="Defects"
        options={sampleItems}
        selectedOptions={defectFilter}
        setOptions={setElectricFilter}
      />
    </Stack>
  );
}
