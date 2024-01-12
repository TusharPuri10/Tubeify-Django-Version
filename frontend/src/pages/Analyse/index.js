import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../store/slices/snackbar";
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from "@mui/material/";
import summarybg from "../../assets/summarybg.png";

const Analyse = () => {
    const [summary, setSummary] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSummaryBox, setShowSummaryBox] = useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();

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
                    open:'true',
                    message: "Please enter valid URL!!!",
                    variant: 'alert',
                    alert:{
                        severity: 'error',
                    }
                }),
            )
        }
    };

    const handleButtonClick = () => {
        if (link === '') {
            dispatch(
                openSnackbar({
                    open:'true',
                    message: "Please enter a message!",
                    variant: 'alert',
                    alert:{
                        severity: 'error',
                    }
                }),
            )
        }
        else {
            setShowSummaryBox(true);
            fetchSummary();
        }
    };

    return (
        <Box sx={{display: "flex",justifyContent:"center", alignItems:"center", flexDirection:"column", width:"100%"}}>
            <Box sx={{display: "flex", flexDirection:"row",justifyContent:"center", alignItems:"center", width:"60%",borderRadius:"10px"}}>
                <TextField 
                    label="Paste your link here" 
                    value={link} 
                    onChange={handleLinkChange} 
                    sx={{width:"80%"}}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ width:"20%", height:"57px", borderRadius:"0px", borderTopRightRadius:"10px", borderBottomRightRadius:"10px"}}
                    onClick={handleButtonClick}
                >
                    View Summary
                </Button>
            </Box>
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center",width:"100%"}}>
                {
                    showSummaryBox ?
                    <Box sx={{
                        boxShadow: '0 0 2px #B1A7A6, 0 0 4px #B1A7A6, 0 0 8px #B1A7A6, 0 0 10px #B1A7A6',     
                        margin: '60px 0px',  
                        width: '70%',  
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center', 
                        bgcolor: theme.palette.background.contrast, 
                    }}>
                    <Typography variant="h4" 
                        sx={{
                            marginBottom: '0px',
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: theme.palette.text.primary,
                            fontFamily: 'fantasy',
                            backgroundColor: theme.palette.background.default,
                            width:"100%",
                            textAlign:"center",
                            height:"50px",
                        }}>
                        Summary
                    </Typography>
                    {
                        loading ? (
                            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                                <LinearProgress sx={{width:"100%"}}/>
                                <img 
                                    src={summarybg} 
                                    alt="icon"  
                                    style={{
                                        filter: 'drop-shadow(0 0 1px #E5383B) drop-shadow(0 0 2px #E5383B) drop-shadow(0 0 3px #E5383B) drop-shadow(0 0 4px #E5383B)',
                                        width: '40%',   
                                        height: 'auto',
                                    }}
                                />
                            </Box>
                        ) : (
                            <Box sx={{width:"100%", overflowY: 'auto', maxHeight: '200px'}}>
                                <Typography variant="body1" 
                                    sx={{
                                        marginBottom: '0px',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        color: theme.palette.text.primary,
                                        fontFamily: 'fantasy',
                                        width:"100%",
                                        textAlign:"center",
                                    }}>
                                    {summary}
                                </Typography>
                            </Box>
                        )
                    }
                </Box> 
                :<img 
                    src={summarybg} 
                    alt="icon"  
                    style={{
                        filter: 'drop-shadow(0 0 1px #E5383B) drop-shadow(0 0 2px #E5383B) drop-shadow(0 0 3px #E5383B) drop-shadow(0 0 4px #E5383B)',
                        width: '40%',   
                        height: 'auto',
                    }}
                />
                }
            </Box>

        </Box>
    );
};

export default Analyse;