import React from "react";
import { Box, Container, Grid, Stack, Typography, Paper, Divider, Chip } from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";

import AboutRightColumn from "./AboutRightColumn";
import TestimonialsSection from "./TestimonialsSection";

function ImagePlaceholder({ label, h = 160 }) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: h,
        borderRadius: 0,
        position: "relative",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {/* elegant “random” look */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(420px 180px at 20% 20%, rgba(255,255,255,0.65), transparent 60%), linear-gradient(135deg, rgba(231,246,255,0.8), rgba(255,232,244,0.55))",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(260px 120px at 80% 70%, rgba(255,255,255,0.45), transparent 65%)",
          opacity: 0.9,
        }}
      />
      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "grid",
          placeItems: "center",
          p: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function AboutPage() {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, bgcolor: "background.default" }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={900}>
            About Aarambh Clinic
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Patient-first care, with time, privacy, and clarity — no “speed-run” consultations.
          </Typography>
        </Stack>

        <Grid
          container
          spacing={8}
          sx={{
            // smooth feel when layout changes / responsive
            "& .MuiGrid-item": { transition: "all 260ms ease" },
          }}
        >
          {/* LEFT (smaller) */}
          <Grid item xs={12} md={6} >
            <Stack spacing={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.4,
                  borderRadius: 0,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Stack spacing={1.4}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOnRoundedIcon />
                    <Typography fontWeight={800}>Address</Typography>
                  </Stack>
                  <Divider />
                  <Typography variant="body2">
                    <b>Aarambh Clinic</b>
                    <br />
                    2nd Floor, ABC Plaza, Near Main Road
                    <br />
                    Pimple Saudagar, Pune, Maharashtra
                    <br />
                    PIN: 411027
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip size="small" label="Family Medicine" />
                    <Chip size="small" label="Preventive Care" />
                    <Chip size="small" label="Follow-ups" />
                  </Stack>
                </Stack>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2.4,
                  borderRadius: 0,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography fontWeight={800} sx={{ mb: 1 }}>
                  Contact & Timings
                </Typography>
                <Stack spacing={1.1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocalPhoneRoundedIcon fontSize="small" />
                    <Typography variant="body2">+91 9XXXXXXXXX</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <MailRoundedIcon fontSize="small" />
                    <Typography variant="body2">aarambhclinic@example.com</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AccessTimeRoundedIcon fontSize="small" />
                    <Typography variant="body2">
                      Mon–Sat: 10:00 AM – 2:00 PM, 6:00 PM – 9:00 PM
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>

              {/* Elegant random image placeholders */}
              <Grid container spacing={1}>
                {/* <Grid item xs={12} sm={6}>
                  <ImagePlaceholder label="degree" h={190} />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <ImagePlaceholder label="Reception / Waiting Area" h={140} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ImagePlaceholder label=" something" h={170} />
                </Grid>
              </Grid>
            </Stack>
          </Grid>

          {/* RIGHT (wider) — the screenshot design */}
          <Grid item xs={12} md={6}>
            <AboutRightColumn />
          </Grid>

          {/* Bottom Testimonials full width */}
          <Grid item xs={12}>
            <TestimonialsSection />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}