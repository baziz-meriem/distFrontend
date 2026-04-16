import Image from "next/image";

const affectationCard = ({ title , data }) => {
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
          <div className="border-b p-1  border-solid border-grey">
            <input
              type="text"
              className="w-full pl-1 pr-4 bg-transparent placeholder-gray-300 focus:outline-none"
              placeholder="Search..."
              value={data? data.nom : ""}
            />
        </div>
        <div className="border-b p-1  border-solid border-grey">
          <input
            type="text"
            className="w-full pl-1 pr-4 bg-transparent placeholder-gray-300 focus:outline-none"
            placeholder="Search..."
            value={data? data.prenom : ""}
          />
        </div>
        <div className="border-b p-1  border-solid border-grey">
          <input
            type="text"
            className="w-full pl-1 pr-4 bg-transparent placeholder-gray-300 focus:outline-none"
            placeholder="Search..."
            value={data? data.email : ""}
          />
        </div>
      </div>
    </div>

  </div>
  );
};
export default affectationCard;
