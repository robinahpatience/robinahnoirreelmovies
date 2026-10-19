import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e50914" },
    background: { default: "#0b0b12", paper: "#14141f" },
  },
  typography: { fontFamily: "Roboto, Arial, sans-serif" },
  shape: { borderRadius: 10 },
});

export default theme;