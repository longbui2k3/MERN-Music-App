import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";

export default function SignUpStep3() {
  return (
    <>
      <div className="w-[450px] h-[600px] mx-auto">
        <div class="h-1 relative max-w-xl rounded-full overflow-hidden">
          <div class="w-full h-full bg-gray-200 absolute"></div>
          <div class="h-full bg-[#1ED760] absolute w-full"></div>
        </div>
      </div>
      <div className="mt-6 mb-6 flex">
        <ChevronLeftIcon boxSize={10} color="#a7a7a7" className="mt-2" />
        <div className="ms-3">
          <Text className="text-[#a7a7a7] font-bold">Step 3 of 3</Text>
          <Text className="text-white font-bold mt-1">Terms & Conditions</Text>
        </div>
      </div>
    </>
  );
}
