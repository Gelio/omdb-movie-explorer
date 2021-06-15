import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { MovieDetailsForm, MovieDetailsFormData } from "./form";
import { MovieList } from "./list";

function App() {
  const [submittedFormData, setSubmittedFormData] =
    useState<MovieDetailsFormData | null>(null);

  return (
    <Container>
      <Box marginTop={5}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          OMDb Explorer
        </Typography>

        <Card>
          <CardContent>
            <MovieDetailsForm onSubmit={setSubmittedFormData} />
          </CardContent>
        </Card>

        {submittedFormData && (
          <MovieList submittedFormData={submittedFormData} />
        )}
      </Box>
    </Container>
  );
}

export default App;
