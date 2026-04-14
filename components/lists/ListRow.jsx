import React, { useState } from "react";
import Image from "next/image";
import ListForm from "@/components/lists/ListForm";
import { useRouter } from "next/router";

const ListRow = ({ data, numColumns, toAdd, onRowClick , capitalize }) => {
  const router = useRouter();

  let values;
  let Color;
  let showIcon;
  let showButton;

  if (Array.isArray(data)) {
    values = data;
    Color = "darker-green";
    showIcon = false;
  } else if (toAdd == "response") {
    showIcon = false;
    values = Object.values(data).slice(1);
    showButton = true;
  } else if (toAdd == "nothing") {
    values = Object.values(data).slice(1); // removes the id
    showIcon = false;
    Color = "black";
  }
  else {
    values = Object.values(data).slice(1); // removes the id
    Color = "black";
    showIcon = true;
  }

  if (data.position) values.splice(2, 1);

//  console.log("this are the values", values);

  const [showForm, setShowForm] = useState(false); //to show form on icon click

  const handleClick = () => {
    setShowForm(!showForm);
  };
  // to show the description for reclamations
  const [showOverflow, setShowOverflow] = useState(false);
  return (
    <div
      className={`cursor-pointer border-b-2 p-4 mt-4 border-solid border-${Color} hover:bg-green-500 hover:ml-3 hover:border-l-2 hover:border-l-green-600 hover:bg-opacity-5`}
      onClick={() => {
        toAdd === "response"
          ? onRowClick()
          : router.push(router.pathname + "/" + data.id);
      }}
    >
      <div
        className={`grid grid-cols-${numColumns} gap-4 text-sm ${capitalize ? 'capitalize' : ''} text-${Color}`}
        style={{ gridTemplateColumns: `repeat(${numColumns}, 1fr)` }}
      >
        {values.map((value, index) => (
          <div key={index}>
            <div className="flex items-center justify-center  ">
              {value} 

              <div
                className="flex items-center justify-end gap-4 flex-1 cursor-pointer"
                style={{ zIndex: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className={`${showForm ? "" : "hidden"}`}>
        <ListForm agent={toAdd} />
      </div>
    </div>
  );
};

export default ListRow;
