import { useEffect, useState } from "react";
import { searchLists } from "../../api";
import { Button } from "@chakra-ui/react";
import { RiMusic2Line } from "react-icons/ri";
import SectionAPI from "../../api/SectionAPI";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatedSection } from "../../features/update/updateSlice";

export default function SearchBarList() {
  const [inputSearch, setInputSearch] = useState("");
  const [lists, setLists] = useState([]);
  const section = useSelector((state) => state.editForm.section);
  const dispatch = useDispatch();
  const handleInputSearch = (e) => {
    setInputSearch(e.target.value);
  };
  useEffect(() => {
    const getSearchListsFunc = async () => {
      try {
        const res = await searchLists(inputSearch);
        setLists(res.data.metadata.lists);
      } catch (err) {
        console.log(err);
      }
    };
    getSearchListsFunc();
  }, [inputSearch]);
  const getSectionsFunc = async () => {
    const sectionData = await SectionAPI.getAllSection();
    dispatch(
      setUpdatedSection(
        sectionData.data.metadata.sections.map((section) => {
          return {
            ...section,
            edit: true,
            create: true,
            type: "section",
          };
        })
      )
    );
  };
  return (
    <>
      <div className="flex items-left rounded-lg relative mt-3 mb-4 me-2 ps-1 h-[40px] bg-[rgb(35,35,35)] w-[450px]">
        <div className="search-icon flex flex-col justify-center hover:bg-[rgb(35,35,35)] hover:text-white text-[#b3b3b3] px-1 py-1 relative z-10 rounded-full w-[30px] h-[40px] cursor-pointer">
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
        <input
          class={
            "rounded-r-lg text-[14px] font-semibold text-white bg-[rgb(35,35,35)] p-[5px] w-full"
          }
          type="search"
          autocomplete="off"
          spellcheck="false"
          aria-live="polite"
          placeholder="Search in Playlist, Album or Artist"
          // style={{
          //   transition: "width 0.1s ease-in-out",
          // }}
          onChange={handleInputSearch}
        />
      </div>
      <div className="overflow-y-auto h-[80%]">
        {lists.map((list) => {
          if (list.type)
            return (
              <div className="flex text-white my-2">
                <div className="relative">
                  {list.imageURL ? (
                    <img
                      src={list.imageURL}
                      alt=""
                      className="w-[50px] h-[50px]"
                    />
                  ) : (
                    <div className="flex flex-col justify-center w-[50px] h-[50px] bg-[rgb(40,40,40)] rounded-[4px] border-[1px]">
                      <RiMusic2Line className="text-[20px] mx-auto" />
                    </div>
                  )}
                </div>
                <div className="ms-3 basis-1/2 flex flex-col justify-center font-semibold">
                  {list.name}
                </div>
                <div className="ms-3 basis-1/4 flex flex-col justify-center text-[rgb(200,200,200)]">
                  {list.type}
                </div>
                <div className="flex flex-col justify-center">
                  <Button
                    colorScheme="white"
                    variant="outline"
                    onClick={async function () {
                      try {
                        const res = await SectionAPI.addMusiclistToLists({
                          musiclist: list._id,
                          section: section._id,
                        });
                        await getSectionsFunc();
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            );
          return (
            <div className="flex text-white my-2">
              <div className="relative rounded-full overflow-hidden">
                {list.imageURL ? (
                  <img
                    src={list.imageURL}
                    alt=""
                    className="w-[50px] h-[50px]"
                  />
                ) : (
                  <div className="flex flex-col justify-center w-[50px] h-[50px] bg-[rgb(40,40,40)] rounded-[4px] border-[1px]">
                    <RiMusic2Line className="text-[20px] mx-auto" />
                  </div>
                )}
              </div>
              <div className="ms-3 basis-1/2 flex flex-col justify-center font-semibold">
                {list.name}
              </div>
              <div className="ms-3 basis-1/4 flex flex-col justify-center text-[rgb(200,200,200)]">
                Artist
              </div>
              <div className="flex flex-col justify-center">
                <Button
                  colorScheme="white"
                  variant="outline"
                  onClick={async function () {
                    try {
                      const res = await SectionAPI.addSingerToLists({
                        singer: list._id,
                        section: section._id,
                      });
                      await getSectionsFunc();
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
