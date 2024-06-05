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
export { searchGenres, getGenres, getGenre } from "./GenreAPI";
export {
  getAllPlaylists,
  getPlaylist,
  createPlaylist,
  addSongToPlaylist,
  addSongsToPlaylist,
  updatePlaylist,
} from "./PlaylistAPI";
export { createAlbum, getAlbumById, getAllAlbums } from "./AlbumAPI";
export {
  getLikedSongsByUser,
  addSongToLikedSongs,
  removeSongFromLikedSongs,
} from "./LikedSongsAPI";
export {
  searchLists,
  searchSongs,
  searchSingers,
  searchAlbums,
  searchPlaylists,
} from "./SearchAPI";
export { getChildOfFolder, createFolder } from "./FolderAPI";
