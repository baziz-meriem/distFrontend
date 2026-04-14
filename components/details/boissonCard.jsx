import Image from "next/image";
import {React,useState} from "react";

const boissonCard = ({data}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToService = () => {
    setIsAdded(!isAdded);
  };

  return (
    <div className="p-6 mt-6 bg-white drop-shadow-md shadow-all rounded-lg relative">
    <Image
      src="/icons/available.svg"
      width={95}
      height="95"
      alt="available"
      className="absolute top-3 right-3"
    ></Image>
    <div className="relative">
        <Image
          src={data.image ?data.image:"/icons/coffee.svg"}
          width={150}
          height="150"
          alt="coffee"
          className="mx-auto mt-4"
        ></Image>
          <Image
          src="/icons/download.svg"
          width={20}
          height="20"
          alt="download"
          className="absolute top-0 left-8"
        ></Image>
    </div>

    <div className="flex justify-center gap-6">
      <h1 className="text-lg">{data.label}</h1>
      <Image
        src="/icons/edit.svg"
        width={18}
        height="18"
        alt="edit"
      ></Image>
    </div>

    <div className="flex justify-center gap-6 mb-8">
      <h1 className="text-lg ">{data.prix} DA</h1>
      <Image
        src="/icons/edit.svg"
        width={18}
        height="18"
        alt="edit"
      ></Image>
    </div>

    <div className="flex justify-center items-center gap-6 absolute bottom-3 right-3">
      <h1 className={`text-md ${isAdded ? 'text-light-green' : 'text-red-500'}`}>{isAdded ? 'Add to service' : 'Remove from service'}</h1>
      <Image
        src={isAdded ? "/icons/AddIcon-green.svg" : "/icons/remove.svg"}
        width={35}
        height="35"
        alt="add"
        onClick={handleAddToService}
      ></Image>
    </div>
  </div>
  );
};
export default boissonCard;
