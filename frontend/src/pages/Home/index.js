import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect, useSelector } from "react";
import axios from "axios";
import illustration from "../../assets/illustration.png";
import bgimg from "../../assets/homebg.png";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/";

const Home = () => {
    const theme = useTheme();
    return (
        <Box sx={{ margin: 0, padding: 0, display:"flex", flexDirection:"row", justifyContent:'space-between',}}>
            <Box sx={{width: "50%"}}>
                <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    backgroundColor: theme.palette.background.default,
                    height: '50vh',
                }}
                >
                <div style={{ flex: '1', padding: '0 8px' }}>
                    <div
                    style={{
                        textAlign: 'center',
                        maxWidth: '780px',
                        margin: '0 auto',
                        display:"flex",
                        justifyContent:"center",
                        flexDirection:"column",
                        alignItems:"center",
                    }}
                    >
                    <h1
                        style={{
                        marginBottom: '0px',
                        fontSize: '40px',
                        fontWeight: 'bold',
                        color: theme.palette.text.primary,
                        fontFamily: 'fantasy',
                        }}
                    >
                        TUBEIFY
                    </h1>
                    <p
                        style={{
                        maxWidth: '600px',
                        py:'15px',
                        marginBottom: '10px',
                        fontSize: '20px',
                        color: '#808080',
                        }}
                    >
                        This project compares three YouTube video summarization approaches: shot inferences, instruction fine-tuning, and parameter-efficient fine-tuning. It aims to uncover the strengths and weaknesses of each method to determine the most effective technique. Additionally, the research includes the development of a practical YouTube summarizer using React and Django, integrating with the OpenAI API for quiz generation. This holistic approach ensures that theoretical insights translate into a user-friendly solution, providing concise and informative video summaries.
                    </p>
                    </div>
                </div>
                </div>
            </Box>
            
            <Box sx={{ width:'50%', display:'flex', justifyContent:'center', alignItems:"center"}}>
                <img 
                    src={bgimg} 
                    alt="icon"  
                    style={{
                        filter: 'drop-shadow(0 0 1px #E5383B) drop-shadow(0 0 2px #E5383B) drop-shadow(0 0 3px #E5383B) drop-shadow(0 0 4px #E5383B)',
                        width: '55%',   
                    }}
                />
            </Box>
        </Box>
    );
};



export default Home;