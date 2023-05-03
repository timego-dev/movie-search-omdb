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
import { useGetMovieByIdQuery } from "../../services/movies";

interface IProps {
  id: string;
  open: boolean;
  onClose: Function;
}

const ModalDetail: FC<IProps> = ({ id, onClose, open }) => {
  const { data, isFetching, isLoading } = useGetMovieByIdQuery(id);
  const handleClose = () => onClose();

  return (
    <Modal open={open} onClose={handleClose}>
      {isFetching || isLoading ? (
        <CircularProgress />
      ) : (
        <div className="m-item__detail">
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <img src={data?.Poster} alt="Thumbnail" width="100%" />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h5">{data?.Title}</Typography>
              <Typography variant="subtitle1">
                <strong>Rated: </strong> {data?.Rated}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Runtime: </strong> {data?.Runtime}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Genre: </strong> {data?.Genre}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Plot: </strong> {data?.Plot}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Country: </strong> {data?.Country}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Language: </strong> {data?.Language}
              </Typography>
              <Stack flexDirection="row">
                <Typography variant="subtitle1">
                  <strong>Rating: </strong>
                </Typography>
                <Box marginLeft="0.5em">
                  {data?.Ratings.map((rating) => (
                    <div>
                      <Typography variant="subtitle1">
                        {rating.Source} : {rating.Value}
                      </Typography>
                    </div>
                  ))}
                </Box>
              </Stack>
              <Typography variant="subtitle1">
                <strong>Metascore: </strong> {data?.Metascore}
              </Typography>
            </Grid>
          </Grid>
        </div>
      )}
    </Modal>
  );
};

export default ModalDetail;
