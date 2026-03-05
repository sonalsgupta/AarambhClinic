import React, { useMemo, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Stack,
    Chip,
    IconButton,
    Button,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import GroupsIcon from "@mui/icons-material/Groups";
import SpaIcon from "@mui/icons-material/Spa";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Blogs() {
    const slides = useMemo(
        () => [
            {
                title: "Understanding Common Mental Health Conditions",
                icon: <PsychologyIcon />,
                color: "#2F6FE4",
                chips: ["Education", "Symptoms", "Treatment"],
                faqs: [
                    {
                        q: "What is Depression? Signs, Causes, and Treatment",
                        a: "Depression is more than sadness—it can affect sleep, energy, concentration, appetite, and interest in daily life. Treatment may include therapy, lifestyle support, and when needed, medication under medical guidance.",
                    },
                    {
                        q: "Understanding Anxiety Disorders: When Worry Becomes a Problem",
                        a: "Anxiety becomes a disorder when worry is intense, persistent, and starts interfering with work, relationships, or sleep. Treatment can include therapy (like CBT), relaxation skills, and sometimes medication.",
                    },
                    {
                        q: "What is Bipolar Disorder? Understanding Mood Swings",
                        a: "Bipolar disorder involves shifts between low moods (depression) and elevated or irritable states (mania/hypomania). Proper diagnosis and a structured treatment plan are important for stability.",
                    },
                    {
                        q: "Schizophrenia Explained: Symptoms, Myths, and Treatment",
                        a: "Schizophrenia can affect thoughts, perceptions, and behavior. Early treatment improves outcomes. With ongoing care, many people can manage symptoms and live meaningful lives.",
                    },
                    {
                        q: "Sleep and Mental Health: Why Rest Matters",
                        a: "Sleep and mental health strongly influence each other. Poor sleep can worsen anxiety and mood, while stress can disturb sleep. Improving sleep routines is often part of recovery.",
                    },
                ],
            },
            {
                title: "Breaking Stigma & Building Awareness",
                icon: <MenuBookIcon />,
                color: "#F37C6B",
                chips: ["Stigma", "Myths", "Support"],
                faqs: [
                    {
                        q: "Mental Health is Health: Breaking the Stigma",
                        a: "Mental health conditions are medical conditions, not character flaws. Talking openly and seeking help early can prevent worsening symptoms and improve quality of life.",
                    },
                    {
                        q: "Why People Should Not Be Ashamed to Seek Psychiatric Help",
                        a: "Seeking help is a sign of strength. Psychiatric care is confidential, supportive, and focused on helping you function better—not on judging you.",
                    },
                    {
                        q: "Common Myths About Mental Illness",
                        a: "Many myths (like “it’s all in the mind” or “people can just snap out of it”) are harmful. Mental illnesses are real and treatable with proper care.",
                    },
                    {
                        q: "Why Talking About Mental Health Saves Lives",
                        a: "Open conversations reduce isolation and encourage timely support. Early help can reduce distress and prevent crises.",
                    },
                    {
                        q: "How Families Can Support Someone With Mental Health Challenges",
                        a: "Listen without judgment, encourage treatment, avoid blame, and learn about the condition. Supportive family involvement often improves outcomes.",
                    },
                ],
            },
            {
                title: "Family & Community Guidance",
                icon: <GroupsIcon />,
                color: "#2F6FE4",
                chips: ["Parents", "Workplace", "When to Seek Help"],
                faqs: [
                    {
                        q: "How to Support a Loved One With Depression",
                        a: "Be present, listen, and encourage professional support. Small consistent help (routine, meals, sleep) matters more than big lectures.",
                    },
                    {
                        q: "Mental Health in Teenagers: What Parents Should Know",
                        a: "Watch for changes in sleep, appetite, mood, school performance, or withdrawal. Create a safe space to talk and seek help early.",
                    },
                    {
                        q: "Mental Health and Workplace Stress",
                        a: "Chronic stress can lead to burnout, anxiety, and sleep issues. Boundaries, rest, and timely support are crucial to prevent long-term effects.",
                    },
                    {
                        q: "Recognizing Early Signs of Emotional Distress",
                        a: "Persistent sadness, irritability, excessive worry, low motivation, and changes in sleep/appetite can be early signs. Early intervention is always easier than crisis care.",
                    },
                    {
                        q: "When Should You See a Psychiatrist?",
                        a: "If symptoms affect daily life, work, relationships, sleep, or safety—or if you feel stuck despite self-help—consulting a psychiatrist can help clarify and guide treatment.",
                    },
                ],
            },
            {
                title: "Lifestyle & Prevention",
                icon: <SpaIcon />,
                color: "#2F6FE4",
                chips: ["Habits", "Mindfulness", "Well-being"],
                faqs: [
                    {
                        q: "5 Daily Habits That Improve Mental Well-Being",
                        a: "Regular sleep, sunlight, movement, balanced meals, and short mindfulness breaks can significantly improve mood and resilience over time.",
                    },
                    {
                        q: "How Exercise Helps Mental Health",
                        a: "Exercise supports brain chemistry, reduces stress, and improves sleep. Even a 20-minute walk can help regulate mood.",
                    },
                    {
                        q: "Mindfulness and Stress Reduction Techniques",
                        a: "Mindfulness helps you respond rather than react. Breathing exercises, body scans, and guided meditations are simple ways to begin.",
                    },
                    {
                        q: "Managing Digital Stress and Social Media Anxiety",
                        a: "Set time limits, unfollow triggering content, avoid doom-scrolling, and keep “phone-free” time before sleep.",
                    },
                    {
                        q: "The Importance of Talking About Emotions",
                        a: "Naming emotions reduces intensity and helps problem-solving. Talking to a trusted person or therapist builds emotional clarity and strength.",
                    },
                ],
            },
            {
                title: "Personal Stories That Inspire Hope",
                icon: <FavoriteBorderIcon />,
                color: "#F37C6B",
                chips: ["Real Journeys", "Recovery", "Hope"],
                faqs: [
                    {
                        q: "A Patient’s Journey From Depression to Recovery",
                        a: "Recovery often starts with one honest conversation. With support, therapy, and a structured plan, people gradually regain energy, hope, and confidence.",
                    },
                    {
                        q: "Living With Anxiety: A Personal Story",
                        a: "Anxiety can feel like constant tension, but learning coping tools and getting the right support can bring calm and control back into daily life.",
                    },
                    {
                        q: "How Therapy Changed My Life",
                        a: "Therapy helps you understand patterns, build healthy boundaries, and learn practical tools—leading to lasting emotional stability.",
                    },
                    {
                        q: "Breaking the Silence Around Mental Health",
                        a: "Sharing experiences reduces shame and helps others seek help sooner. One story can create courage in many others.",
                    },
                ],
            },
        ],
        []
    );

    const [idx, setIdx] = useState(0);

    const prev = () => setIdx((p) => (p - 1 + slides.length) % slides.length);
    const next = () => setIdx((p) => (p + 1) % slides.length);

    const slide = slides[idx];

    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    borderRadius: 3,
                    border: "1px solid #E6ECFF",
                    background: "linear-gradient(135deg,#F6F9FF,#FFFFFF)",
                    overflow: "hidden",
                }}
            >

                {/* Slide Title */}
                <Box sx={{ p: { xs: 2, md: 3 }, textAlign: "center" }}>
                    <Box
                        sx={{
                            width: 52,
                            height: 52,
                            mx: "auto",
                            mb: 1,
                            borderRadius: 3,
                            display: "grid",
                            placeItems: "center",
                            backgroundColor: "rgba(47,111,228,0.10)",
                            color: slide.color,
                            border: "1px solid #E6ECFF",
                        }}
                    >
                        {slide.icon}
                    </Box>

                    <Typography
                        sx={{
                            fontWeight: 900,
                            fontSize: { xs: 18, md: 22 },
                            color: slide.color,
                            lineHeight: 1.2,
                        }}
                    >
                        {slide.title}
                    </Typography>

                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1.5, flexWrap: "wrap", rowGap: 1 }}>
                        {slide.chips.map((c) => (
                            <Chip
                                key={c}
                                label={c}
                                size="small"
                                sx={{
                                    borderRadius: 2,
                                    border: "1px solid #E6ECFF",
                                    backgroundColor: "#fff",
                                    fontWeight: 700,
                                    color: "#2b3a52",
                                }}
                            />
                        ))}
                    </Stack>
                </Box>

                {/* Accordions */}
                <Box sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
                    {slide.faqs.map((f) => (
                        <Accordion
                            key={f.q}
                            elevation={0}
                            disableGutters
                            sx={{
                                mb: 1,
                                borderRadius: 2,
                                border: "1px solid #E6ECFF",
                                backgroundColor: "#fff",
                                "&:before": { display: "none" },
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography sx={{ fontWeight: 800, color: "#1F2A44" }}>
                                    {f.q}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: "#2c3440", lineHeight: 1.7 }}>
                                    {f.a}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}


                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 3,
                            py: 1.5,
                            background: "#F6F9FF",
                            borderTop: "1px solid #E6ECFF"
                        }}
                    >
                        {/* Previous */}
                        <Button
                            onClick={prev}
                            variant="text"
                            sx={{
                                textTransform: "none",
                                fontWeight: 700,
                                color: "#2F6FE4"
                            }}
                        >
                            Previous
                        </Button>

                        {/* Slide indicator */}
                        <Typography
                            sx={{
                                fontSize: 13,
                                color: "#6b7a90",
                                fontWeight: 600
                            }}
                        >
                            {idx + 1} / {slides.length}
                        </Typography>

                        {/* Next */}
                        <Button
                            onClick={next}
                            variant="text"
                            sx={{
                                textTransform: "none",
                                fontWeight: 700,
                                color: "#2F6FE4"
                            }}
                        >
                            Next
                        </Button>
                    </Box>

                    {/* CTA */}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} justifyContent="center" sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                fontWeight: 800,
                                borderRadius: 2,
                                backgroundColor: "#2F6FE4",
                                "&:hover": { backgroundColor: "#2458B8" },
                            }}
                        >
                            View All Articles
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                                fontWeight: 800,
                                borderRadius: 2,
                                borderColor: "#2F6FE4",
                                color: "#2F6FE4",
                                backgroundColor: "rgba(255,255,255,0.6)",
                            }}
                        >
                            Suggest a Topic
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}