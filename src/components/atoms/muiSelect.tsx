import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type SelectOption = {
  value: string;
  label: string;
};

type BasicSelectProps = {
  label?: string;
  items: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
};

export default function BasicSelect({ label, items, onChange, value }: BasicSelectProps) {
  const [curVal, setValue] = React.useState(value ?? '');

  const handleChange = (event: SelectChangeEvent) => {
    const localValue = event.target.value as string;
    setValue(localValue);
    onChange(localValue);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          {items.map((item) => {
            return <MenuItem value={item.value} selected={item.value === curVal}>{label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
