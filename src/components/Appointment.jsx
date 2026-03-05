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
} from "@mui/material";
import { EventAvailable, Add } from "@mui/icons-material";

export default function AppointmentsCard() {
  const [open, setOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const initialRows = useMemo(
    () => [
      { name: "Asha Kulkarni", type: "New", date: "2025-12-30", time: "09:30" },
      { name: "Rohit Mehta", type: "Follow-up", date: "2025-12-30", time: "10:15" },
      { name: "Meera Iyer", type: "New", date: "2025-12-30", time: "11:00" },
    ],
    []
  );

  const [rows, setRows] = useState(initialRows);

  const [form, setForm] = useState({
    name: "",
    type: "New",
    date: "2025-12-30",
    time: "",
  });

  const count = rows.length;

  const toggleTable = () => setOpen((v) => !v);

  const handleAdd = () => {
    // basic validation
    if (!form.name.trim() || !form.date || !form.time) return;

    setRows((prev) => [
      ...prev,
      {
        name: form.name.trim(),
        type: form.type,
        date: form.date,
        time: form.time,
      },
    ]);

    // reset
    setForm((f) => ({ ...f, name: "", time: "" }));
    setShowAdd(false);
    setOpen(true); // ensure user sees the new row
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EventAvailable color="primary" />
            <Typography variant="subtitle1" fontWeight={600}>
              Appointments
            </Typography>
          </Box>

          <Button
            size="small"
            variant="outlined"
            startIcon={<Add />}
            onClick={() => {
              setShowAdd((v) => !v);
              setOpen(true);
            }}
            sx={{ borderRadius: 2 }}
          >
            Add
          </Button>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography
          variant="h3"
          fontWeight={700}
          color="primary"
          role="button"
          tabIndex={0}
          onClick={toggleTable}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleTable();
          }}
          sx={{
            width: "fit-content",
            cursor: "pointer",
            userSelect: "none",
            "&:hover": { opacity: 0.85 },
          }}
          aria-label="Toggle appointments table"
        >
          {count}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Scheduled for today
        </Typography>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider sx={{ my: 2 }} />

          {/* Add form */}
          <Collapse in={showAdd} timeout="auto" unmountOnExit>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
              <Stack spacing={2}>
                <Typography variant="subtitle2" fontWeight={700}>
                  Add Appointment
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="Name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    fullWidth
                  />

                  <TextField
                    select
                    label="New/Follow-up"
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                    sx={{ minWidth: 160 }}
                  >
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Follow-up">Follow-up</MenuItem>
                  </TextField>
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="Date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                    sx={{ minWidth: 200 }}
                  />

                  <TextField
                    label="Time"
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                    sx={{ minWidth: 200 }}
                  />

                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Button variant="contained" onClick={handleAdd} sx={{ borderRadius: 2 }}>
                      Save
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => setShowAdd(false)}
                      sx={{ borderRadius: 2 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Stack>

                {(!form.name.trim() || !form.time) && (
                  <Typography variant="caption" color="text.secondary">
                    Tip: Name + Time are required (otherwise your appointment becomes… a “quantum visit”).
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Collapse>

          {/* Table */}
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
            <Table size="small" aria-label="appointments table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>New/Follow-up</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Time</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((r, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={r.type}
                        variant={r.type === "New" ? "filled" : "outlined"}
                      />
                    </TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>{r.time}</TableCell>
                  </TableRow>
                ))}

                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="body2" color="text.secondary">
                        No appointments yet.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </CardContent>
    </Card>
  );
}
