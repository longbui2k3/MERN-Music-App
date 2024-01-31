import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LuPen } from "react-icons/lu";
import { HiMiniXMark } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { SingerAPI, createAlbum, searchGenres } from "../../api";
export default function CreateAlbum() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputFile, setInputFile] = useState("");
  const [inputSingers, setInputSingers] = useState([]);
  const [inputGenres, setInputGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [singers, setSingers] = useState([]);
  const handleInputName = async (e) => {
    setInputName(e.target.value);
    await register("name").onChange(e);
  };
  const handleInputDescription = async (e) => {
    setInputDescription(e.target.value);
    await register("description").onChange(e);
  };
  useEffect(() => {
    async function getSingerByUserFunc() {
      try {
        const res = await SingerAPI.getSingerByUser();
        setInputSingers([res.data.singer]);
      } catch (err) {
        console.log(err);
      }
    }
    getSingerByUserFunc();
  }, []);
  async function onSubmit() {
    console.log(inputName);
    console.log(inputGenres.map((genre) => genre._id));
    console.log(inputDescription);
    console.log(inputFile);
    try {
      const res = await createAlbum(
        inputName,
        inputGenres.map((genre) => genre._id),
        inputDescription,
        inputFile,
        inputSingers.map((singer) => singer._id)
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex w-full">
      <div className="basis-[60%] flex justify-center overflow-y-auto">
        <div className="flex flex-col w-[600px] mb-[30px]">
          <Text
            fontSize="25px"
            fontWeight="700"
            color="white"
            marginTop="20px"
            marginBottom="30px"
          >
            Create Album
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
            // isInvalid={

            // }
            >
              <div className="flex">
                <div
                  class="mb-8 w-[200px] relative"
                  onMouseOver={function (e) {
                    const chooses = document.querySelectorAll(".choose");
                    const labelFile = document.getElementById("labelFile");
                    chooses.forEach((choose, i) => {
                      if (i === 1 && !labelFile.style.backgroundImage)
                        choose.style.display = "none";
                      else choose.style.display = "flex";
                    });

                    if (labelFile.style.backgroundImage)
                      labelFile.style.filter = "blur(2px)";
                  }}
                  onMouseOut={function (e) {
                    const chooses = document.querySelectorAll(".choose");
                    chooses.forEach((choose, i) => {
                      choose.style.display = "none";
                    });
                    const labelFile = document.getElementById("labelFile");
                    labelFile.style.filter = "none";
                  }}
                >
                  <input
                    type="file"
                    id="file"
                    class="sr-only"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={async function (e) {
                      const labelFile = document.getElementById("labelFile");
                      const mainImage = document.getElementById("main-image");
                      const fileTag = document.getElementById("file");
                      const [file] = fileTag.files;
                      if (file) {
                        labelFile.style = `background-image:url("${URL.createObjectURL(
                          file
                        )}");background-size: cover`;
                        mainImage.style = `background-image:url("${URL.createObjectURL(
                          file
                        )}");background-size: cover`;
                      }
                      setInputFile(file);
                      await register("file").onChange(e);
                    }}
                    name={register("file").name}
                    onBlur={register("file").onBlur}
                    ref={register("file").ref}
                  />
                  <label
                    for="file"
                    class="flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                    id="labelFile"
                  ></label>
                  <label
                    for="file"
                    className="choose absolute left-0 right-0 top-0 bottom-0 my-auto ms-auto me-auto flex flex-col justify-center p-1 w-[200px] h-[100px] mx-auto text-white"
                  >
                    <LuPen
                      color="white"
                      size={"50px"}
                      style={{
                        background: "none",
                        margin: "0px auto 5px auto",
                      }}
                    />
                    <div className="mx-auto">Choose a photo</div>
                  </label>
                  <div
                    className="choose absolute top-2 right-2 text-white"
                    onClick={async function (e) {
                      const labelFile = document.getElementById("labelFile");
                      labelFile.style.backgroundImage = "";
                      setInputFile("");
                      await register("file").onChange(e);
                    }}
                  >
                    <HiMiniXMark size="30px" />
                  </div>
                </div>
                <div className={"text-white ms-[20px]"}>
                  <Text className="font-[500]">Image</Text>
                  <Text>This is some description</Text>
                </div>
              </div>
              <div className="relative">
                <FormLabel className={"text-white mt-[20px] font-[500]"}>
                  Name
                </FormLabel>
                <Input
                  type="text"
                  className={
                    "w-full mt-[5px] bg-[rgb(20, 20, 20)] text-white border-[#aaaaaa]"
                  }
                  h="50px"
                  onChange={handleInputName}
                  name={register("name").name}
                  onBlur={register("name").onBlur}
                  ref={register("name").ref}
                />
              </div>
              <div className="relative">
                <div className="flex justify-between">
                  <FormLabel className={"text-white mt-[15px] font-[500]"}>
                    Singers
                  </FormLabel>
                  <div className="flex justify-center items-center rounded-lg relative mt-4 h-[30px] bg-[rgb(35,35,35)]">
                    <Tooltip
                      label="Search singers"
                      placement="top-start"
                      bg="rgb(40,40,40)"
                    >
                      <div className="search-icon flex flex-col justify-center hover:bg-[rgb(35,35,35)] hover:text-white text-[#b3b3b3] px-1 py-1 relative z-10 rounded-full w-[30px] h-[30px] cursor-pointer">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ margin: "0px auto" }}
                        >
                          <path
                            d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z"
                            stroke="#b3b3b3"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </Tooltip>
                    {singers ? (
                      <div className="absolute top-10 left-0 w-[230px] bg-[rgb(35,35,35)] rounded-lg z-20 overflow-hidden">
                        {singers.map((singer) => (
                          <div
                            className="py-2 px-4 cursor-pointer hover:bg-[rgb(50,50,50)]"
                            onClick={function (e) {
                              if (
                                !inputSingers.some((s) => s._id === singer._id)
                              )
                                setInputSingers([...inputSingers, singer]);
                            }}
                          >
                            {singer.name}
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                    <input
                      class={
                        "search-input rounded-r-lg text-[14px] text-[#b3b3b3] bg-[rgb(35,35,35)] p-[5px] w-[200px]"
                      }
                      type="search"
                      autocomplete="off"
                      spellcheck="false"
                      aria-live="polite"
                      placeholder="Search Singers"
                      style={{
                        transition: "width 0.1s ease-in-out",
                      }}
                      onChange={async function (e) {
                        try {
                          if (e.target.value !== "") {
                            const res = await SingerAPI.searchSinger(
                              e.target.value
                            );
                            setSingers(res.data.singers);
                          } else setSingers("");
                        } catch (err) {
                          console.log(err);
                          setSingers("");
                        }
                      }}
                    />
                  </div>
                </div>
                {inputSingers ? (
                  <div className="flex gap-2 mt-3 mb-1">
                    {inputSingers.map((singer, i) => (
                      <div className="flex gap-2 justify-between px-2 py-1 bg-[rgb(35,35,35)] rounded-lg">
                        <div>{singer.name}</div>
                        <HiMiniXMark
                          className="my-auto"
                          onClick={function (e) {
                            setInputSingers(
                              inputSingers.filter(
                                (singer2) => singer2 !== singer
                              )
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="relative">
                <div className="flex justify-between">
                  <FormLabel className={"text-white mt-[15px] font-[500]"}>
                    Genres
                  </FormLabel>
                  <div className="flex justify-center items-center rounded-lg relative mt-4 h-[30px] bg-[rgb(35,35,35)]">
                    <Tooltip
                      label="Search genres"
                      placement="top-start"
                      bg="rgb(40,40,40)"
                    >
                      <div className="search-icon flex flex-col justify-center hover:bg-[rgb(35,35,35)] hover:text-white text-[#b3b3b3] px-1 py-1 relative z-10 rounded-full w-[30px] h-[30px] cursor-pointer">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ margin: "0px auto" }}
                        >
                          <path
                            d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z"
                            stroke="#b3b3b3"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </Tooltip>
                    {genres ? (
                      <div className="absolute top-10 left-0 w-[230px] bg-[rgb(35,35,35)] rounded-lg z-20 overflow-hidden">
                        {genres.map((genre) => (
                          <div
                            className="py-2 px-4 cursor-pointer hover:bg-[rgb(50,50,50)]"
                            onClick={function (e) {
                              if (!inputGenres.includes(genre))
                                setInputGenres([...inputGenres, genre]);
                            }}
                          >
                            {genre.name}
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                    <input
                      class={
                        "search-input rounded-r-lg text-[14px] text-[#b3b3b3] bg-[rgb(35,35,35)] p-[5px] w-[200px]"
                      }
                      type="search"
                      autocomplete="off"
                      spellcheck="false"
                      aria-live="polite"
                      placeholder="Search Genres"
                      style={{
                        transition: "width 0.1s ease-in-out",
                      }}
                      onChange={async function (e) {
                        try {
                          if (e.target.value !== "") {
                            const res = await searchGenres(e.target.value);
                            setGenres(res.data);
                          } else setGenres("");
                        } catch (err) {
                          console.log(err);
                          setGenres("");
                        }
                      }}
                    />
                  </div>
                </div>
                {inputGenres ? (
                  <div className="flex gap-2 mt-3 mb-1">
                    {inputGenres.map((genre, i) => (
                      <div className="flex gap-2 justify-between px-2 py-1 bg-[rgb(35,35,35)] rounded-lg">
                        <div>{genre.name}</div>
                        <HiMiniXMark
                          className="my-auto"
                          onClick={function (e) {
                            setInputGenres(
                              inputGenres.filter((genre2) => genre2 !== genre)
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="relative">
                <FormLabel className={"text-white mt-[20px] font-[500]"}>
                  Description
                </FormLabel>
                <Textarea
                  className={
                    "w-full mt-[5px] bg-[rgb(20, 20, 20)] text-white border-[#aaaaaa]"
                  }
                  onChange={handleInputDescription}
                  name={register("description").name}
                  onBlur={register("description").onBlur}
                  ref={register("description").ref}
                  style={{
                    height: "200px",
                  }}
                />
              </div>
              <Button
                type="submit"
                class={`font-bold bg-[rgb(30,215,96)] text-white w-full h-[50px] rounded-lg mt-8 mb-8`}
                isLoading={isSubmitting}
              >
                Create
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
      <div className="border-[rgb(35,35,35)] border-[1px] basis-[40%]">
        <div
          id="main-image"
          className="w-[300px] h-[300px] mx-auto mt-10 border-[rgb(35,35,35)] border-[1px]"
        ></div>
        <div className="main-name text-[30px] text-center font-semibold mx-auto mt-5">
          {inputName}
        </div>
        <div className="main-name text-[18px] text-center mx-auto mt-2">
          {inputSingers.map((singer) => singer.name).join(", ")}
        </div>
        <div className="flex flex-col">
          <FormLabel className={"text-white my-[20px] font-[500] mx-3"}>
            Songs
          </FormLabel>
          {/* <div className="grow overflow-y-scroll">
            {inputSongs
              ? inputSongs.map((song) => (
                  <div className="flex px-3 my-2">
                    <div className="h-[50px] w-[50px] my-auto">
                      <img src={song.imageURL} alt="track" className="" />
                    </div>
                    <div className="flex flex-col w-[80%] ms-2">
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis leading-7">
                        {song.name}
                      </span>
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis leading-7">
                        {song.singers.map((item) => item.name).join(",")}
                      </span>
                    </div>
                  </div>
                ))
              : ""}
          </div> */}
        </div>
      </div>
    </div>
  );
}
