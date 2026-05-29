import React from "react";
import Dashboard from "./dashboard";

export default function Projects() {
  // Wrap and mount our central Hyprland BowisWM focused on Workspace 2
  return <Dashboard defaultWorkspace={2} />;
}
