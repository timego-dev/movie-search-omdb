import { FC } from "react";
import {
  Grid,
  Modal,
  Typography,
  CircularProgress,
  Stack,
  Box,
} from "@mui/material";
import "./styles.css";
import { useAppSelector } from "../../app/hooks";

interface IProps {
  open: boolean;
  onClose: Function;
}

const ModalDetail: FC<IProps> = ({ onClose, open }) => {
  const { currentMovie, currentMovieStatus } = useAppSelector(
    (state) => state.movie
  );

  const handleClose = () => onClose();

  return (
    <Modal open={open} onClose={handleClose}>
      {currentMovieStatus === "fetching" ? (
        <CircularProgress />
      ) : (
        <div className="m-item__detail">
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <img src={currentMovie?.Poster} alt="Thumbnail" width="100%" />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h5">{currentMovie?.Title}</Typography>
              <Typography variant="subtitle1">
                <strong>Rated: </strong> {currentMovie?.Rated}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Runtime: </strong> {currentMovie?.Runtime}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Genre: </strong> {currentMovie?.Genre}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Plot: </strong> {currentMovie?.Plot}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Country: </strong> {currentMovie?.Country}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Language: </strong> {currentMovie?.Language}
              </Typography>
              <Stack flexDirection="row">
                <Typography variant="subtitle1">
                  <strong>Rating: </strong>
                </Typography>
                <Box marginLeft="0.5em">
                  {currentMovie?.Ratings.map((rating) => (
                    <div>
                      <Typography variant="subtitle1">
                        {rating.Source} : {rating.Value}
                      </Typography>
                    </div>
                  ))}
                </Box>
              </Stack>
              <Typography variant="subtitle1">
                <strong>Metascore: </strong> {currentMovie?.Metascore}
              </Typography>
            </Grid>
          </Grid>
        </div>
      )}
    </Modal>
  );
};

export default ModalDetail;
