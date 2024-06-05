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
import { useEffect, useState } from "react";
import { getUser } from "./api";
import { BodyArtist, CreateAlbum, CreateSong } from "./components/artistRole";
import SearchPage from "./components/SearchPage";
import SearchComponent from "./components/SearchComponent";
import SearchStartPage from "./components/SearchStartPage";
import Artist from "./components/Artist";
import { useDispatch } from "react-redux";
import { setUserGlobal } from "./features/user/userSlice";
import SectionDetail from "./components/SectionDetail";
import ContentFeed from "./components/ContentFeed";
import Genre from "./components/Genre";
import BodyAdmin from "./components/adminRole/BodyAdmin";
export function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getUserFunc = async () => {
      try {
        setIsLoading(false);
        const res = await getUser();
        console.log(res);
        setUser(res.data.metadata.user);
        dispatch(setUserGlobal(res.data.metadata.user));
        setIsLoading(true);
      } catch (err) {
        setUser("");
        setIsLoading(true); 
        console.log(err);
      }
    };
    getUserFunc();
  }, []);
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <NavigateContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <PageHome isLoading={isLoading}>
                    {user.role === "admin" ? (
                      <BodyAdmin />
                    ) : user.role === "artist" ? (
                      <BodyArtist />
                    ) : (
                      <Body />
                    )}
                  </PageHome>
                }
              />
              <Route path="/status" element={<PageStatus />} />
              <Route path="/login" element={<PageLogin isLoading={isLoading} user={user}/>} />
              <Route path="/signup" element={<PageSignUp />} />
              <Route path="/forgotPassword" element={<PageForgotPassword />} />
              <Route
                path="/resetPassword/:userId/:token"
                element={<PageResetPassword />}
              />
              <Route
                path="/"
                element={
                  <PageHome isLoading={isLoading}>
                    {user.role === "admin" ? (
                      <BodyAdmin />
                    ) : user.role === "artist" ? (
                      <BodyArtist />
                    ) : (
                      <Body />
                    )}
                  </PageHome>
                }
              />
              <Route
                path="/playlist/:id"
                element={
                  <PageHome isLoading={isLoading}>
                    <TrackList />
                  </PageHome>
                }
              />

              <Route
                path="/album/:id"
                element={
                  <PageHome isLoading={isLoading}>
                    <Album />
                  </PageHome>
                }
              />
              <Route
                path="/user/:id"
                element={
                  <PageHome isLoading={isLoading}>
                    <Profile />
                  </PageHome>
                }
              />
              <Route
                path="/createAlbum"
                element={
                  <PageHome isLoading={isLoading}>
                    <CreateAlbum />
                  </PageHome>
                }
              />
              <Route
                path="/createSong"
                element={
                  <PageHome isLoading={isLoading}>
                    <CreateSong />
                  </PageHome>
                }
              />
              <Route
                path="/search"
                element={
                  <PageHome isLoading={isLoading}>
                    <SearchPage>
                      <SearchStartPage />
                    </SearchPage>
                  </PageHome>
                }
              />
              <Route
                path="/search/:name"
                element={
                  <PageHome isLoading={isLoading}>
                    <SearchPage>
                      <SearchComponent />
                    </SearchPage>
                  </PageHome>
                }
              />
              <Route
                path="/search/:name/:type"
                element={
                  <PageHome isLoading={isLoading}>
                    <SearchPage>
                      <SearchComponent />
                    </SearchPage>
                  </PageHome>
                }
              />
              <Route
                path="/artist/:id"
                element={
                  <PageHome isLoading={isLoading}>
                    <Artist />
                  </PageHome>
                }
              />
              <Route
                path="/section/:id"
                element={
                  <PageHome isLoading={isLoading}>
                    <SectionDetail />
                  </PageHome>
                }
              />
              <Route
                path="/content-feed"
                element={
                  <PageHome isLoading={isLoading}>
                    <ContentFeed />
                  </PageHome>
                }
              />
              <Route
                path="/genre/:id"
                element={
                  <PageHome isLoading={isLoading}>
                    <Genre />
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
