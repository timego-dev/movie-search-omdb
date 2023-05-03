import { Grid, CircularProgress, Pagination } from "@mui/material";
import MovieItem from "../MovieItem";
import "./styles.css";
import { FC, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchMovies } from "../../api/movie";
import {
  setCurrentMovie,
  setMovies,
  setPage,
} from "../../app/slices/movie.slice";
import ModalDetail from "../ModalDetail";

interface IProps {
  searchText: string;
}

const MovieList: FC<IProps> = ({ searchText }) => {
  const dispatch = useAppDispatch();
  const {
    total,
    currentPage,
    movies,
    moviesStatus,
    currentMovieStatus,
    currentMovie,
  } = useAppSelector((state) => state.movie);

  useEffect(() => {
    if (searchText) {
      dispatch(setPage(1));
      dispatch(fetchMovies({ searchText, page: 1 }));
    } else {
      dispatch(setMovies([]));
    }
  }, [searchText, dispatch]);

  const handleChangePage = (page: number) => {
    dispatch(setPage(page));
    dispatch(fetchMovies({ searchText, page }));
  };

  const handleCloseModal = () => {
    dispatch(setCurrentMovie(null));
  };

  if (!searchText || searchText.length < 2) {
    return null;
  }

  if (moviesStatus === "fetching") {
    return <CircularProgress />;
  }

  if (!total) {
    return (
      <Typography textAlign="center" width="100%">
        Empty
      </Typography>
    );
  }

  return (
    <>
      <Grid className="m-list" container spacing={2}>
        {movies.map((movie) => (
          <Grid key={movie.imdbID} item xs={3}>
            <MovieItem {...movie} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        className="m-pagination"
        count={total}
        page={currentPage}
        onChange={(e, value) => handleChangePage(value)}
        size="medium"
      />
      <ModalDetail
        open={currentMovieStatus === "fetching" || Boolean(currentMovie)}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default MovieList;
