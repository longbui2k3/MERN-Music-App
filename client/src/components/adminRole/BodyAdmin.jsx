import { useEffect, useState } from "react";
import Section from "../Section";
import SectionAPI from "../../api/SectionAPI";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatedSection } from "../../features/update/updateSlice";

export default function BodyAdmin() {
  // const [sections, setSections] = useState([]);
  const sections = useSelector((state) => state.update.sections);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllSection = async () => {
      try {
        const sectionData = await SectionAPI.getAllSection();
        dispatch(
          setUpdatedSection(
            sectionData.data.metadata.sections.map((section) => {
              return { ...section, edit: true, create: true, type: "section" };
            })
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    getAllSection();
  }, []);
  return (
    <div
      style={{
        lineHeight: "64px",
        padding: "0 20px",
        maxHeight: "80%",
        overflow: "none",
      }}
    >
      {sections.map((section) => (
        <Section section={section} />
      ))}
    </div>
  );
}
