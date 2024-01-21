import { Card, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export default function SavedFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  function resetFilters() {
    searchParams.has("defects") && searchParams.delete("defects");
    searchParams.has("severity") && searchParams.delete("severity");
    searchParams.has("vegetation") && searchParams.delete("vegetation");
    searchParams.has("time") && searchParams.delete("time");
    searchParams.has("inventory") && searchParams.delete("inventory");
    setSearchParams(searchParams);
  }

  const criticalDefectFilterActive =
    searchParams.get("severity") === "Critical" &&
    !searchParams.get("defects") &&
    !searchParams.get("vegetation") &&
    !searchParams.get("time") &&
    !searchParams.get("inventory");
  const treesTooCloseFilterActive =
    searchParams.get("defects") === "Tree too close" &&
    searchParams.get("vegetation") === "Tree clearance" &&
    !searchParams.get("severity") &&
    !searchParams.get("time") &&
    !searchParams.get("inventory");

  return (
    <Stack p={1}>
      <Typography fontWeight={700}>Saved Filters</Typography>
      <Stack spacing={1}>
        <Card
          onClick={() => {
            resetFilters();
            searchParams.set("severity", "Critical");
            setSearchParams(searchParams);
          }}
          sx={{ p: 2, cursor: "pointer", position: "relative" }}
        >
          Critical defects
          {criticalDefectFilterActive && (
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#3B85FF",
                position: "absolute",
                right: 10,
                top: 10,
              }}
            />
          )}
        </Card>
        <Card
          sx={{ p: 2, cursor: "pointer", position: "relative" }}
          onClick={() => {
            resetFilters();
            searchParams.set("defects", "Tree too close");
            searchParams.set("vegetation", "Tree clearance");
            setSearchParams(searchParams);
          }}
        >
          Trees too close
          {treesTooCloseFilterActive && (
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#3B85FF",
                position: "absolute",
                right: 10,
                top: 10,
              }}
            />
          )}
        </Card>
      </Stack>
    </Stack>
  );
}
