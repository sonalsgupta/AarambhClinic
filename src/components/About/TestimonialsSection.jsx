import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

function TestimonialCard({ text, name }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        minHeight: 160,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, rgba(231,246,255,0.75), rgba(255,232,244,0.55))",
      }}
    >
      {/* exactly 3 lines */}
      <Typography
        variant="body2"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          lineHeight: 1.6,
        }}
      >
        {text}
      </Typography>

      {/* 4th line: name bottom-right */}
      <Typography
        variant="subtitle2"
        sx={{
          alignSelf: "flex-end",
          fontWeight: 800,
          color: "text.primary",
          mt: 2,
        }}
      >
        — {name}
      </Typography>
    </Paper>
  );
}

export default function TestimonialsSection() {
  const testimonials = [
    {
      text:
        "Doctor explained the diagnosis very clearly and patiently. The clinic environment is calm and welcoming.",
      name: "Priya S.",
    },
    {
      text:
        "Very professional consultation and practical advice. Felt reassured and comfortable during the visit.",
      name: "Rahul K.",
    },
    {
      text:
        "One of the few doctors who listens carefully. The treatment worked well and follow-up was smooth.",
      name: "Anita M.",
    },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
        Patient Experiences
      </Typography>

      <Grid container spacing={2.2}>
        {testimonials.map((t, i) => (
          <Grid item xs={12} md={4} key={i}>
            <TestimonialCard text={t.text} name={t.name} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}