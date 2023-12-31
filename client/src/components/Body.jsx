import React, { useEffect, useState } from "react";
import SectionAPI from "../api/SectionAPI";
import Section from "./Section";

const Body = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    try {
      const getAllSection = async () => {
        const sectionData = await SectionAPI.getAllSection();
        setSections(sectionData.data.sections);
      };

      getAllSection();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div
        style={{
          lineHeight: "64px",
          padding: "0 20px",
          maxHeight: "80%",
          overflow: "none",
        }}
      >
        {sections.map((section) => (
          <Section key={section._id} section={section} />
        ))}
      </div>
    </>
  );
};

export default Body;
