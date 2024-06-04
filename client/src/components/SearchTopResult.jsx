import { Image } from "@chakra-ui/react";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SearchTopResult = ({ song }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="">
      <h2 className="text-[white] text-[24px] my-[16px] font-bold">
        Top result
      </h2>
      <div
        className={
          "h-[228px] rounded-md  inline-block cursor-pointer mb-[24px] w-[414px]" //w-[190px]
        }
        style={{ backgroundColor: "#181818" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            height: "100%",
            padding: "16px",
            position: "relative",
          }}
          className={"hover:bg-neutral-800 rounded-md"}
        >
          <div
            style={{
              position: "relative",
              height: "100px",
              width: "100%",
              // width: "100%",
              transform: "translateY(0)",
              transition: "transform 0.3s ease",
            }}
          >
            <Image
              boxSize="100px"
              objectFit="cover"
              src={song?.imageURL}
              alt={song?.name}
              className={"rounded-md"}
              style={{
                position: "absolute",
                boxShadow:
                  "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
              }}
            />
            <FontAwesomeIcon
              icon={faCirclePlay}
              style={{
                color: "#3ae723",
                zIndex: "2",
                position: "absolute",
                bottom: "-76px",
                right: "8px",
                transform: `translateY(${isHovered ? "0" : "100%"})`,
                transition: "transform 0.3s ease, opacity 0.3s ease",
                opacity: isHovered ? 1 : 0,
              }}
              className={"text-[48px] hover:text-[50px] "}
            />
          </div>

          <div style={{ height: "70px", maxWidth: "158px" }}>
            <div
              style={{
                position: "relative",
                height: "100%",
              }}
            >
              <span
                className={"text-[32px] font-bold text-white "}
                style={{
                  maxWidth: "158px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  position: "absolute",
                  marginTop: "12px",
                }}
              >
                {song?.name}
              </span>
              <br />
              <span
                className={"text-[14px] font-medium  mt-[36px]"}
                style={{
                  maxWidth: "158px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  position: "absolute",
                }}
              >
                Song -{" "}
                <span className="text-white hover:underline">
                  {/* {artists.join(", ")} */}
                  {song?.singers?.map((item) => item.name + " ")}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTopResult;
