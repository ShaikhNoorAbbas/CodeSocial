import { Grid, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import Sidebar from "@components/Sidebar/Index";
import Feed from "@components/Feed/Index";
import Rightbar from "@components/Rightbar/Index";
import Navbar from "@components/Navbar/Index";
import { useSelector } from "react-redux";
const Home = () => {
  const mode = useSelector((state) => state.mode.mode);
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Navbar>
        <Grid container direction="row" mt={8}>
          <CssBaseline />
          <Grid
            item
            sx={{ display: { xs: "none", md: "inline-block" } }}
            sm={2}
          >
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={7}>
            <Feed />
          </Grid>
          <Grid
            item
            sx={{ display: { xs: "none", md: "inline-block" } }}
            md={2}
          >
            <Rightbar />
          </Grid>
        </Grid>
      </Navbar>
    </ThemeProvider>
  );
};

export default Home;
