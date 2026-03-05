import React from "react";
import { Box, Stack, Typography, Link } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const FEATURES = [

     {title: "Teleconsultation",
    desc: "Teleconsultation is available for those who can’t come physically to our clinic.",
  },
  {
    title: "Patient First",
    desc: "We prioritize the patient and provide them with the privacy to consult from their own locations",
  },
  {
    title: "Saves Time",
    desc: "We make it easier for patients to work appointments into their schedules without having to take time off from work",
  },
  {
    title: "Patient-Doctor Interaction",
    desc: "We make it a priority to devote fully the time needed for each patient",
  },
];

function FeatureRow({ title, desc }) {
  return (
    <Stack direction="row" spacing={2.2} alignItems="flex-start">
      <Box
        sx={{
          pt: 2.4,
        //   width: ,
          display: "flex",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <StarRoundedIcon sx={{ color: "#FFFFFF", fontSize: 25 }} />
      </Box>

      <Box>
        <Typography
          sx={{
            pt: 2.5,
            color: "#FFFFFF",
            fontWeight: 800,
            fontSize: { xs: 19, md: 21 },
            lineHeight: 1.2,
            textAlign: "left",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "rgba(255,255,255,0.85)",
            fontSize: 13.5,
            lineHeight: 1.55,
            maxWidth: 520,
          }}
        >
          {desc}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function AboutRightColumn() {
  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: 2,
        bgcolor: "#0A2A6A", // deep blue similar to screenshot
        // px: { xs: 3, md: 4 },
        // py: { xs: 4, md: 6 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 18px 50px rgba(0,0,0,0.22)",

        // smooth “column transition” feel on mount
        animation: "slideIn 420ms ease",
        "@keyframes slideIn": {
          from: { opacity: 0, transform: "translateX(10px)" },
          to: { opacity: 1, transform: "translateX(0px)" },
        },
      }}
    >
      {/* subtle highlight */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 420px at 30% 10%, rgba(255,255,255,0.10), transparent 62%)",
          pointerEvents: "none",
        }}
      />

      <Stack spacing={{ xs: 4, md: 6 }} sx={{ position: "relative" }}>
        {FEATURES.map((f) => (
          <FeatureRow key={f.title} title={f.title} desc={f.desc} />
        ))}
      </Stack>

     
    </Box>
  );
}