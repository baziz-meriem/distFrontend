import Image from "next/image";
import { React} from "react";


const productCard = ({ image, Label ,quantity}) => {


  return (
    <div
      style={{ height: "200px" }}
      className="p-8 my-4 mx-6 bg-white drop-shadow-md shadow-all rounded-lg relative "
    >
      <div className="relative">
        <Image
          src={image}
          width={100}
          height="100"
          alt="coffee"
          className="mx-auto my-4 w-25 h-20 object-cover"
        ></Image>
        <Image
          src="/icons/download.svg"
          width={18}
          height="18"
          alt="download"
          className="absolute top-0 left-2"
        ></Image>
      </div> 

      <div className="flex justify-center gap-16">
        <h1 className="text-md">{Label}</h1>
        <Image src="/icons/edit.svg" width={16} height="16" alt="edit"></Image>
      </div>
      <div className="absolute bottom-2 left-2 right-2 p-2">
        <p className="text-xs text-right">{quantity}%</p>
        <div className="bg-gray-300 h-1.5 rounded-full">
          <div
            className={
                quantity > 50
                  ? "bg-darker-green h-full rounded-full"
                  : quantity > 30
                  ? "bg-orange h-full rounded-full"
                  : "bg-red-500 h-full rounded-full"
              }
            style={{ width: `${quantity}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default productCard;
