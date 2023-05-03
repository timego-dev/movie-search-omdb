import { Container, TextField, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import "./App.css";
import { COLORS } from "./constants/colors";
import MovieList from "./components/MovieList";
import { useCallback, useState } from "react";
import { debounce } from "lodash";

function App() {
  const [searchText, setSearchText] = useState<string>("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(
    debounce((value: string) => setSearchText(value), 500),
    []
  );
  return (
    <Container className="m-container">
      <Box marginBottom="1em">
        <Typography
          marginBottom="20px"
          color={COLORS.TITLE_COLOR}
          variant="h3"
          textAlign="center"
        >
          Movie Search Application
        </Typography>
        <TextField
          onChange={(e) => handleChange(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Search for movie name... (Please input more than 3 characters)"
        />
      </Box>
      <MovieList searchText={searchText} />
    </Container>
  );
}

export default App;
