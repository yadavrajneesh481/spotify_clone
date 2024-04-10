import React from "react";

const textwith_hover = ({ displayText, active }) => {
  return (
    <div className="flex items-center justify-start cursor-pointer">
      <div
        className={`${
          active ? "text-white" : "text-gray-400"
        }  font-semibold text-lg hover:text-white`}
      >
        {displayText}
      </div>
    </div>
  );
};

export default textwith_hover;
