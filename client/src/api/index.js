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
  addFavoriteMusicList,
  removeFavoriteMusicList,
  getMusicListsByUserId,
  getItemsByUserId,
  followSinger,
  unfollowSinger,
} from "./UserAPI";
export { searchGenres } from "./GenreAPI";
export {
  getAllPlaylists,
  getPlaylist,
  createPlaylist,
  addSongToPlaylist,
  addSongsToPlaylist
} from "./PlaylistAPI";
export { createAlbum, getAlbumById, getAllAlbums } from "./AlbumAPI";
export {
  getLikedSongsByUser,
  addSongToLikedSongs,
  removeSongFromLikedSongs,
} from "./LikedSongsAPI";
