import { Box, Button } from "@mui/material";
import { FaShoppingCart, FaHeartbeat, FaUsers } from "react-icons/fa";
import { FeatureCard } from "./feature-card";
import { useNavigate } from "react-router-dom";

export const FeaturesSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaShoppingCart />,
      title: "Shopping management",
      description:
        "Analyze and monitor your shopping habits for healthier and more conscious spending.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Health",
      description:
        "Keep track of your health with data, graphs and personalized advice.",
    },
    {
      icon: <FaUsers />,
      title: "For the whole family",
      description:
        "Organize your family’s data in a simple, convenient and shared way.",
    },
  ];

  return (
    <Box
      sx={{
        flex: 1,          // prende lo spazio rimanente
        minHeight: 0,     // impedisce di forzare scroll al parent
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "auto", // se vuoi scroll interno, se no metti "hidden"
        maxWidth: 1200,
        mx: "auto",
        px: 3,
        py: 4,
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={4}
        mb={4}
      >
        {features.map((feature, idx) => (
          <Box flex={1} key={idx}>
            <FeatureCard {...feature} />
          </Box>
        ))}
      </Box>

      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={() => navigate("/dashboard")}
        >
          Start now
        </Button>
      </Box>
    </Box>
  );
};
