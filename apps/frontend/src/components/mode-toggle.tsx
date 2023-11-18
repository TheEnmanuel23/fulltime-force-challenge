"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Label, Switch } from "ui";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="airplane-mode">
        <SunIcon />
      </Label>
      <Switch
        checked={theme === "dark"}
        id="airplane-mode"
        onCheckedChange={(e) => {
          setTheme(e ? "dark" : "light");
        }}
      />
      <Label htmlFor="airplane-mode">
        <MoonIcon />
      </Label>
    </div>
  );
}
