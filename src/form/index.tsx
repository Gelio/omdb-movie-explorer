import { Button, makeStyles, TextField } from "@material-ui/core";
import { VoidFunctionComponent } from "react";
import { Controller, useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  formInput: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    flex: 1,
  },
  yearOfReleaseInput: {
    width: "160px",
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export interface MovieDetailsFormData {
  movieTitle: string;
  // strings seems easier to work with than a number, as an empty string is a valid value
  year: string;
}

interface MovieDetailsFormProps {
  onSubmit: (formData: MovieDetailsFormData) => void;
}

export const MovieDetailsForm: VoidFunctionComponent<MovieDetailsFormProps> = ({
  onSubmit,
}) => {
  const classes = useStyles();
  const { handleSubmit, control, formState } = useForm<MovieDetailsFormData>();
  const { isValid, isSubmitted } = formState;
  // TODO: add form validation

  return (
    <form
      noValidate
      autoComplete="off"
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* TODO: consider using an autocomplete component */}
      <Controller
        name="movieTitle"
        control={control}
        defaultValue=""
        rules={{ required: true, minLength: 1 }}
        render={({ field }) => (
          <TextField
            label="Movie title"
            variant="outlined"
            className={`${classes.formInput} ${classes.searchInput}`}
            required
            {...field}
          />
        )}
      />
      <Controller
        name="year"
        control={control}
        rules={{ min: 1888 }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Year of release"
            type="number"
            variant="outlined"
            className={`${classes.formInput} ${classes.yearOfReleaseInput}`}
            {...field}
          />
        )}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitted && !isValid}
      >
        Search
      </Button>
    </form>
  );
};
