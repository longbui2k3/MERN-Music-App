import { Button } from "@chakra-ui/react";

export default function PageNotFound() {
  function clickToHome(e) {
    window.location.href = window.location.protocol + "/home";
  }
  return (
    <div class="w-full flex justify-center mt-[160px]">
      <div class="flex flex-col justify-center px-auto text-white text-center">
        <div class="icon" className="mx-auto mb-7">
          <img
            alt="Logo"
            src="https://open.spotifycdn.com/cdn/images/error-page-logo.24aca703.svg"
          />
        </div>
        <h1 className="text-[45px] font-semibold my-[10px]">Page not found</h1>
        <p className="text-[#b3b3b3]">
          We can't seem to find the page you are looking for.
        </p>
        <Button
          borderRadius={"30px"}
          width="120px"
          height="48px"
          fontSize="18px"
          textColor={"white"}
          fontWeight="700"
          marginTop="30px"
          _hover={{ transform: "scale(1.05)" }}
          color="#141414"
          className="mx-auto"
          onClick={clickToHome}
        >
          Home
        </Button>
        <Button
          backgroundColor="#141414"
          width="280px"
          fontSize="17px"
          textColor={"white"}
          fontWeight="700"
          marginTop="30px"
          _hover={{ textDecoration: "underline", transform: "scale(1.05)" }}
          className="mx-auto"
        >
          Help
        </Button>
      </div>
    </div>
  );
}
