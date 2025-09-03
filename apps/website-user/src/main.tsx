import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

// 👇 importa da MUI X
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Definisci un tema personalizzato se vuoi
const theme = createTheme({
  palette: {
    mode: 'light', // oppure 'dark'
    primary: { main: '#22c55e' }, // verde simile al tuo stile
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Azzera gli stili di default del browser */}
      <BrowserRouter>
        {/* 👇 Wrappa tutta l’app qui */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
