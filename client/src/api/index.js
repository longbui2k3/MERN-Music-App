export { default as SingerAPI } from "./SingerAPI";
export { default as SongAPI } from "./SongAPI";
export {
  Login,
  LoginGoogle,
  LoginFacebook,
  Logout,
  ForgotPassword,
  ResetPassword,
  SignUp,
  SignUpGoogle,
  SignUpFacebook,
  CheckExistEmail,
} from "./AuthenticationAPI";
export {
  getUser,
  addFavoriteListsong,
  removeFavoriteListsong,
} from "./UserAPI";
export { searchGenres } from "./GenreAPI";
export { getAllPlaylists, getPlaylist, createPlaylist } from "./PlaylistAPI";
export { createAlbum, getAlbumById } from "./AlbumAPI";
