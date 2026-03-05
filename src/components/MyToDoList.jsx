import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Collapse,
  Stack,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import { Checklist, Add, Flag, FlagOutlined, CheckCircleOutline } from "@mui/icons-material";

export default function TodoCard() {
   
  // Mock initial tasks
  const initialTasks = useMemo(
    () => [
      { id: "t1", title: "Call lab for reports", done: false, priority: true },
      { id: "t2", title: "Follow-up patient billing", done: false, priority: false },
      { id: "t3", title: "Order stationery", done: true, priority: false },
      { id: "t4", title: "Update patient visit notes", done: false, priority: false },
      { id: "t5", title: "Confirm tomorrow’s schedule", done: false, priority: true },
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const pendingCount = tasks.filter((t) => !t.done).length;

  const addTask = () => {
    const title = newTask.trim();
    if (!title) return;

    setTasks((prev) => [
      {
        id: `t_${Date.now()}`,
        title,
        done: false,
        priority: false,
      },
      ...prev,
    ]);
    setNewTask("");
    setOpen(true);
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const togglePriority = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, priority: !t.priority } : t))
    );
  };

  // optional: sort priority first, then pending first
  const visibleTasks = useMemo(() => {
    const copy = [...tasks];
    copy.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority ? -1 : 1;
      if (a.done !== b.done) return a.done ? 1 : -1;
      return 0;
    });
    return copy;
  }, [tasks]);

  return (
    <Card elevation={2}>
      <CardContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Checklist color="warning" />
            <Typography variant="subtitle1" fontWeight={600}>
              To-Do List
            </Typography>
            <Chip
              size="small"
              variant="outlined"
              label={`${pendingCount} pending`}
              sx={{ ml: 0.5 }}
            />
          </Box>

          <Button
            size="small"
            variant="outlined"
            startIcon={<Add />}
            onClick={() => setOpen((v) => !v)}
            sx={{ borderRadius: 2 }}
          >
            Add task
          </Button>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Count (click to toggle list) */}
        <Typography
          variant="h3"
          fontWeight={700}
          color="warning.main"
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
          aria-label="Toggle task list"
        >
          {pendingCount}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Pending tasks
        </Typography>

        {/* Expand area */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider sx={{ my: 2 }} />

          {/* Add Task row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 1.5 }}>
            <TextField
              size="small"
              fullWidth
              label="New task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
            />
            <Button variant="contained" onClick={addTask} sx={{ borderRadius: 2 }}>
              Add
            </Button>
          </Stack>

          {/* Task list */}
          <List dense disablePadding>
            {visibleTasks.map((t) => (
              <ListItem
                key={t.id}
                divider
                secondaryAction={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {/* Priority */}
                    <Tooltip title={t.priority ? "Unflag priority" : "Flag as priority"}>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => togglePriority(t.id)}
                      >
                        {t.priority ? (
                          <Flag color="warning" fontSize="small" />
                        ) : (
                          <FlagOutlined fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>

                    {/* Complete */}
                    <Tooltip title={t.done ? "Mark as pending" : "Mark complete"}>
                      <IconButton edge="end" size="small" onClick={() => toggleDone(t.id)}>
                        <CheckCircleOutline
                          fontSize="small"
                          color={t.done ? "success" : "inherit"}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
                sx={{
                  opacity: t.done ? 0.55 : 1,
                  textDecoration: t.done ? "line-through" : "none",
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: t.priority ? 700 : 500 }}
                      >
                        {t.title}
                      </Typography>
                      {t.priority && (
                        <Chip size="small" label="Priority" color="warning" />
                      )}
                      {t.done && <Chip size="small" label="Done" color="success" />}
                    </Box>
                  }
                />
              </ListItem>
            ))}

            {visibleTasks.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                No tasks yet.
              </Typography>
            )}
          </List>

          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
            Tip: priority tasks float to the top. Because attention is a scarce resource, like parking in Pune.
          </Typography>
        </Collapse>
      </CardContent>
    </Card>
  );
}
