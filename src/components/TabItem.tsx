import { Stack } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  open?: boolean;
  active?: boolean;
  disabled?: boolean;
};

export default function TabItem({
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: "40px",
        flex: 1,
        cursor: onClick ? "pointer" : "",
        background: open ? "#ffffff" : "#f6f6f6",
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
