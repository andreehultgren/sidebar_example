import { Divider, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import MultiSelect from "../components/MultiSelect";

const sampleItems: string[] = ["Poles", "Transformers", "Insulators", "Wires"];

export default function InventoryTab() {
  const key = "inventory";
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
        Inventory filter
      </Typography>
      <Typography variant="body1">
        Find where your assets are located
      </Typography>
      <Divider sx={{ my: 2 }} />

      <MultiSelect
        title="Inventory items"
        options={sampleItems}
        selectedOptions={valueFilter}
        setOptions={setFilter}
      />
    </Stack>
  );
}
