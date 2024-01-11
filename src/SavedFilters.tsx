import React from "react";
import { Card, Divider, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

type Props = {};

export default function SavedFilters({}: Props) {
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
    <Stack sx={{ px: 2, py: 2, width: 300 }}>
      <Typography variant="h5" component="h2">
        Saved Filters
      </Typography>
      <Typography variant="body1">
        Save and re-use your favorite filters
      </Typography>
      <Divider sx={{ my: 2 }} />
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
