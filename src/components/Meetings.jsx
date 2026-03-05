import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Stack,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { EventAvailable, Add, ExpandMore, ExpandLess } from "@mui/icons-material";

export default function MeetingsCard() {
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const [open, setOpen] = useState(false);

  // "Meetings" state
  const [meetingsOpen, setMeetingsOpen] = useState(false);
  const [showAddMeeting, setShowAddMeeting] = useState(false);

  const [meetings, setMeetings] = useState(() => [
    { with: "Dr. Deshmukh", date: "2025-12-29" }, // older (blur)
    { with: "Lab Technician", date: todayISO },
    { with: "Physio Dept", date: "2026-01-02" },
  ]);

  const [meetingForm, setMeetingForm] = useState({
    with: "",
    date: todayISO,
  });

  const apptCount = 12;

  const isPast = (isoDate) => {
    // Compare by date only (local)
    const d = new Date(isoDate + "T00:00:00");
    const t = new Date(todayISO + "T00:00:00");
    return d < t;
  };

  const addMeeting = () => {
    if (!meetingForm.with.trim() || !meetingForm.date) return;

    const newRow = {
      with: meetingForm.with.trim(),
      date: meetingForm.date,
    };

    setMeetings((prev) =>
      [...prev, newRow].sort((a, b) => a.date.localeCompare(b.date))
    );

    setMeetingForm({ with: "", date: todayISO });
    setShowAddMeeting(false);
    setMeetingsOpen(true);
    setOpen(true);
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EventAvailable color="primary" />
          <Typography variant="subtitle1" fontWeight={600}>
            Meeting
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography
          variant="h3"
          fontWeight={700}
          color="primary"
          role="button"
          tabIndex={0}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setOpen((v) => !v);
          }}
          sx={{
            width: "fit-content",
            cursor: "pointer",
            userSelect: "none",
            "&:hover": { opacity: 0.85 },
          }}
        >
          {apptCount}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Scheduled for today
        </Typography>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider sx={{ my: 2 }} />

          {/* Meetings section header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              mb: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle1" fontWeight={700}>
                Meetings
              </Typography>

              <Chip
                size="small"
                label={`${meetings.length}`}
                variant="outlined"
              />

              <Tooltip title={meetingsOpen ? "Collapse" : "Expand"}>
                <IconButton
                  size="small"
                  onClick={() => setMeetingsOpen((v) => !v)}
                >
                  {meetingsOpen ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Tooltip>
            </Box>

            <Button
              size="small"
              variant="outlined"
              startIcon={<Add />}
              onClick={() => {
                setShowAddMeeting((v) => !v);
                setMeetingsOpen(true);
              }}
              sx={{ borderRadius: 2 }}
            >
              Add meeting
            </Button>
          </Box>

          {/* Expand area */}
          <Collapse in={meetingsOpen} timeout="auto" unmountOnExit>
            {/* Add meeting form */}
            <Collapse in={showAddMeeting} timeout="auto" unmountOnExit>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
                <Stack spacing={2}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    New meeting
                  </Typography>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      label="Meeting with"
                      value={meetingForm.with}
                      onChange={(e) =>
                        setMeetingForm((f) => ({ ...f, with: e.target.value }))
                      }
                      fullWidth
                    />

                    <TextField
                      label="Date"
                      type="date"
                      value={meetingForm.date}
                      onChange={(e) =>
                        setMeetingForm((f) => ({ ...f, date: e.target.value }))
                      }
                      InputLabelProps={{ shrink: true }}
                      sx={{ minWidth: 220 }}
                    />
                  </Stack>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="contained" onClick={addMeeting} sx={{ borderRadius: 2 }}>
                      Save
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => setShowAddMeeting(false)}
                      sx={{ borderRadius: 2 }}
                    >
                      Cancel
                    </Button>
                  </Box>

                  {(!meetingForm.with.trim() || !meetingForm.date) && (
                    <Typography variant="caption" color="text.secondary">
                      Fill “Meeting with” and Date to save.
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </Collapse>

            {/* Meetings table (2 columns: Meeting With + Date) */}
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
              <Table size="small" aria-label="meetings table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Meeting with</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {meetings.map((m, idx) => {
                    const past = isPast(m.date);
                    return (
                      <TableRow
                        key={idx}
                        hover
                        sx={{
                          opacity: past ? 0.45 : 1,
                          filter: past ? "blur(0.6px)" : "none",
                          transition: "opacity 160ms ease, filter 160ms ease",
                        }}
                      >
                        <TableCell>{m.with}</TableCell>
                        <TableCell>{m.date}</TableCell>
                      </TableRow>
                    );
                  })}

                  {meetings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Typography variant="body2" color="text.secondary">
                          No meetings yet.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
              Older meeting dates appear blurred.
            </Typography>
          </Collapse>
        </Collapse>
      </CardContent>
    </Card>
  );
}
