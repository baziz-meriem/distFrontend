import React from "react";
import PropTypes from "prop-types";

const CustomInput = ({ label, type, steFunction, attr, data ,size}) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    steFunction({ ...data, [attr]: inputValue });
  };
  let padding
  if(size=="small"){
   padding = "3"
  } else padding="5"
  

  return (
    <div
      className={`w-full inline-flex justify-between rounded-lg border border-gray-300 shadow-all p-3 bg-transparent text-base  capitalize font-medium text-gray-700  focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:ring-offset-2  `}
    >
      <input 
        placeholder={label}
        className="bg-transparent w-full outline-none"
        type={type}
        onChange={(e) => {
          handleChange(e); 
        }}
      />
    </div>
  );
};
CustomInput.propTypes = {
  label:PropTypes.string.isRequired,
  type:PropTypes.string.isRequired,
  steFunction:PropTypes.func.isRequired,
  attr: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.string),
  size: PropTypes.string,
};

export default CustomInput;
