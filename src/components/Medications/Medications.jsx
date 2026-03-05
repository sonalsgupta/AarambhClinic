import * as React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  MenuItem,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { LocalPharmacy, Add, NotificationsActive } from "@mui/icons-material";


export default function MedicationInventory() {
  const LOW_STOCK_THRESHOLD = 10;

  const [alertLowStock, setAlertLowStock] = React.useState(true);
  const [snack, setSnack] = React.useState({ open: false, msg: "", severity: "warning" });

  const [meds, setMeds] = React.useState(() => [
    { id: "m1", name: "Paracetamol 650", provider: "Cipla", stock: 28, discount: 8 },
    { id: "m2", name: "Azithromycin 500", provider: "Sun Pharma", stock: 9, discount: 5 },
    { id: "m3", name: "Cetirizine 10mg", provider: "Dr. Reddy’s", stock: 14, discount: 6 },
    { id: "m4", name: "Pantoprazole 40", provider: "Abbott", stock: 6, discount: 10 },
    { id: "m5", name: "Metformin 500", provider: "Lupin", stock: 42, discount: 4 },
    { id: "m6", name: "Amlodipine 5", provider: "Torrent", stock: 11, discount: 7 },
  ]);

  const providers = React.useMemo(() => {
    const set = new Set(meds.map((m) => m.provider));
    // include a few options even if meds list changes
    return ["Cipla", "Sun Pharma", "Dr. Reddy’s", "Abbott", "Lupin", "Torrent", ...Array.from(set)];
  }, [meds]);

  const [form, setForm] = React.useState({
    name: "",
    provider: "Cipla",
    stock: "",
    discount: "",
  });

  // Fire a one-time snack for low stock items on first render (optional)
  React.useEffect(() => {
    if (!alertLowStock) return;
    const low = meds.filter((m) => m.stock < LOW_STOCK_THRESHOLD);
    if (low.length) {
      setSnack({
        open: true,
        msg: `${low.length} medicine(s) are low in stock (below ${LOW_STOCK_THRESHOLD}).`,
        severity: "warning",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLow = (stock) => Number(stock) < LOW_STOCK_THRESHOLD;

  const addMedicine = () => {
    const name = form.name.trim();
    const provider = form.provider;
    const stock = Number(form.stock);
    const discount = Number(form.discount);

    if (!name || !provider || !Number.isFinite(stock) || stock < 0 || !Number.isFinite(discount) || discount < 0)
      return;

    const newMed = {
      id: `m_${Date.now()}`,
      name,
      provider,
      stock,
      discount,
    };

    setMeds((prev) => {
      const next = [newMed, ...prev].sort((a, b) => {
        // low stock first, then name
        if (isLow(a.stock) !== isLow(b.stock)) return isLow(a.stock) ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
      return next;
    });

    if (alertLowStock && isLow(stock)) {
      setSnack({
        open: true,
        msg: `Low stock alert: "${name}" has only ${stock} left.`,
        severity: "warning",
      });
    } else {
      setSnack({
        open: true,
        msg: `Added "${name}" to inventory.`,
        severity: "success",
      });
    }

    setForm({ name: "", provider: form.provider, stock: "", discount: "" });
  };

  const triggerLowStockAlert = (med) => {
    setSnack({
      open: true,
      msg: `"${med.name}" is low: ${med.stock} left (threshold ${LOW_STOCK_THRESHOLD}).`,
      severity: "warning",
    });
  };

  const lowCount = meds.filter((m) => isLow(m.stock)).length;

  return (
    <Paper elevation={2} sx={{ p: 2.5, borderRadius: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocalPharmacy color="primary" />
          <Box>
            <Typography fontWeight={800}>Medication Inventory</Typography>
            <Typography variant="caption" color="text.secondary">
              Medicines, providers, stock availability & provider discounts
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            size="small"
            label={`${lowCount} low stock`}
            color={lowCount ? "warning" : "success"}
            variant={lowCount ? "filled" : "outlined"}
          />
          <FormControlLabel
            control={
              <Switch
                checked={alertLowStock}
                onChange={(e) => setAlertLowStock(e.target.checked)}
              />
            }
            label={<Typography variant="body2">Alerts</Typography>}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Add Medicine Form */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <Typography fontWeight={800}>Add Medicine</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={addMedicine}
            sx={{ borderRadius: 2 }}
          >
            Add
          </Button>
        </Box>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Medicine name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            fullWidth
          />

          <TextField
            select
            label="Provider"
            value={form.provider}
            onChange={(e) => setForm((f) => ({ ...f, provider: e.target.value }))}
            sx={{ minWidth: 220 }}
          >
            {Array.from(new Set(providers)).map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Stock available"
            type="number"
            value={form.stock}
            onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
            inputProps={{ min: 0 }}
            sx={{ minWidth: 180 }}
          />

          <TextField
            label="Discount (%)"
            type="number"
            value={form.discount}
            onChange={(e) => setForm((f) => ({ ...f, discount: e.target.value }))}
            inputProps={{ min: 0 }}
            sx={{ minWidth: 160 }}
          />
        </Stack>

        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
          Tip: medicines with stock &lt; {LOW_STOCK_THRESHOLD} are highlighted and can raise alerts.
        </Typography>
      </Paper>

      {/* Grid "table" */}
      <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
        {/* Header row */}
        <Box sx={{ px: 2, py: 1.25, bgcolor: "action.hover" }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" fontWeight={800}>
                Medicine
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" fontWeight={800}>
                Provider
              </Typography>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="body2" fontWeight={800}>
                Stock
              </Typography>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="body2" fontWeight={800}>
                Discount
              </Typography>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Typography variant="body2" fontWeight={800} sx={{ textAlign: { sm: "right" } }}>
                Alert
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Rows */}
        <Box>
          {meds.map((m) => {
            const low = isLow(m.stock);
            return (
              <Box
                key={m.id}
                sx={{
                  px: 2,
                  py: 1.25,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  transition: "160ms ease",
                  bgcolor: low ? "rgba(255, 193, 7, 0.10)" : "transparent",
                  "&:hover": { bgcolor: low ? "rgba(255, 193, 7, 0.14)" : "action.hover" },
                }}
              >
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography fontWeight={700}>{m.name}</Typography>
                    {low && (
                      <Typography variant="caption" color="warning.main">
                        Low stock
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2">{m.provider}</Typography>
                  </Grid>

                  <Grid item xs={6} sm={2}>
                    <Chip
                      size="small"
                      label={`${m.stock}`}
                      color={low ? "warning" : "success"}
                      variant={low ? "filled" : "outlined"}
                    />
                  </Grid>

                  <Grid item xs={6} sm={2}>
                    <Typography variant="body2" fontWeight={700}>
                      {m.discount}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      by provider
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={1} sx={{ display: "flex", justifyContent: { sm: "flex-end" } }}>
                    <Tooltip
                      title={
                        low
                          ? "Send low stock alert"
                          : `Stock is OK (>= ${LOW_STOCK_THRESHOLD})`
                      }
                    >
                      <span>
                        <IconButton
                          size="small"
                          onClick={() => triggerLowStockAlert(m)}
                          disabled={!alertLowStock || !low}
                        >
                          <NotificationsActive
                            fontSize="small"
                            color={low ? "warning" : "disabled"}
                          />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Box>
      </Paper>

      {/* Snackbars */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
