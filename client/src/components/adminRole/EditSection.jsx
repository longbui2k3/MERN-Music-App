import { useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { closeEditFormSection } from "../../features/editForm/editFormSlice";
import { useEffect, useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import SectionAPI from "../../api/SectionAPI";
import { setUpdatedSection } from "../../features/update/updateSlice";

export default function EditSection() {
  const [title, setTitle] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const section = useSelector((state) => state.editForm.section);
  useEffect(() => {
    setTitle(section.title);
  }, []);
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
  async function onSubmit(values) {
    try {
      const res = await SectionAPI.updateSection(section._id, { title });
      await getSectionsFunc();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="absolute backdrop-brightness-[0.6] w-full h-full z-[1000] flex flex-col justify-center text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mx-auto w-[500px] h-[230px] bg-[rgb(40,40,40)] px-5 py-5 rounded-2xl"
      >
        <div className="font-semibold text-[20px]">Edit Section</div>
        <FaXmark
          className="absolute right-[26px] top-[26px] text-[20px]"
          onClick={function (e) {
            dispatch(closeEditFormSection());
          }}
        />
        <div className="mt-3 font-semibold text-[18px]">Title</div>
        <Input
          type="text"
          className="w-full mt-2"
          placeholder="Name"
          style={{
            backgroundColor: "rgb(50,50,50)",
            border: "none",
          }}
          value={title}
          name={register("title").name}
          onBlur={register("title").onBlur}
          ref={register("title").ref}
          onChange={async function (e) {
            setTitle(e.target.value);
            await register("title").onChange(e);
          }}
        />
        <div className="flex flex-row-reverse">
          <Button
            type="submit"
            className="mt-5 w-[120px] py-[20px] text-white font-semibold hover:font-bold hover:bg-[rgb(35,35,35)] hover:scale-[1.05] focus:outline-none"
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
