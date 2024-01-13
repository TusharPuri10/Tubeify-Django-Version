import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../store/slices/snackbar";
import LinearProgress from "@mui/material/LinearProgress";
import { useTheme } from "@mui/material/";
import quizbg from "../../assets/quizbg.png";
import Questions from "./Questions";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [link, setLink] = useState('');
    const [loading, setloading] = useState(false);
    const [showquiz, setShowquiz] = useState(false);

    const ques = [
        {
            question:
                "1. What are the two important things to know when thinking about deploying things to the cloud in AWS?",
            choices: [
                "a) Availability zones and clusters",
                "b) Regions and clusters",
                "c) Zones and data centers",
                "d) Regions and availability zones $",
            ],
        },
        {
            question: "2. How does Amazon define its regions in AWS?",
            choices: [
                "a) Specific data centers",
                "b) Geographical locations with data centers $",
                "c) Cloud clusters with availability zones",
                "d) Multiple data centers in a zone",
            ],
        },
        {
            question: "3. What is an availability zone in AWS?",
            choices: [
                "a) A separate region within a geographical location",
                "b) A specific data center within a region",
                "c) A cluster of data centers within a region",
                "d) A separate data center within a region $",
            ],
        },
        {
            question:
                "4. How many availability zones are there in the Northern Virginia region?",
            choices: ["a) 2", "b) 3", "c) 4", "d) 6 $"],
        },
        {
            question:
                "5. How can you determine where to distribute your workloads in AWS?",
            choices: [
                "a) By geographically locating your users",
                "b) By selecting a region with more availability zones $",
                "c) By spreading load across all data centers",
                "d) By choosing a region with the shortest distance to your corporate office",
            ],
        },
        {
            question: "6. What are the orange bubbles on the map indicating?",
            choices: [
                "a) Availability zones under maintenance",
                "b) Upcoming regions or data centers $",
                "c) Restricted access zones",
                "d) Unavailable availability zones",
            ],
        },
        {
            question: "7. Where can you find documentation about AWS services?",
            choices: [
                "a) In the user guide for Linux instances",
                "b) In the API guides",
                "c) On the AWS Documentation website $",
                "d) All of the above",
            ],
        },
        {
            question:
                "8. According to the text, why is it important to understand the AWS infrastructure before deploying services?",
            choices: [
                "a) To ensure faster deployment",
                "b) To save costs on server usage",
                "c) To locate data centers close to users' geographical location",
                "d) To know where to put your data before turning on services $ ",
            ],
        },
        {
            question: "9. How many availability zones are available in Ohio?",
            choices: ["a) 2", "b) 3 $", "c) 4", "d) 6"],
        },
        {
            question:
                "10. What should you consider when selecting an availability zone for your EC2 instance?",
            choices: [
                "a) Geographical location and availability of data centers $",
                "b) Cost of instance usage",
                "c) Availability of specific services in the region",
                "d) Number of users in the region",
            ],
        },
    ];

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    const fetchQuestions = async () => {
        try {
            setloading(true);
            const { data } = await axios.post("/api/generate_quiz/",{
                ytlink: link,
            });
            console.log(data);
            setQuestions(data);
            setShowquiz(true);
            setloading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleButtonClick = () => {
        fetchQuestions();
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
                    Start Quiz
                </Button>
            </Box>
            {
                showquiz ?
                <Box sx={{mt:"20px"}}>
                    <Questions questions={questions} />
                </Box>
                :
                <Box sx={{display: "flex", flexDirection:"column",justifyContent:"center", alignItems:"center", width:"60%",borderRadius:"10px", marginTop:"20px"}}>
                    <Typography variant="h6" style={{color:"#808080", marginBottom:"10px"}}>
                        Enter the link and start the quiz !!!
                    </Typography>
                    <img 
                        src={quizbg} 
                        alt="icon"  
                        style={{
                            filter: 'drop-shadow(0 0 1px #E5383B) drop-shadow(0 0 2px #E5383B) drop-shadow(0 0 3px #E5383B) drop-shadow(0 0 4px #E5383B)',
                            width: '40%',   
                            height: 'auto',
                        }}
                    />
                    {loading && <LinearProgress />}
                </Box>
            }
        </Box>
    );
};

export default Quiz;
