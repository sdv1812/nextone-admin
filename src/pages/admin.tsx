// pages/admin.js
import { IQuestion } from "interfaces";
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
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getQuestions, saveQuestion } from "service/QuestionService";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { Category, Difficulty } from "interfaces/IQuestion";

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
    category: Category.General,
    difficulty: Difficulty.Easy,
  });
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    getQuestions()
      .then((questions) => {
        setQuestions(questions);
      })
      .catch((error: AxiosError) => {
        setError(error);
      });
  }, []);

  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const addQuestion = () => {
    saveQuestion(question)
      .then((question) => {
        setQuestions([...questions, question]);
      })
      .catch((error: AxiosError) => {
        setError(error);
      });
  };

  const columns: GridColDef[] = [
    { field: "text", headerName: "Question", width: 300 },
    { field: "optionA", headerName: "Option A", width: 150 },
    { field: "optionB", headerName: "Option B", width: 150 },
    { field: "optionC", headerName: "Option C", width: 150 },
    { field: "optionD", headerName: "Option D", width: 150 },
    { field: "correctOption", headerName: "Correct Option", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "difficulty", headerName: "Difficulty", width: 150 },
    {
      field: "createdAt",
      valueFormatter: (value: Date) =>
        dayjs(value).format("DD/MMM/YYYY HH:mm:ss"),
      headerName: "Created At",
      width: 150,
    },
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
                      optionA: e.target.value,
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
                      optionB: e.target.value,
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
                      optionC: e.target.value,
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
                      optionD: e.target.value,
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
                    setQuestion({ ...question, category: e.target.value as Category })
                  }
                  label="Category"
                >
                  {Object.values(Category).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
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
                    setQuestion({ ...question, difficulty: e.target.value as Difficulty })
                  }
                  label="Difficulty"
                >
                  {
                    Object.values(Difficulty).map((difficulty) => (
                      <MenuItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid size={3}>
              <Button onClick={() => addQuestion()} variant="contained">
                Add question
              </Button>
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
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        message="This Snackbar will be dismissed in 5 seconds."
      />
    </Box>
  );
}
