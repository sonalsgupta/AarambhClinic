import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  TextField,
  Stack,
  TableSortLabel,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Mock data (patients + last visit details)
const mockPatients = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "9876543210",
    lastVisited: "2024-12-20",
    visit: {
      symptoms: "Fever, body ache, sore throat",
      medicines: [
        { name: "Paracetamol 650", dose: "1 tab after food, TID x 3 days" },
        { name: "Cetirizine 10mg", dose: "1 tab at night, OD x 5 days" },
      ],
      anyChange: "Temperature reduced since last night; appetite improving.",
      doctorsNote: "Hydration + rest. If fever > 101°F persists beyond 48 hrs, follow up.",
    },
  },
  {
    id: 2,
    name: "Anita Verma",
    phone: "9123456789",
    lastVisited: "2024-12-18",
    visit: {
      symptoms: "Acidity, bloating",
      medicines: [
        { name: "Pantoprazole 40", dose: "1 tab before breakfast, OD x 14 days" },
        { name: "Antacid syrup", dose: "10 ml after meals, TID x 7 days" },
      ],
      anyChange: "Reduced burning sensation; still mild bloating after dinner.",
      doctorsNote: "Avoid spicy/oily food. Add light walk after meals. Review in 2 weeks.",
    },
  },
  {
    id: 3,
    name: "Suresh Patil",
    phone: "9988776655",
    lastVisited: "2024-12-15",
    visit: {
      symptoms: "Knee pain, stiffness in mornings",
      medicines: [
        { name: "Ibuprofen 400", dose: "1 tab after food, BID x 5 days" },
        { name: "Calcium + D3", dose: "1 tab daily, OD x 30 days" },
      ],
      anyChange: "Pain improved; stiffness persists slightly in the morning.",
      doctorsNote: "Start physiotherapy exercises. Avoid stairs. Consider X-ray if pain returns.",
    },
  },
];

function descComparator(a, b, orderBy) {
  const av = a?.[orderBy];
  const bv = b?.[orderBy];

  if (orderBy === "lastVisited") {
    const at = new Date(av).getTime();
    const bt = new Date(bv).getTime();
    return bt - at;
  }

  // string/number safe compare
  const as = (av ?? "").toString().toLowerCase();
  const bs = (bv ?? "").toString().toLowerCase();
  if (bs < as) return -1;
  if (bs > as) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descComparator(a, b, orderBy)
    : (a, b) => -descComparator(a, b, orderBy);
}

// stable sort (keeps original order when equal)
function stableSort(array, comparator) {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const cmp = comparator(a[0], b[0]);
    if (cmp !== 0) return cmp;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

export default function PatientTableWithModal() {
  const patients = useMemo(() => mockPatients, []);

  // search
  const [query, setQuery] = useState("");

  // sorting
  const [orderBy, setOrderBy] = useState("lastVisited");
  const [order, setOrder] = useState("desc");

  // modal
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleOpen = (patient) => {
    setSelected(patient);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = !q
      ? patients
      : patients.filter((p) => {
          const name = (p.name ?? "").toLowerCase();
          const phone = (p.phone ?? "").toLowerCase();
          return name.includes(q) || phone.includes(q);
        });

    return stableSort(filtered, getComparator(order, orderBy));
  }, [patients, query, order, orderBy]);

  return (
    <>
      {/* Search bar */}
      <Paper elevation={0} sx={{ p: 2, mb: 1, borderRadius: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems="center">
          <TextField
            fullWidth
            size="small"
            placeholder="Search by patient name or phone…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="caption" sx={{ opacity: 0.7, whiteSpace: "nowrap" }}>
            {filteredAndSorted.length} result(s)
          </Typography>
        </Stack>
      </Paper>

      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                >
                  Patient Name
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === "phone"}
                  direction={orderBy === "phone" ? order : "asc"}
                  onClick={() => handleRequestSort("phone")}
                >
                  Phone No
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === "lastVisited"}
                  direction={orderBy === "lastVisited" ? order : "desc"}
                  onClick={() => handleRequestSort("lastVisited")}
                >
                  Last Visited Date
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredAndSorted.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>
                  <Link
                    component="button"
                    underline="hover"
                    onClick={() => handleOpen(p)}
                    sx={{ fontWeight: 600 }}
                  >
                    {p.name}
                  </Link>
                </TableCell>

                <TableCell>{p.phone}</TableCell>

                <TableCell>{new Date(p.lastVisited).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}

            {filteredAndSorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    No patients found. (Try fewer letters—this search is not judging, only filtering.)
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal / Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ pb: 1 }}>
          {selected ? `${selected.name} — Visit Details` : "Visit Details"}
          {selected && (
            <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.8 }}>
              Phone: {selected.phone} • Last visited:{" "}
              {new Date(selected.lastVisited).toLocaleDateString()}
            </Typography>
          )}
        </DialogTitle>

        <DialogContent dividers>
          {selected?.visit ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Symptoms */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Symptoms
                </Typography>
                <Typography variant="body2">{selected.visit.symptoms}</Typography>
              </Box>

              <Divider />

              {/* Prescribed Medicines */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Prescribed Medicines
                </Typography>

                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Medicine</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Dose</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selected.visit.medicines.map((m, idx) => (
                      <TableRow key={`${m.name}-${idx}`}>
                        <TableCell>{m.name}</TableCell>
                        <TableCell>{m.dose}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>

              <Divider />

              {/* Any change */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Any change
                </Typography>
                <Typography variant="body2">{selected.visit.anyChange}</Typography>
              </Box>

              {/* Doctor's Note */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Doctor&apos;s Note
                </Typography>
                <Typography variant="body2">{selected.visit.doctorsNote}</Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="body2">No visit details available.</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
