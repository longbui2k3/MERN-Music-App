import React, { useEffect, useState } from "react";
import SectionAPI from "../api/SectionAPI";
import Section from "./Section";
import Footer from "./Footer";

const Body = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const getAllSection = async () => {
      try {
        const sectionData = await SectionAPI.getAllSection();
        setSections(
          sectionData.data.metadata.sections
        );
      } catch (error) {
        console.log(error);
      }
    };
    getAllSection();
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
