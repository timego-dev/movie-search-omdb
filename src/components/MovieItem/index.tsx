import Typography from "@mui/material/Typography";
import "./styles.css";
import { IMovie } from "../../types/movie";
import { FC, useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchMovieById } from "../../api/movie";

const MovieItem: FC<IMovie> = (movie) => {
  const dispatch = useAppDispatch();
  const handleSeeDetail = useCallback(() => {
    if (movie.imdbID) {
      dispatch(fetchMovieById(movie.imdbID));
    }
  }, [movie.imdbID, dispatch]);

  return (
    <div className="m-item">
      <div
        className="m-item__thumbnail"
        style={{ backgroundImage: `url(${movie.Poster})` }}
      ></div>
      <Typography variant="subtitle2">{movie.Year}</Typography>
      <Typography title={movie.Title} variant="h6" className="m-item__name">
        {movie.Title}
      </Typography>
      <div className="m-item__button" onClick={handleSeeDetail}>
        See Details
      </div>
    </div>
  );
};

export default MovieItem;
