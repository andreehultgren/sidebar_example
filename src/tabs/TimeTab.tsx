import { Divider, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import MultiSelect from "../components/MultiSelect";

const sampleItems: string[] = [
  "1 day",
  "1 week",
  "1 month",
  "3 months",
  "6 months",
  "1 year",
];

export default function TimeTab() {
  const key = "time";
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
        Time filter
      </Typography>
      <Typography variant="body1">Filter out when stuff happened</Typography>
      <Divider sx={{ my: 2 }} />

      <MultiSelect
        title="Time ago"
        options={sampleItems}
        selectedOptions={valueFilter}
        setOptions={setFilter}
      />
    </Stack>
  );
}
