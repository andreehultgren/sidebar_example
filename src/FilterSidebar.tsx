import React, { useEffect } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import TabItem from "./components/TabItem";
import {
  AccessTime,
  ElectricBolt,
  Forest,
  Inventory,
  Pause,
  PlayArrow,
  Save,
  Stop,
  Warning,
} from "@mui/icons-material";
import {
  SeverityTab,
  VegetationTab,
  ElectricTab,
  TimeTab,
  SavedFilters,
  InventoryTab,
} from "./tabs";
import { useSearchParams } from "react-router-dom";

type Props = {
  open: boolean;
  setActive: (active: boolean) => void;
};

export default function FilterSidebar({ open, setActive }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] =
    React.useState<keyof typeof componentMap>(1);

  const [secondMenuOpen, setSecondMenuOpen] = React.useState(false);
  useEffect(() => {
    if (!open) {
      setSecondMenuOpen(false);
    }
  }, [open]);

  const electricActive = searchParams.has("defects");
  const severityActive = searchParams.has("severity");
  const vegetationActive = searchParams.has("vegetation");
  const timeActive = searchParams.has("time");
  const inventoryActive = searchParams.has("inventory");
  const filterEnabled =
    searchParams.has("filterActive") &&
    searchParams.get("filterActive") === "true";

  const [savedFiltersActive, setSavedFiltersActive] = React.useState(false);

  function enableFilter() {
    searchParams.set("filterActive", "true");
    setSearchParams(searchParams);
  }

  function disableFilter() {
    searchParams.set("filterActive", "false");
    searchParams.delete("filterActive");
    setSearchParams(searchParams);
  }

  function clearFilter() {
    searchParams.delete("defects");
    searchParams.delete("severity");
    searchParams.delete("vegetation");
    searchParams.delete("time");
    searchParams.delete("inventory");
    searchParams.delete("filterActive");
    setSearchParams(searchParams);
  }

  const anyFilterActive =
    severityActive ||
    vegetationActive ||
    electricActive ||
    timeActive ||
    inventoryActive ||
    savedFiltersActive;
  useEffect(() => {
    setActive(filterEnabled && anyFilterActive);
  }, [filterEnabled, anyFilterActive, setActive]);

  const componentMap = {
    1: <SeverityTab />,
    2: <VegetationTab />,
    3: <ElectricTab />,
    4: <InventoryTab />,
    5: <TimeTab />,
    7: <SavedFilters />,
  };

  const Component = componentMap[selectedTab];

  return (
    <>
      <Box
        sx={{
          width: 400,
          height: "100vh",
          background: "#EDEDED",
          position: "relative",
        }}
      >
        <Stack alignItems="center" justifyContent="center" px={2} pt={1}>
          <Typography component="h2" variant="h6">
            Filters
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ background: "#EDEDED" }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            px={1}
            maxWidth={200}
            flex={1}
          >
            <IconButton
              sx={{ color: "red" }}
              disabled={!anyFilterActive && !filterEnabled}
              onClick={() => {
                clearFilter();
              }}
            >
              <Stop />
            </IconButton>
            <IconButton
              sx={{ color: "orange" }}
              disabled={!filterEnabled}
              onClick={() => {
                disableFilter();
              }}
            >
              <Pause />
            </IconButton>

            <IconButton
              sx={{ color: "green" }}
              disabled={!(anyFilterActive && !filterEnabled)}
              onClick={() => {
                enableFilter();
              }}
            >
              <PlayArrow />
            </IconButton>
          </Stack>
        </Stack>
        <Stack
          px={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={0.2}
        >
          <TabItem
            active={severityActive}
            onClick={() => {
              setSelectedTab(1);
            }}
            open={selectedTab === 1}
          >
            <Warning />
          </TabItem>
          <TabItem
            active={vegetationActive}
            onClick={() => {
              setSelectedTab(2);
            }}
            open={selectedTab === 2}
          >
            <Forest />
          </TabItem>
          <TabItem
            active={electricActive}
            onClick={() => {
              setSelectedTab(3);
            }}
            open={selectedTab === 3}
          >
            <ElectricBolt />
          </TabItem>
          <TabItem
            active={inventoryActive}
            onClick={() => {
              setSelectedTab(4);
            }}
            open={selectedTab === 4}
          >
            <Inventory />
          </TabItem>
          <TabItem
            active={timeActive}
            onClick={() => {
              setSelectedTab(5);
            }}
            open={selectedTab === 5}
          >
            <AccessTime />
          </TabItem>
          <TabItem
            active={savedFiltersActive}
            onClick={() => {
              setSelectedTab(7);
            }}
            open={selectedTab === 7}
          >
            <Save />
          </TabItem>
        </Stack>
        <Box sx={{ mx: 1, height: 200, background: "#FFFFFF" }}>
          {Component}
        </Box>
      </Box>
    </>
  );
}
