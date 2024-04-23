import { useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { closeEditFormPlaylist } from "../features/editForm/editFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPlaylist, updatePlaylist } from "../api";
import { useParams } from "react-router-dom";
import { RiMusic2Line } from "react-icons/ri";
import { Input, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
export default function EditPlaylist() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState({});
  const [isHoverAvatar, setIsHoverAvatar] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [playlist, setPlaylist] = useState({});
  const dispatch = useDispatch();
  const params = useParams();
  const getMusicListFunc = async () => {
    try {
      const res = await getPlaylist(params.id);
      setPlaylist(res.data.metadata.playlist);
      setName(res.data.metadata.playlist.name);
      setDescription(res.data.metadata.playlist.description);
      setImageURL(res.data.metadata.playlist.imageURL);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMusicListFunc();
  }, []);
  async function onSubmit(values) {
    try {
      const res = await updatePlaylist({
        name,
        description,
        playlist: params.id,
        file: values.file[0],
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="absolute backdrop-brightness-[0.6] w-full h-full z-[1000] flex flex-col justify-center text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mx-auto w-[500px] h-[400px] bg-[rgb(40,40,40)] px-5 py-5 rounded-2xl"
      >
        <div className="font-semibold text-[20px]">Edit Details</div>
        <FaXmark
          className="absolute right-[26px] top-[26px] text-[20px]"
          onClick={function (e) {
            dispatch(closeEditFormPlaylist());
          }}
        />
        <div className="flex my-[16px] h-[180px]">
          <div
            className="relative"
            onMouseEnter={() => setIsHoverAvatar(true)}
            onMouseLeave={() => setIsHoverAvatar(false)}
          >
            {isHoverAvatar ? (
              <div className="absolute backdrop-brightness-[0.6] shadow-xl w-[180px] h-[180px]">
                <div className="flex flex-col justify-center my-auto border-[1px] h-full">
                  <input
                    type="file"
                    id="file"
                    class="sr-only"
                    accept="image/png, image/gif, image/jpeg"
                    name={register("file").name}
                    onBlur={register("file").onBlur}
                    ref={register("file").ref}
                    onChange={async function (e) {
                      const file = e.target.files[0];
                      var reader = new FileReader();
                      reader.onload = function (e) {
                        setImageURL(e.target.result);
                      };
                      reader.readAsDataURL(file);
                      await register("file").onChange(e);
                    }}
                  />
                  <label for="file">
                    <FontAwesomeIcon
                      icon={faPen}
                      className="text-[38px] w-[100%] text-white"
                      style={{ margin: "auto auto" }}
                    />
                    <p className="text-white mt-[15px] text-center">
                      Choose a photo
                    </p>
                  </label>
                </div>
              </div>
            ) : (
              ""
            )}
            <div>
              {imageURL ? (
                <div className="w-[180px] h-[180px] mr-[20px]">
                  <img
                    className="img shadow-2xl rounded-[4px]"
                    src={`${imageURL}`}
                    alt="Selected Musiclist"
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center w-[180px] h-[180px] bg-[rgb(50,50,50)] rounded-[4px] mr-[20px]">
                  <RiMusic2Line className="text-[50px] mx-auto" />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full h-full">
            <Input
              type="text"
              className="w-full mb-[16px]"
              placeholder="Name"
              style={{
                backgroundColor: "rgb(50,50,50)",
                border: "none",
              }}
              value={name}
              name={register("name").name}
              onBlur={register("name").onBlur}
              ref={register("name").ref}
              onChange={async function (e) {
                setName(e.target.value);
                await register("name").onChange(e);
              }}
            />
            <textarea
              className="w-full h-[70%] bg-[rgb(50,50,50)] rounded-md px-4 py-2"
              placeholder="Description"
              value={description}
              name={register("description").name}
              onBlur={register("description").onBlur}
              ref={register("description").ref}
              onChange={async function (e) {
                setDescription(e.target.value);
                await register("description").onChange(e);
              }}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <Button
            type="submit"
            className="w-[120px] py-[20px] text-white font-semibold hover:font-bold hover:bg-[rgb(35,35,35)] hover:scale-[1.05] focus:outline-none"
            //   onClick={navigateLogInClick}
            style={{
              borderRadius: "30px",
            }}
            isLoading={isSubmitting}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
