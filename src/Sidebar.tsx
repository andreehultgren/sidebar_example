import React from "react";
import { Box, Collapse } from "@mui/material";
import Item from "./components/Item";
import {
  AirplanemodeActive,
  Dashboard,
  FilterList,
  LogoDev,
  Settings,
} from "@mui/icons-material";
import FilterSidebar from "./FilterSidebar";

type Props = {
  onFilterOpen: () => void;
  open: boolean;
};

export default function Sidebar({ onFilterOpen, open }: Props) {
  const [active, setActive] = React.useState(false);
  return (
    <>
      <Box
        sx={{
          width: "50px",
          height: "100vh",
          background: "white",
        }}
      >
        <Item>
          <LogoDev />
        </Item>
        <Item>
          <AirplanemodeActive />
        </Item>
        <Item
          active={active}
          onClick={() => {
            onFilterOpen();
          }}
          open={open}
        >
          <FilterList />
        </Item>
        <Item>
          <Dashboard />
        </Item>
        <Item>
          <Settings />
        </Item>
      </Box>
      <Collapse in={open} orientation="horizontal">
        <FilterSidebar setActive={setActive} open={open} />
      </Collapse>
    </>
  );
}
