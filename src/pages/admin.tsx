// pages/admin.js
import { IQuestion } from "interfaces";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
import MDEditor from "@uiw/react-md-editor";
import { uploadQuestionImages } from "service/QuestionService";

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

  const [uploadedImgsExp, setUploadedImgsExp] = useState<string[]>([]);
  const [uploadingImgsExp, setUploadingImgsExp] = useState(false);
  const [uploadErrorImgsExp, setUploadErrorImgsExp] = useState<string>("");

  const [uploadedImgsQuestions, setUploadedImgsQuestions] = useState<string[]>([]);
  const [uploadingImgsQuestions, setUploadingImgsQuestions] = useState(false);
  const [uploadErrorImgsQuestions, setUploadErrorImgsQuestions] = useState<string>("");


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

  const [adding, setAdding] = useState(false);
  const initialQuestion: IQuestion = {
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
  };
  const addQuestion = async () => {
    if (adding) return;
    setAdding(true);
    try {
      const newQuestion = await saveQuestion(question);
      setQuestions([...questions, newQuestion]);
      setQuestion(initialQuestion);
      setUploadedImgsExp([]);
      setUploadedImgsQuestions([]);
      setUploadErrorImgsExp("");
      setUploadErrorImgsQuestions("");
    } catch (error) {
      setError(error as AxiosError);
    }
    setAdding(false);
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
              <FormControl fullWidth>
                <FormLabel>Upload Images (for question) if any</FormLabel>

                <label htmlFor="image-upload-input-question">
                  <Button
                    variant="outlined"
                    component="span"
                    disabled={uploadingImgsExp}
                    style={{ margin: "12px 0" }}
                  >
                    <input
                      id="image-upload-input-question"
                      type="file"
                      multiple
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={async (e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length === 0) return;
                        setUploadingImgsQuestions(true);
                        setUploadErrorImgsQuestions("");
                        try {
                          const urls = await uploadQuestionImages(files);
                          setUploadedImgsQuestions((prev) => [...prev, ...urls]);
                        } catch (_error) {
                          setUploadErrorImgsQuestions("Failed to upload images");
                        }
                        setUploadingImgsQuestions(false);
                      }}
                    />
                    {uploadingImgsQuestions ? "Uploading..." : "Upload Images"}
                  </Button>
                </label>
                {uploadingImgsQuestions && <FormHelperText>Uploading...</FormHelperText>}
                {uploadErrorImgsQuestions && (
                  <FormHelperText error>{uploadErrorImgsQuestions}</FormHelperText>
                )}
                {uploadedImgsQuestions.length > 0 && (
                  <Box style={{ marginTop: "12px" }}>
                    <Typography variant="subtitle2">
                      Uploaded Images:
                    </Typography>
                    {uploadedImgsQuestions.map((url, idx) => (
                      <Box
                        key={url}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <Box
                          component="img"
                          src={url}
                          alt={`uploaded-${idx}`}
                          style={{
                            maxWidth: 100,
                            maxHeight: 100,
                            marginRight: 8,
                            borderRadius: 4,
                            border: "1px solid #ccc",
                          }}
                        />
                        <TextField
                          value={url}
                          size="small"
                          InputProps={{ readOnly: true }}
                          style={{ marginRight: 8, width: 300 }}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            navigator.clipboard.writeText(url);
                          }}
                        >
                          Copy URL
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <FormLabel id="question-label">
                  Question Text
                </FormLabel>
                <MDEditor
                  value={question.text}
                  onChange={(value) =>
                    setQuestion({ ...question, text: value || "" })
                  }
                  height={200}
                  data-color-mode="light"
                />
                {question.text === "" && (
                  <FormHelperText error={question.text === ""}>
                    Required field.
                  </FormHelperText>
                )}
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
            {/* Image upload section */}
            <Grid size={12}>
              <FormControl fullWidth>
                <FormLabel>Upload Images (for explanation) if any</FormLabel>

                <label htmlFor="image-upload-input">
                  <Button
                    variant="outlined"
                    component="span"
                    disabled={uploadingImgsExp}
                    style={{ margin: "12px 0" }}
                  >
                    <input
                      id="image-upload-input"
                      type="file"
                      multiple
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={async (e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length === 0) return;
                        setUploadingImgsExp(true);
                        setUploadErrorImgsExp("");
                        try {
                          const urls = await uploadQuestionImages(files);
                          setUploadedImgsExp((prev) => [...prev, ...urls]);
                        } catch (_error) {
                          setUploadErrorImgsExp("Failed to upload images");
                        }
                        setUploadingImgsExp(false);
                      }}
                    />
                    {uploadingImgsExp ? "Uploading..." : "Upload Images"}
                  </Button>
                </label>
                {uploadingImgsExp && <FormHelperText>Uploading...</FormHelperText>}
                {uploadErrorImgsExp && (
                  <FormHelperText error>{uploadErrorImgsExp}</FormHelperText>
                )}
                {uploadedImgsExp.length > 0 && (
                  <Box style={{ marginTop: "12px" }}>
                    <Typography variant="subtitle2">
                      Uploaded Images:
                    </Typography>
                    {uploadedImgsExp.map((url, idx) => (
                      <Box
                        key={url}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <Box
                          component="img"
                          src={url}
                          alt={`uploaded-${idx}`}
                          style={{
                            maxWidth: 100,
                            maxHeight: 100,
                            marginRight: 8,
                            borderRadius: 4,
                            border: "1px solid #ccc",
                          }}
                        />
                        <TextField
                          value={url}
                          size="small"
                          InputProps={{ readOnly: true }}
                          style={{ marginRight: 8, width: 300 }}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            navigator.clipboard.writeText(url);
                          }}
                        >
                          Copy URL
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <FormLabel id="question-explanation-label">
                  Explanation
                </FormLabel>
                <MDEditor
                  value={question.explanation}
                  onChange={(value) =>
                    setQuestion({ ...question, explanation: value || "" })
                  }
                  height={400}
                  data-color-mode="light"
                />
                {question.explanation === "" && (
                  <FormHelperText error={question.explanation === ""}>
                    Required field.
                  </FormHelperText>
                )}
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
                    setQuestion({
                      ...question,
                      category: e.target.value as Category,
                    })
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
                    setQuestion({
                      ...question,
                      difficulty: e.target.value as Difficulty,
                    })
                  }
                  label="Difficulty"
                >
                  {Object.values(Difficulty).map((difficulty) => (
                    <MenuItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={3}>
              <Button
                onClick={addQuestion}
                variant="contained"
                disabled={adding}
                loading={adding}
              >
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
        onClose={() => setError(undefined)}
      >
        <Alert 
          severity="error"
          onClose={() => setError(undefined)}
        >
          {error?.message || "An error occurred while fetching questions."}
        </Alert>
      </Snackbar>
    </Box>
  );
}
