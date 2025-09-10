import { Box } from "@mui/material";
import { HeroSection } from "../components/hero-section";
import { FeaturesSection } from "../components/features-section";

export function UiHome() {
  return (
    <Box
      sx={{
        height: "calc(100dvh - 64px)", // altezza piena viewport - header
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // niente scroll
      }}
    >
      {/* Hero prende lo spazio minimo che gli serve */}
      <Box sx={{ flexShrink: 0 }}>
        <HeroSection />
      </Box>

      {/* Features si adatta e riempie lo spazio rimanente */}
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <FeaturesSection />
      </Box>
    </Box>
  );
}

export default UiHome;
