import amService from "@/services/amService";
import Image from "next/image";

const AmCard = ({ title,am }) => {
  return (
    <div className="flex-auto  p-6 mt-6 shadow-all rounded-lg bg-transparent">
    <div className="flex justify-between mb-4">
      <div className="flex items-center">
        <Image
          src="/icons/user-black.svg"
          width={30}
          height="30"
          alt="user icon"
        ></Image>
        <div className="text-xl font-medium ">{title}</div>
      </div>
    </div>
    <div className="flex justify-between mb-4 ">
      <div className="flex items-center gap-4">
        <Image
          src="/images/user.jpg"
          width={35}
          height="35"
          alt="user "
          className="rounded-full"
        ></Image>
         
        {am?.prenom+" "+am?.nom}
        
      </div>
    </div>


  </div>
  );
};
export default AmCard;
