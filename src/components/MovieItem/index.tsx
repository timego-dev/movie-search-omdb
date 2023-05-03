import Typography from "@mui/material/Typography";
import "./styles.css";
import { IMovie } from "../../types/movie";
import { FC, useState } from "react";
import ModalDetail from "../ModalDetail";

const MovieItem: FC<IMovie> = (movie) => {
  const [open, setOpen] = useState(false);
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
      <div onClick={()=>setOpen(true)} className="m-item__button">See Details</div>
      <ModalDetail
        open={open}
        id={movie.imdbID}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default MovieItem;
