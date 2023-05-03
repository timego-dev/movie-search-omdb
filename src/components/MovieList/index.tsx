import { Grid, CircularProgress, Pagination } from "@mui/material";
import MovieItem from "../MovieItem";
import "./styles.css";
import { FC, useEffect, useState } from "react";
import { useGetMoviesQuery } from "../../services/movies";
import Typography from "@mui/material/Typography";

interface IProps {
  searchText: string;
}

const MovieList: FC<IProps> = ({ searchText }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isFetching, isLoading, data } = useGetMoviesQuery(
    { searchText, page: currentPage },
    {
      refetchOnMountOrArgChange: 1000,
    }
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  if (!searchText || searchText.length < 2) {
    return null;
  }

  if (isLoading || isFetching) {
    return <CircularProgress />;
  }

  if (!data?.total) {
    return (
      <Typography textAlign="center" width="100%">
        Empty
      </Typography>
    );
  }

  return (
    <>
      <Grid className="m-list" container spacing={2}>
        {data?.items.map((movie) => (
          <Grid key={movie.imdbID} item xs={3}>
            <MovieItem {...movie} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        className="m-pagination"
        count={data.total || 0}
        page={currentPage}
        onChange={(e, value) => handleChangePage(value)}
        size="medium"
      />
    </>
  );
};

export default MovieList;
