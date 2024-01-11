import React, { useEffect } from "react";
import { Box, Collapse } from "@mui/material";
import Item from "./Item";
import {
  AccessTime,
  ElectricBolt,
  Forest,
  Grade,
  Inventory,
  Restore,
  ThreeDRotation,
  Warning,
} from "@mui/icons-material";
import SeverityTab from "./SeverityTab";
import VegetationTab from "./VegetationTab";
import ElectricTab from "./ElectricTab";
import TimeTab from "./TimeTab";
import SavedFilters from "./SavedFilters";
import InventoryTab from "./InventoryTab";
import LidarTab from "./LidarTab";
import { useSearchParams } from "react-router-dom";

type Props = {
  open: boolean;
  setActive: (active: boolean) => void;
};

export default function FilterSidebar({ open, setActive }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] =
    React.useState<keyof typeof componentMap>(0);

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

  const [savedFiltersActive, setSavedFiltersActive] = React.useState(false);

  useEffect(() => {
    setActive(
      severityActive ||
        vegetationActive ||
        electricActive ||
        timeActive ||
        inventoryActive ||
        savedFiltersActive
    );
  }, [
    severityActive,
    vegetationActive,
    electricActive,
    timeActive,
    inventoryActive,
    savedFiltersActive,
  ]);

  const componentMap = {
    0: null,
    1: <SeverityTab />,
    2: <VegetationTab />,
    3: <ElectricTab />,
    4: <InventoryTab />,
    5: <TimeTab />,
    7: <SavedFilters />,
  };

  const Component = componentMap[selectedTab];

  const anyFilterActive =
    severityActive ||
    vegetationActive ||
    electricActive ||
    timeActive ||
    inventoryActive ||
    savedFiltersActive;

  return (
    <>
      <Collapse in={open} orientation="horizontal">
        <Box
          sx={{
            width: "50px",
            height: "100vh",
            background: "white",
            display: open ? "block" : "none",
          }}
        >
          <Item
            disabled={!anyFilterActive}
            onClick={() => {
              searchParams.has("defects") && searchParams.delete("defects");
              searchParams.has("severity") && searchParams.delete("severity");
              searchParams.has("vegetation") &&
                searchParams.delete("vegetation");
              searchParams.has("time") && searchParams.delete("time");
              searchParams.has("inventory") && searchParams.delete("inventory");
              setSearchParams(searchParams);
            }}
          >
            <Restore />
          </Item>
          <Item
            active={severityActive}
            onClick={() => {
              if (selectedTab === 1) {
                setSecondMenuOpen(false);
              } else if (selectedTab === 0) {
                setSelectedTab(1);
                setSecondMenuOpen(true);
              } else {
                setSelectedTab(1);
              }
            }}
            open={selectedTab === 1}
          >
            <Warning />
          </Item>
          <Item
            active={vegetationActive}
            onClick={() => {
              if (selectedTab === 2) {
                setSecondMenuOpen(false);
              } else if (selectedTab === 0) {
                setSelectedTab(2);
                setSecondMenuOpen(true);
              } else {
                setSelectedTab(2);
              }
            }}
            open={selectedTab === 2}
          >
            <Forest />
          </Item>
          <Item
            active={electricActive}
            onClick={() => {
              if (selectedTab === 3) {
                setSecondMenuOpen(false);
              } else if (selectedTab === 0) {
                setSelectedTab(3);
                setSecondMenuOpen(true);
              } else {
                setSelectedTab(3);
              }
            }}
            open={selectedTab === 3}
          >
            <ElectricBolt />
          </Item>
          <Item
            active={inventoryActive}
            onClick={() => {
              if (selectedTab === 4) {
                setSelectedTab(4);
                setSecondMenuOpen(false);
              } else if (selectedTab === 0) {
                setSelectedTab(4);
                setSecondMenuOpen(true);
              } else {
                setSelectedTab(4);
              }
            }}
            open={selectedTab === 4}
          >
            <Inventory />
          </Item>
          <Item
            active={timeActive}
            onClick={() => {
              if (selectedTab === 5) {
                setSecondMenuOpen(false);
              } else if (selectedTab === 0) {
                setSelectedTab(5);
                setSecondMenuOpen(true);
              } else {
                setSelectedTab(5);
              }
            }}
            open={selectedTab === 5}
          >
            <AccessTime />
          </Item>
          <Item
            active={savedFiltersActive}
            onClick={() => {
              if (selectedTab === 7) {
                setSecondMenuOpen(false);
              } else if (selectedTab === 0) {
                setSelectedTab(7);
                setSecondMenuOpen(true);
              } else {
                setSelectedTab(7);
              }
            }}
            open={selectedTab === 7}
          >
            <Grade />
          </Item>
        </Box>
      </Collapse>
      <Collapse
        in={secondMenuOpen}
        orientation="horizontal"
        onTransitionEnd={(e) => {
          if (!secondMenuOpen) {
            setSelectedTab(0);
          }
        }}
      >
        <Box sx={{ height: "100vh", background: "#EDEDED" }}>{Component}</Box>
      </Collapse>
    </>
  );
}
