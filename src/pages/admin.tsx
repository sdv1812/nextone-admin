// pages/admin.js
import { IQuestion } from "@/interfaces";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

export default function Admin() {
  const [question, setQuestion] = useState<IQuestion>({
    id: "",
    text: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: "",
    explanation: "",
    category: "general",
    difficulty: "",
  });



  const rows: IQuestion[] = [
    {
      id: "1",
      text: "What is the capital of France?",
      optionA: "Paris",
      optionB: "London",
      optionC: "Berlin",
      optionD: "Rome",
      correctOption: "1a",
      explanation: "Paris is the capital of France.",
      category: "general",
      difficulty: "easy",
    }
  ];

  const [questions, setQuestions] = useState<IQuestion[]>(rows);

  const addQuestion = () => {
    setQuestions([...questions, question]);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "text", headerName: "Question", width: 300 },
    { field: "optionA", headerName: "Option A", width: 150 },
    { field: "optionB", headerName: "Option B", width: 150 },
    { field: "optionC", headerName: "Option C", width: 150 },
    { field: "optionD", headerName: "Option D", width: 150 },
    { field: "correctOption", headerName: "Correct Option", width: 150 },
    { field: "explanation", headerName: "Explanation", width: 300 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "difficulty", headerName: "Difficulty", width: 150 },
  ];
  return (
    <Box
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        padding: "24px",
      }}
    >
      <Box
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          marginBottom: "24px",
        }}
      >
        <Typography style={{ marginBottom: "12px" }} variant="h5">
          Add Question
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid size={12}>
              <FormControl fullWidth required>
                <TextField
                  onChange={(e) =>
                    setQuestion({ ...question, text: e.target.value })
                  }
                  value={question.text}
                  id="question-text"
                  aria-describedby="my-helper-text"
                  label="Question"
                  multiline
                  required
                />
              </FormControl>
            </Grid>

            <Grid size={12}>
              <FormControl fullWidth>
                <TextField
                  value={question.optionA}
                  id="question-option-a"
                  aria-describedby="my-helper-text"
                  onChange={(e) =>
                    setQuestion({
                      ...question,
                      text: e.target.value,
                    })
                  }
                  label="Option A"
                  required
                  multiline
                />
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <TextField
                  value={question.optionB}
                  id="question-option-b"
                  aria-describedby="my-helper-text"
                  label="Option B"
                  onChange={(e) =>
                    setQuestion({
                      ...question,
                      text: e.target.value,
                    })
                  }
                  required
                  multiline
                />
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <TextField
                  value={question.optionC}
                  id="question-option-c"
                  aria-describedby="my-helper-text"
                  label="Option C"
                  onChange={(e) =>
                    setQuestion({
                      ...question,
                      text: e.target.value,
                    })
                  }
                  required
                  multiline
                />
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <TextField
                  value={question.optionD}
                  id="question-option-d"
                  aria-describedby="my-helper-text"
                  label="Option D"
                  onChange={(e) =>
                    setQuestion({
                      ...question,
                      text: e.target.value,
                    })
                  }
                  required
                  multiline
                />
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormLabel id="question-correct-option-label">
                Correct Option
              </FormLabel>
              <RadioGroup
                aria-labelledby="question-correct-option-label"
                name="question-correct-option"
                value={question.correctOption}
                onChange={(e) =>
                  setQuestion({ ...question, correctOption: e.target.value })
                }
              >
                <FormControlLabel value="A" control={<Radio />} label="A" />
                <FormControlLabel value="B" control={<Radio />} label="B" />
                <FormControlLabel value="C" control={<Radio />} label="C" />
                <FormControlLabel value="D" control={<Radio />} label="D" />
              </RadioGroup>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <TextField
                  value={question.explanation}
                  id="question-explanation"
                  aria-describedby="my-helper-text"
                  label="Explanation"
                  onChange={(e) =>
                    setQuestion({ ...question, explanation: e.target.value })
                  }
                  required
                  multiline
                />
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth>
                <InputLabel id="question-category-label">Category</InputLabel>
                <Select
                  labelId="question-category-label"
                  value={question.category}
                  id="question-category"
                  onChange={(e) =>
                    setQuestion({ ...question, category: e.target.value })
                  }
                  label="Category"
                >
                  <MenuItem value="general">General</MenuItem>
                  <MenuItem value="math">Math</MenuItem>
                  <MenuItem value="science">Science</MenuItem>
                  <MenuItem value="history">History</MenuItem>
                  <MenuItem value="english">English</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth>
                <InputLabel id="question-difficulty-label">
                  Difficulty
                </InputLabel>
                <Select
                  labelId="question-difficulty-label"
                  value={question.difficulty}
                  id="question-difficulty"
                  onChange={(e) =>
                    setQuestion({ ...question, difficulty: e.target.value })
                  }
                  label="Difficulty"
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={3}>
              <Button onClick={addQuestion} variant="contained">Add question</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Typography style={{ marginBottom: "12px" }} variant="h5">
        Questions
      </Typography>
      <Box style={{ flex: 1 }}>
        <DataGrid rows={questions} columns={columns} />
      </Box>
    </Box>
  );
}
