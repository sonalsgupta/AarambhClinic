import { Grid, Typography, Box, Avatar, Chip, Stack, Button, Divider } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import LockIcon from "@mui/icons-material/Lock";
import PsychologyIcon from "@mui/icons-material/Psychology";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import DoctorImg from "../styles/assets/images/doctor.jpg";
export default function AboutUs() {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 0,
        p: { xs: 2, md: 3 },
        mb: 3,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f7fbff 0%, #eef4ff 55%, #f8f9ff 100%)",
        border: "1px solid #e7eefc"
      }}
    >
      {/* subtle pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #dbe8ff 0, transparent 35%), radial-gradient(circle at 80% 30%, #e9ddff 0, transparent 38%), radial-gradient(circle at 50% 80%, #d7f5ff 0, transparent 40%)"
        }}
      />

      <Grid container spacing={3} alignItems="center" sx={{ position: "relative" }}>
        {}
        <Grid item xs={12} md="auto">
          <Box
            sx={{
              width: { xs: "100%", md: 230 },
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" }
            }}
          >
            <Box
              sx={{
                p: 1.2,
                borderRadius: 0,
                background: "rgba(255,255,255,0.9)",
                border: "1px solid #e7eefc",
                boxShadow: "0 10px 30px rgba(20,60,120,0.08)"
              }}
            >
              <Avatar
                
                src= {DoctorImg}
                alt="Aarambh Clinic"
                sx={{
                  width: { xs: 220, md: 200 },
                  height: { xs: 240, md: 220 },
                  borderRadius: 0
                }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Text */}
        <Grid item xs>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: 25, md: 25 },
              lineHeight: 1.3,
              color: "royalblue"
            }}
          >
            Dr Ritwick Chaterjee

 
            <br />
            
          </Typography>
           <Typography
            sx={{
              fontWeight: 500,
              fontSize: { xs: 20, md: 20 },
              lineHeight: 2,
              color: "royalblue"
            }}
          >
          Healing is a comforting journey


            <br />
            
          </Typography>

          {/* <Typography
            sx={{
              mt: 0.8,
              color: "#4f627a",
              fontWeight: 600
            }}
          >
            Mental Health Clinic • Psychiatric Care • Counselling Support
          </Typography> */}

          <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap", rowGap: 1 }}>
            <Chip icon={<LockIcon />} label="Confidential" />
            <Chip icon={<VerifiedIcon />} label="Evidence-based care" />
            <Chip icon={<PsychologyIcon />} label="Compassion-first approach" />
          </Stack>

          <Typography sx={{ mt: 1.5, color: "#2c3440", maxWidth: 820, lineHeight: 1.7 }}>
          At <b> Aarambh </b>Mental Health Clinic, we provide compassionate psychiatric care in a safe and supportive environment. We help individuals facing stress, anxiety, depression, and emotional challenges with understanding and personalized treatment.
           Our goal is simple — to listen, guide, and support every patient toward balance, hope, and better mental well-being.          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Quick actions */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
            <Button
              variant="contained"
              startIcon={<EventAvailableIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                px: 2.2
              }}
            >
              Book Appointment
            </Button>

            <Button
              variant="outlined"
              startIcon={<PersonAddAltIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                px: 2.2,
                backgroundColor: "rgba(255,255,255,0.6)"
              }}
            >
              Register New Patient
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}