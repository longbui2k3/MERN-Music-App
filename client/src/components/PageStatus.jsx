import { Logo } from "./Logo";
import { FaRegUser } from "react-icons/fa6";
import { Button } from "@chakra-ui/react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Logout, getUser } from "../api";
import { useCookies } from "react-cookie";
export default function PageStatus() {
  const [cookies, setCookie] = useCookies([""]);
  const [navigateAccountOverview, setNavigateAccountOverview] = useState(false);
  const [navigateWebPlayer, setNavigateWebPlayer] = useState(false);
  const [navigateLogin, setNavigateLogin] = useState(false);
  const [user, setUser] = useState(" ");
  useEffect(() => {
    const getUserFunc = async () => {
      try {
        const res = await getUser();
        setUser(res.data.data);
      } catch (err) {
        setUser("");
      }
    };
    getUserFunc();
  }, []);
  async function logout() {
    try {
      const res = await Logout();
      setCookie("jwt", "", {});
      setNavigateLogin(true);
    } catch (err) {}
  }
  if (navigateAccountOverview) {
    return <Navigate to="#" />;
  }
  if (navigateWebPlayer) {
    return <Navigate to="/" />;
  }
  if (navigateLogin || !user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Logo />
      <div className="w-[450px] h-[600px] mx-auto">
        <h1 className="font-bold text-[30px] text-white text-center">
          Logged in as
        </h1>
        <FaRegUser className="text-white mx-auto my-7" size="50px" />
        <h5 className=" text-white text-center">{user.name}</h5>
        <div class="w-full flex justify-center">
          <Button
            backgroundColor="#1ED760"
            borderRadius="500px"
            width="280px"
            padding="24px 10px"
            fontSize="20px"
            fontWeight="700"
            marginTop="24px"
            _hover={{
              backgroundColor: "#1ED760",
              transform: "scale(1.05)",
            }}
            onClick={function (e) {
              setNavigateAccountOverview(true);
            }}
          >
            Account Overview
          </Button>
        </div>
        <div class="w-full flex justify-center">
          <Button
            backgroundColor="#141414"
            borderRadius="500px"
            width="280px"
            padding="24px 10px"
            fontSize="18px"
            textColor={"white"}
            fontWeight="700"
            marginTop="24px"
            _hover={{ textDecoration: "underline", transform: "scale(1.05)" }}
            onClick={function (e) {
              setNavigateWebPlayer(true);
            }}
          >
            <FaRegCircleCheck className="me-2 text-[25px]" />
            Web Player
          </Button>
        </div>
        <div class="w-full flex justify-center">
          <Button
            backgroundColor="#141414"
            borderRadius="500px"
            width="280px"
            padding="24px 10px"
            fontSize="17px"
            fontWeight="700"
            marginTop="24px"
            _hover={{ textDecoration: "underline", transform: "scale(1.05)" }}
            onClick={logout}
          >
            Log out
          </Button>
        </div>
      </div>
    </>
  );
}
