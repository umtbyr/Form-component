import { Box, Button, Grid2 } from "@mui/material";
import * as React from "react";
import { DndListInput, TextInput } from "../../components";

type SampleFormProps = object;

export const SampleForm: React.FC<SampleFormProps> = () => {
  //react hook for registiration
  //validations

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        border: "solid 2px #666",
        p: 3,
        minHeight: "400px",
        my: 10,
        mx: "auto",
        bgcolor: "#f2f2f2",
      }}
    >
      <Grid2 container direction="column" spacing={2}>
        <Grid2>
          <TextInput name="title" />
        </Grid2>
        <Grid2>
          <TextInput name="desc" multiline rows={4} />
        </Grid2>
        <Grid2>
          <DndListInput />
        </Grid2>
        <Grid2>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};
