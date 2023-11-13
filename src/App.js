import MainPage from './components/MainPage';
import CoinDetails from './components/CoinDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

function App() {
  let customTheme = createTheme({
    breakpoints: {
      values: {
        xs: 360,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  customTheme = responsiveFontSizes(customTheme);

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/coins/:id" element={<CoinDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
