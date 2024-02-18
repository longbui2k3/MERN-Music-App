import React, { useEffect, useState } from "react";
import HeaderCoverProfile from "./HeaderCoverProfile";
import ProfileBody from "./ProfileBody";
import { getUser } from "../api";

const Profile = () => {
  const [user, setUser] = useState(" ");
  useEffect(() => {
    const getUserFunc = async () => {
      try {
        const res = await getUser();
        setUser(res.data.metadata.user);
      } catch (err) {
        setUser("");
      }
    };
    getUserFunc();
  }, []);
  return (
    <div className="h-full">
      <HeaderCoverProfile user={user} />
      <div className="h-full">
        <ProfileBody user={user} />
      </div>
    </div>
  );
};

export default Profile;
