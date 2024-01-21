import { Stack } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  open?: boolean;
  active?: boolean;
  disabled?: boolean;
};

export default function Item({
  children,
  onClick,
  open,
  active,
  disabled,
}: Props) {
  return (
    <Stack
      onClick={() => {
        onClick && !disabled && onClick();
      }}
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "50px",
        width: "50px",
        cursor: onClick ? "pointer" : "",
        background: open ? "#EDEDED" : "white",
        position: "relative",
        color: disabled ? "#BDBDBD" : "#404040",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          background: active ? "#3B86FF" : "transparent",
          right: 5,
          top: 5,
          borderRadius: "50%",
        }}
      />
      {children}
    </Stack>
  );
}
