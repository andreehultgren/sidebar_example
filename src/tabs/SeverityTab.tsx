import { Divider, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import MultiSelect from "../components/MultiSelect";

const sampleItems: string[] = [
  "Critical",
  "Issue",
  "Should be fixed",
  "Good to know",
];

export default function SeverityTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defectFilter = searchParams.get("severity")?.split(",") || [];

  function setSeverityFilter(severities: string[]) {
    if (severities.length > 0) {
      searchParams.set("severity", severities.join(","));
      setSearchParams(searchParams);
    } else {
      searchParams.delete("severity");
      setSearchParams(searchParams);
    }
  }
  return (
    <Stack sx={{ px: 2, py: 2, width: 300 }}>
      <Typography variant="h5" component="h2">
        Severity filter
      </Typography>
      <Typography variant="body1">
        Filter out issues with your grid by severity level
      </Typography>
      <Divider sx={{ my: 2 }} />

      <MultiSelect
        title="Severities"
        options={sampleItems}
        selectedOptions={defectFilter}
        setOptions={setSeverityFilter}
      />
    </Stack>
  );
}
