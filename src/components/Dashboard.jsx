import { Container, Grid, Divider } from "@mui/material";
import AboutUsSection from "../layouts/AboutUs";
import AppointmentsCard from "./Appointment";
import MeetingsCard from "./Meetings";
import TodoCard from "./MyToDoList";
import Footer from "../layouts/footer";

export default function Dashboard() {
  return (
    <>
      {/* SECTION 1 - FULL WIDTH */}
      <AboutUsSection />

      {/* Divider */}
      <Divider sx={{ my: 3 }} />

      {/* SECTION 2 - CENTERED CONTENT */}
      <Container maxWidth={false} disableGutters>
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <AppointmentsCard />
          </Grid>

          

          <Grid item xs={12} md={4}>
            <TodoCard />
          </Grid>

          <Grid item xs={12} md={6}>
            <MeetingsCard />
          </Grid>
        </Grid>
      </Container>

      {/* SECTION 3 - FULL WIDTH */}
      <Footer />
    </>
  );
}