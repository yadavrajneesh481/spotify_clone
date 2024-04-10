import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

const Icon_Text = ({ iconName, displayText, active, targetLink }) => {
  return (
    <Link className="block" to={targetLink}>
      <div className="flex items-center justify-start cursor-pointer">
        <div className="px-5 py-3">
          <Icon
            icon={iconName}
            color={active ? "white" : "gray"}
            fontSize={27}
          />
        </div>
        <div
          className={`${
            active ? "text-white" : "text-gray-400"
          } text-sm font-semibold hover:text-white`}
        >
          {displayText}
        </div>
      </div>
    </Link>
  );
};

export default Icon_Text;
