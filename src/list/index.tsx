import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import useSWR from "swr";
import { VoidFunctionComponent } from "react";
import { OMDbSearchResponse } from "../api-types";
import { MovieDetailsFormData } from "../form";

interface MovieListProps {
  submittedFormData: MovieDetailsFormData;
}

const getMovieQueryParams = ({ movieTitle, year }: MovieDetailsFormData) => {
  const params = new URLSearchParams();
  params.set("s", movieTitle);
  if (year) {
    params.set("y", year);
  }

  return params.toString();
};

const fetchMovieDetails = (
  formData: MovieDetailsFormData
): Promise<OMDbSearchResponse> =>
  fetch(
    `http://www.omdbapi.com/?apikey=${
      process.env.REACT_APP_OMDB_API_KEY
    }&${getMovieQueryParams(formData)}`
  ).then((res) => res.json());

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  moviesGrid: {
    marginTop: theme.spacing(2),
    display: "grid",
    gridGap: theme.spacing(1),
    gridTemplateColumns: "repeat(1, 1fr)",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
  cardContent: {
    display: "flex",
  },
  posterImage: {
    marginRight: theme.spacing(1),
    maxHeight: 200,
    maxWidth: 140,
    [theme.breakpoints.up("sm")]: {
      maxHeight: 150,
    },
    [theme.breakpoints.up("md")]: {
      maxHeight: 200,
    },
  },
}));

export const MovieList: VoidFunctionComponent<MovieListProps> = ({
  submittedFormData,
}) => {
  const { data, error, isValidating } = useSWR(
    [submittedFormData],
    fetchMovieDetails
  );
  const classes = useStyles();
  if (error) {
    // TODO: handle errors by displaying a message to the user
    console.error("Error when fetching movie data", error);
  }

  return (
    <>
      <Paper className={classes.container}>
        <Typography>
          Showing results for movie{" "}
          <strong>{submittedFormData.movieTitle}</strong>
          {submittedFormData.year && (
            <>
              {" "}
              from year <strong>{submittedFormData.year}</strong>
            </>
          )}
        </Typography>
      </Paper>

      {/* TODO: only show a spinner when the query is loading for more than 200 ms to improve perceived performance */}
      {!data && isValidating && (
        <Box marginX="auto" marginY={2} textAlign="center">
          <CircularProgress />
        </Box>
      )}

      {/* TODO: add animation - fade in/out the grid */}
      {data && (
        // TODO: show a loading indicator when data is being invalidated
        <Box className={classes.moviesGrid}>
          {data.Search.map((movie) => (
            <Card key={movie.imdbID}>
              {/* TODO: show a different card layout for movies with a horizontal poster (poster on top, movie details on the bottom) */}
              <CardContent className={classes.cardContent}>
                {movie.Poster !== "N/A" && (
                  <img
                    src={movie.Poster}
                    alt={`${movie.Title} poster`}
                    className={classes.posterImage}
                  />
                )}
                <Box>
                  <Typography variant="h6" component="h2">
                    {movie.Title}
                  </Typography>
                  <Typography variant="subtitle1">{movie.Year}</Typography>
                  <Typography variant="caption">{movie.Type}</Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* TODO: add an icon to show that it opens in a new tab */}
                  Open on IMDb
                </Button>
              </CardActions>
            </Card>
          ))}
          {/* TODO: add pagination */}
        </Box>
      )}
    </>
  );
};
