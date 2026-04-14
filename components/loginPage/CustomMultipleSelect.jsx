import { useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

function CustomMultipleSelect({
  label,
  options,
  steFunction,
  attr,
  data,
  size,
}) {
  const [selectedOption, setSelectedOption] = useState({ id: null, nom: null });
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    // setIsOpen(false);
    const selectedIds = [...data[attr], option.id.toString()];
    steFunction({ ...data, [attr]: selectedIds });
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  let padding;
  if (size == "small") {
    padding = "3";
  } else padding = "5";

  return (
    <div className="">
      <div className="text-left relative">
        {!isOpen && (
          <button
            type="button"
            className={`w-full inline-flex justify-between rounded-xl border border-gray-300 shadow-all p-4 bg-transparent text-base  capitalize font-medium text-gray-400  focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:ring-offset-2  `}
            aria-haspopup="true"
            aria-expanded="true"
            onClick={handleSelectClick}
          >
            {label}
            <Image
              src="/icons/arrow.svg"
              width={25}
              height="19"
              alt="arrow"
              className="mt-1 mr-2"
            ></Image>
          </button>
        )}
        {isOpen && (
          <div
            className={`w-full inline-flex justify-between rounded-xl border border-gray-300 shadow-all p-4 bg-transparent text-base  capitalize font-medium text-gray-400  focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:ring-offset-2  `}
          >
            <div className=" grid grid-cols-4 gap-4 w-9/10">
              {options.map((option, index) => (
                <div
                  className={`w-full px-4 py-2 text-md rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer ${
                    data[attr]?.includes(option.id.toString())
                      ? "bg-green-100"
                      : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
            <Image
              onClick={handleSelectClick}
              src="/icons/arrow.svg"
              width={25}
              height="19"
              alt="arrow"
              className="mt-1 mr-2 w-1/10"
            ></Image>
          </div>
        )}
      </div>
    </div>
  );
}

CustomMultipleSelect.propTypes = {
  label: PropTypes.string.isRequired,
  steFunction: PropTypes.func.isRequired,
  attr: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.string),
  size: PropTypes.string,
};
export default CustomMultipleSelect;
