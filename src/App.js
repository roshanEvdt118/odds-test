// i18n
import './locales/i18n';

// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide,
  Box,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import React, { useEffect, useRef, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
// routes
import { Toaster } from 'react-hot-toast';
import io from 'socket.io-client';
import Router from './routes';

// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';

// components
import { MotionLazyContainer } from './components/animate';
import ScrollToTop from './components/scroll-to-top';
import { SettingsProvider, ThemeSettings } from './components/settings';
import SnackbarProvider from './components/snackbar';

// Check our docs
// https://docs.minimals.cc/authentication/js-version

import { AuthProvider } from './auth/JwtContext';

import { persistor, store } from './redux/store';

// ----------------------------------------------------------------------

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

export default function App() {
  const [open, setOpen] = useState(false); // show on load

  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [allMessages, setAllMessages] = useState([]);

  const [adminCard, setAdminCard] = useState(null);
  const [userCard, setUserCard] = useState(null);

  // const socket = io("wss://dev-api-socket.odds777.bet", {
  //   transports: ["websocket"],
  // });

  // socket.on("connect", () => {
  //   console.log("Connected with Socket.IO");
  // });

  const socket = io('https://dev-api-socket.odds777.bet', {
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('✅ Connected to v2.x server!');
  });

  socket.on('connect_error', (err) => {
    console.log('❌ Connection Error:', err.message);
  });

  socket.on('credit_admin', (payload) => {
    setAdminCard(payload);
    setOpen(true);
    playSound();
    console.log('✅ credit admin', payload);
  });
  socket.on('debit_admin', (payload) => {
    setAdminCard(payload);
    setOpen(true);
    playSound();
    console.log('❌ debit_admin', payload);
  });
  socket.on('debit_user', (payload) => {
    setUserCard(payload);
    setOpen(true);
    playSound();
    console.log('❌ debit_user', payload);
  });
  socket.on('registration', (payload) => {
    setUserCard(payload);
    setOpen(true);
    playSound();
    console.log('✅ registration', payload);
  });

  console.log('allMessages', allMessages);

  const playSound = () => {
    const audio = new Audio('/sound/ting-sound.mp3');
    audio.play().catch((err) => {
      console.warn('Audio play blocked by browser:', err);
    });
  };

  useEffect(() => {
    // setOpen(true);
    // playSound();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const unlock = () => {
      const audio = new Audio();
      audio.play().catch(() => {});
      window.removeEventListener('click', unlock); // Remove after first click
    };
    window.addEventListener('click', unlock);
  }, []);

  return (
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SettingsProvider>
              <BrowserRouter>
                <ScrollToTop />
                <MotionLazyContainer>
                  <ThemeProvider>
                    {/* <ThemeSettings>  */}
                    <ThemeLocalization>
                      <SnackbarProvider>
                        <Router />
                        <Toaster reverseOrder={false} />
                      </SnackbarProvider>
                    </ThemeLocalization>
                    {/* </ThemeSettings>  */}
                  </ThemeProvider>
                </MotionLazyContainer>
              </BrowserRouter>
            </SettingsProvider>
          </PersistGate>
        </ReduxProvider>
      </HelmetProvider>
      {/* 🔽 Popup Dialog */}

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2,
            background: 'linear-gradient(to right, #fefcea, #f1da36)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          },
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <WarningAmberIcon color="warning" />
            <Typography fontWeight={600}>Notification!</Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          {adminCard && (
            <>
              <Typography>
                <strong>Message:</strong> {adminCard.message}
              </Typography>
              <Typography>
                <strong>Email:</strong> {adminCard.data?.email}
              </Typography>

              <Typography>
                <strong>Amount:</strong> ₹{adminCard.data?.amount}
              </Typography>
              <Typography>
                <strong>Currency:</strong> {adminCard.data?.currency}
              </Typography>
              <Typography>
                <strong>Source:</strong> {adminCard.data?.source}
              </Typography>
            </>
          )}

          {!adminCard && userCard && (
            <>
              {!userCard.data?.accountNumber && (
                <>
                  <Typography>
                    <strong>Email:</strong> {userCard.data?.email}
                  </Typography>
                  <Typography>
                    <strong>Message:</strong> {userCard.data?.message}
                  </Typography>
                </>
              )}
              <Typography>
                <strong>Message:</strong> {userCard.message}
              </Typography>
              <Typography>
                <strong>Name:</strong> {userCard.data?.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {userCard.data?.email}
              </Typography>
              <Typography>
                <strong>Account No.:</strong> ₹{userCard.data?.accountNumber}
              </Typography>
              <Typography>
                <strong>Bank:</strong> {userCard.data?.bank}
              </Typography>
              <Typography>
                <strong>IFSC Code:</strong> {userCard.data?.ifscCode}
              </Typography>
              <Typography>
                <strong>Mode:</strong> {userCard.data?.mode}
              </Typography>
            </>
          )}

          {!adminCard && !userCard && <Typography>No data received</Typography>}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </AuthProvider>
  );
}
