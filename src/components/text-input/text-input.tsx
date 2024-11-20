import { TextField, TextFieldProps } from "@mui/material";

export const TextInput: React.FC<TextFieldProps> = (props) => {
  return <TextField fullWidth {...props} />;
};
