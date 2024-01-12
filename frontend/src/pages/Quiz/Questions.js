import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Quiz = ({ questions }) => {
  const theme = useTheme();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event, index) => {
    setAnswers({
      ...answers,
      [index]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question, index) => (
        <Paper key={index} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" style={{ color: theme.palette.primary.light, marginBottom: '10px' }}>
            {question.question}
          </Typography>
          <RadioGroup onChange={(e) => handleChange(e, index)} value={answers[index] || ''}>
            {question.choices.map((choice, i) => (
              <FormControlLabel
                key={i}
                value={choice}
                sx={{
                  color: theme.palette.text.primary,
                  marginBottom: '8px',
                  '& .MuiRadio-root': {
                    color: theme.palette.primary.main,
                  },
                }}
                control={<Radio />}
                label={choice}
                disabled={submitted}
              />
            ))}
          </RadioGroup>
          {submitted && (
            <Typography variant="body1" style={{ color: theme.palette.text.primary }}>
              Answer: {question.choices.find((choice) => choice.endsWith('$'))}
            </Typography>
          )}
        </Paper>
      ))}
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Submit
      </Button>
    </form>
  );
};

export default Quiz;
