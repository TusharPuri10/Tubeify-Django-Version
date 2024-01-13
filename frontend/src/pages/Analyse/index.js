import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../store/slices/snackbar";
import LinearProgress from "@mui/material/LinearProgress";
import { useTheme } from "@mui/material/";
import summarybg from "../../assets/summarybg.png";
import YouTube from "react-youtube";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const Analyse = () => {
    const [summary, setSummary] = useState("");
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSummaryBox, setShowSummaryBox] = useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();
    const [videoId, setVideoId] = useState("");

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    const fetchSummary = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post("/api/generate_summary/", {
                ytlink: link,
            });
            console.log(data);
            setSummary(data.message);
            setLoading(false);
        } catch (err) {
            dispatch(
                openSnackbar({
                    open: "true",
                    message: "Please enter valid URL!!!",
                    variant: "alert",
                    alert: {
                        severity: "error",
                    },
                })
            );
        }
    };

    const handleButtonClick = () => {
        if (link === "") {
            dispatch(
                openSnackbar({
                    open: "true",
                    message: "Please enter a message!",
                    variant: "alert",
                    alert: {
                        severity: "error",
                    },
                })
            );
        } else {
            setShowSummaryBox(true);
            const videoid = new URL(link).searchParams.get("v");
            setVideoId(videoid);
            fetchSummary();
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "60%",
                    borderRadius: "10px",
                }}
            >
                <TextField
                    label="Paste your link here"
                    value={link}
                    onChange={handleLinkChange}
                    sx={{ width: "80%" }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        width: "20%",
                        height: "57px",
                        borderRadius: "0px",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                    }}
                    onClick={handleButtonClick}
                >
                    View Summary
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                {showSummaryBox ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "90%",
                        }}
                    >
                        <Box
                            sx={{
                                boxShadow:
                                    "0 0 2px #B1A7A6, 0 0 4px #B1A7A6, 0 0 8px #B1A7A6, 0 0 10px #B1A7A6",
                                margin: "60px 0px",
                                width: "55%",
                            }}
                        >
                            <YouTube
                                videoId={videoId}
                                opts={{
                                    // height: '100%',
                                    width: "100%",
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                boxShadow:
                                    "0 0 2px #B1A7A6, 0 0 4px #B1A7A6, 0 0 8px #B1A7A6, 0 0 10px #B1A7A6",
                                margin: "60px 20px",
                                width: "45%",
                                // hieght:"350px",
                                display: "flex",
                                flexDirection: "column",
                                // justifyContent: "center",
                                // alignItems: "center",
                                bgcolor: theme.palette.background.contrast,
                            }}
                        >
                            {/* <Typography
                                variant="h4"
                                sx={{
                                    marginBottom: "0px",
                                    marginTop: "0px",
                                    fontSize: "30px",
                                    fontWeight: "bold",
                                    color: theme.palette.text.primary,
                                    fontFamily: "fantasy",
                                    backgroundColor:
                                        theme.palette.background.default,
                                    width: "100%",
                                    textAlign: "center",
                                    alignItems: "center",   
                                    height: "50px",
                                }}
                            >
                                Summary
                            </Typography> */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                    backgroundColor:theme.palette.background.default,
                                    borderBottom:"1px solid #808080",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        marginBottom: "0px",
                                        marginTop: "0px",
                                        fontSize: "30px",
                                        fontWeight: "bold",
                                        color: theme.palette.text.primary,
                                        fontFamily: "fantasy",
                                        textAlign: "center",
                                        alignItems: "center",
                                        width: "90%",
                                        height: "50px",
                                    }}
                                >
                                    Summary
                                </Typography>
                                <IconButton
                                    onClick={() =>
                                        navigator.clipboard.writeText(summary)
                                    }
                                >
                                    <FileCopyIcon fontSize="small"/>
                                </IconButton>
                            </Box>
                            {loading ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        position: "relative",
                                    }}
                                >
                                    <CircularProgress
                                        sx={{ position: "absolute", zIndex: 1 }}
                                    />
                                    <img
                                        src={summarybg}
                                        alt="icon"
                                        style={{
                                            // filter: "drop-shadow(0 0 1px #E5383B) drop-shadow(0 0 2px #E5383B) drop-shadow(0 0 3px #E5383B) drop-shadow(0 0 4px #E5383B)",
                                            width: "40%",
                                            height: "auto",
                                            opacity: "0.25",
                                            position: "relative",
                                            zIndex: 0,
                                        }}
                                    />
                                    <Typography
                                        variant="p"
                                        style={{
                                            color: "#808080",
                                            marginBottom: "5px",
                                        }}
                                    >
                                        Generating Summary, Till then enjoy
                                        watching video !!!
                                    </Typography>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        width: "100%",
                                        overflowY: "auto",
                                        height: "320px",
                                        "&::-webkit-scrollbar": {
                                            width: "5px",
                                        },
                                        "&::-webkit-scrollbar-track": {
                                            background:
                                                theme.palette.background
                                                    .default,
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            background:
                                                theme.palette.secondary.main,
                                        },
                                        "&::-webkit-scrollbar-thumb:hover": {
                                            background:
                                                theme.palette.secondary.dark,
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            marginBottom: "0px",
                                            fontSize: "15px",
                                            // fontWeight: "bold",
                                            color: theme.palette.text.primary,
                                            fontFamily: "fantasy",
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        {summary}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Typography
                            variant="h6"
                            style={{ color: "#808080", marginTop: "20px" }}
                        >
                            Enter the link to generate summary !!!
                        </Typography>
                        <img
                            src={summarybg}
                            alt="icon"
                            style={{
                                filter: "drop-shadow(0 0 1px #E5383B) drop-shadow(0 0 2px #E5383B) drop-shadow(0 0 3px #E5383B) drop-shadow(0 0 4px #E5383B)",
                                width: "100%",
                                height: "450px",
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Analyse;
