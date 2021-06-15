import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from "@material-ui/core";
import { MovieDetailsForm } from "./form";

function App() {
  return (
    <Container>
      <Box marginTop={5}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          OMDb Explorer
        </Typography>

        <Card>
          <CardContent>
            <MovieDetailsForm onSubmit={console.log} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default App;
