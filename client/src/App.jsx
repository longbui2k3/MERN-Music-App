import {
  PageForgotPassword,
  PageHome,
  PageLogin,
  PageNotFound,
  PageResetPassword,
  PageSignUp,
  PageStatus,
} from "./components";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Body from "./components/Body";
import TrackList from "./components/TrackList";
import Album from "./components/Album";
import Profile from "./components/Profile";
import { NavigateContextProvider } from "./context/NavigateContext";
import SearchPage from "./components/SearchPage";
import SearchComponent from "./components/SearchComponent";
import SearchStartPage from "./components/SearchStartPage";
export function App() {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <NavigateContextProvider>
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
              <Route
                path="/user/:id"
                element={
                  <PageHome>
                    <Profile />
                  </PageHome>
                }
              />
              <Route
                path="/search"
                element={
                  <PageHome>
                    <SearchPage>
                      <SearchStartPage />
                    </SearchPage>
                  </PageHome>
                }
              />
              <Route
                path="/search/:name"
                element={
                  <PageHome>
                    <SearchPage>
                      <SearchComponent />
                    </SearchPage>
                  </PageHome>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </NavigateContextProvider>
        </BrowserRouter>
      </AuthContextProvider>
    </ChakraProvider>
  );
}
