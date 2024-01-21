import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultiSelect({
  title,
  options,
  selectedOptions,
  setOptions,
}: {
  title: string;
  options: string[];
  selectedOptions: string[];
  setOptions: (options: string[]) => void;
}) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof options>) => {
    const {
      target: { value },
    } = event;
    setOptions(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div style={{ flex: 1, position: "relative" }}>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id={`multi-select-${title}-label`}>{title}</InputLabel>
        <Select
          labelId={`multi-select-${title}-label`}
          id={`multi-select-${title}`}
          multiple
          value={selectedOptions}
          onChange={handleChange}
          variant="filled"
          input={<OutlinedInput id="select-multiple-chip" label={title} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, selectedOptions, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
