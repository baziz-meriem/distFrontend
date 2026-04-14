import { useEffect, useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

function CustomSelect({ label, options, steFunction, attr, data, size }) {
  const [selectedOption, setSelectedOption] = useState({ id: null, nom: null });
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    steFunction({ ...data, [attr]: option.id.toString() });
  };


  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOuterDivMouseLeave = () => {
    setIsOpen(false);
  };
  let padding;
  if (size == "small") {
    padding = "3";
  } else padding = "5";

  return (
    <div className="" onMouseLeave={handleOuterDivMouseLeave}>
      <div className="text-left relative">
        <button
          type="button"
          className={`w-full inline-flex justify-between rounded-xl border border-gray-300 shadow-all p-3 bg-transparent text-base  capitalize font-medium text-gray-400  focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:ring-offset-2  `}
          aria-haspopup="true"
          aria-expanded="true"
          onClick={handleSelectClick}
        >
          {selectedOption.nom ? selectedOption.nom : selectedOption.label? selectedOption.label : label}
          <Image
            src="/icons/arrow.svg"
            width={25}
            height="19"
            alt="arrow"
            className="mt-1 mr-2"
          ></Image>
        </button>
        {isOpen && (
          <div className="z-50 absolute  left-0 right-0 mt-1 rounded-md shadow-all pb-7  bg-white ring-1 ring-black ring-opacity-5 max-h-48 overflow-y-auto ">
            {options.map((option, index) => (
              <div key={index}>
                {index > 0 && <div className=" border-t border-gray-300"></div>}
                <div
                  className={` w-full px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer ${
                    selectedOption.id === option.id ? "bg-green-100" : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.nom ? option.nom : option.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  steFunction: PropTypes.func.isRequired,
  attr: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.string),
  size: PropTypes.string,
};
export default CustomSelect;
