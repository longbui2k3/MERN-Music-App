import { useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { closeAddListsToSection } from "../../features/editForm/editFormSlice";
import SearchBarList from "./SearchBarList";

export default function AddListsToSection() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  async function onSubmit(values) {}
  return (
    <div className="absolute backdrop-brightness-[0.6] w-full h-full z-[1000] flex flex-col justify-center text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mx-auto w-[640px] h-[500px] bg-[rgb(40,40,40)] px-5 py-5 rounded-2xl"
      >
        <div className="font-semibold text-[20px]">Add Lists To Section</div>
        <FaXmark
          className="absolute right-[26px] top-[26px] text-[20px]"
          onClick={function (e) {
            dispatch(closeAddListsToSection());
          }}
        />
        <SearchBarList />
      </form>
    </div>
  );
}
