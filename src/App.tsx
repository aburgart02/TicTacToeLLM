import { CssBaseline, ThemeProvider, createTheme, Container, Typography, Box, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';
import Board from './components/Board';
import { useTicTacToe } from './hooks/useTicTacToe';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const { board, isXNext, winner, winningLine, handleClick, resetGame } = useTicTacToe();

  const getStatusMessage = () => {
    if (winner === 'Draw') return "It's a Draw!";
    if (winner) return `Winner: ${winner}`;
    return `Next Player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
          color: 'white',
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Box
            component={motion.div}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                textShadow: '0 0 20px rgba(144, 202, 249, 0.5)',
                textAlign: 'center',
              }}
            >
              Tic Tac Toe
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60px',
              }}
            >
              <Typography
                variant="h4"
                component={motion.div}
                key={getStatusMessage()}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                sx={{
                  fontWeight: 500,
                  color: winner ? (winner === 'Draw' ? '#ffb74d' : '#69f0ae') : 'inherit',
                }}
              >
                {getStatusMessage()}
              </Typography>
            </Box>

            <Board
              board={board}
              onClick={handleClick}
              winningLine={winningLine}
              isGameActive={!winner}
            />

            <Button
              variant="contained"
              size="large"
              startIcon={<RefreshIcon />}
              onClick={resetGame}
              sx={{
                mt: 2,
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              Play Again
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
