import React from "react";
import { Box, Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import FilterSidebar from "./FilterSidebar";

function App() {
  const [filterOpen, setFilterOpen] = React.useState(false);
  return (
    <Stack direction="row">
      <Sidebar
        onFilterOpen={() => setFilterOpen(!filterOpen)}
        open={filterOpen}
      />
      <Box
        sx={{ flex: 1, background: "black" }}
        onClick={() => {
          setFilterOpen(false);
        }}
      />
    </Stack>
  );
}

export default App;
