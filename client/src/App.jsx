import {
  PageForgotPassword,
  PageHome,
  PageLogin,
  PageResetPassword,
  PageSignUp,
  PageStatus,
  SignUpGoogleStep1,
  SignUpGoogleStep2,
} from "./components";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Body from "./components/Body";
import TrackList from "./components/TrackList";
import Album from "./components/Album";
export function App() {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/home"
              element={
                <PageHome>
                  <Body />
                </PageHome>
              }
            />
            <Route path="/status" element={<PageStatus />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/signup" element={<PageSignUp />} />
            <Route path="/forgotPassword" element={<PageForgotPassword />} />
            <Route
              path="/resetPassword/:userId/:token"
              element={<PageResetPassword />}
            />
            <Route
              path="/"
              element={
                <PageHome>
                  <Body />
                </PageHome>
              }
            />
            <Route
              path="/playlist/:id"
              element={
                <PageHome>
                  <TrackList />
                </PageHome>
              }
            />

            <Route
              path="/album/:id"
              element={
                <PageHome>
                  <Album />
                </PageHome>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ChakraProvider>
  );
}
