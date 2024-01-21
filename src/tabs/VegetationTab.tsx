import { Divider, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import MultiSelect from "../components/MultiSelect";

const sampleItems: string[] = [
  "Ground clearance",
  "Tree clearance",
  "Building clearance",
];

export default function VegetationTab() {
  const key = "vegetation";
  const [searchParams, setSearchParams] = useSearchParams();
  const valueFilter = searchParams.get(key)?.split(",") || [];

  function setFilter(values: string[]) {
    if (values.length > 0) {
      searchParams.set(key, values.join(","));
      setSearchParams(searchParams);
    } else {
      searchParams.delete(key);
      setSearchParams(searchParams);
    }
  }
  return (
    <Stack sx={{ px: 2, py: 2, width: 300 }}>
      <Typography variant="h5" component="h2">
        Vegetation filter
      </Typography>
      <Typography variant="body1">
        Find issues with vegetation, building and clearance.
      </Typography>
      <Divider sx={{ my: 2 }} />

      <MultiSelect
        title="Vegetation rules"
        options={sampleItems}
        selectedOptions={valueFilter}
        setOptions={setFilter}
      />
    </Stack>
  );
}
