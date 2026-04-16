import PageHeader from "@/components/shared/PageHeader";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value , password:"$2b$10$MTd0sKPmL4Yun2F3vRELie36kTcx/nzvsrk25Vx8SpqX6OViZ4xBS"});//this is theword password123 hashed has to change==> change API side
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const cookieValue = Cookies.get("user");
      if (cookieValue) {
        const userData = JSON.parse(cookieValue);
        
        const id = userData.id;
        const role = userData.role;
   
        setUserRole(role);
        setUserId(id);
        try {
          const response = await fetch(
            `https://distbackend-96a5.onrender.com/api/v1/profileManagement/${role}/${id}`
          );
          const data = await response.json();
          const responseData = data.data;
          setProfileData(responseData);
        
         
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, []);
  const handleSubmit = () => {
    console.log("----------profilesubmit---------------",profileData)
    axios
    .put(
      `https://distbackend-96a5.onrender.com/api/v1/profileManagement/${userRole}/${userId}`,profileData
    )
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        
        toast.success("profile updated Succesfully!");
      } else {
        toast.error("Some errors occured while updating!");
      }
    });
  
  };
  return (
    <div className="h-full w-full overflow-hidden">
      <ToastContainer />
      <PageHeader title="Profile page" description="Some description here" />
      <div className="relative flex flex-row">
        <div className="w-1/2">
        <div className="space-y-10 mt-16 ">
            <div className="flex items-center justify-center rounded-full overflow-hidden relative w-48 h-48 mx-auto">
              <Image
                src="/images/user.jpg"
                width={200}
                height="100"
                alt="user image"
                className=""
              ></Image>
            </div>
            <div className="flex items-center justify-center">
              <button className="px-20 py-2 bg-effect shadow-all text-grey ">
                Upload image
              </button>
            </div>
          </div> 
        </div>
        <div className="w-1/2 mx-16">
          <div className="space-y-4 mt-16">
            <input
              type="text"
              className="p-3.5 inputs bg-effect shadow-all"
              placeholder="Enter your first name"
              value={profileData?.nom || ""}
              onChange={(e) => handleChange(e)}
              name="nom"
            />
            <input
              type="text"
              className="p-3.5 inputs bg-effect shadow-all"
              placeholder="Enter your last name"
              value={profileData?.prenom || ""}
              onChange={(e) => handleChange(e)}
              name="prenom"
            />
            <input
              type="text"
              className="p-3.5 inputs bg-effect shadow-all"
              placeholder="Enter your email"
              value={profileData?.email || ""}
              onChange={(e) => handleChange(e)}
              name="email"
            />
            <input
              type="text"
              className="p-3.5 inputs bg-effect shadow-all"
              placeholder="Enter your phone number"
              value={profileData?.numTel || ""}
              onChange={(e) => handleChange(e)}
              name="numTel"
            />
          </div>
          <div className="flex justify-end">
              <button className="btn-green px-11 py-2.5 mt-4 light-grey"
                      onClick={handleSubmit}>
                Modifier
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
