import Link from "next/link";
import React from "react";

const InfoBox = ({
  title,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo = { href: null, text: null, backgroundColor: null },
  children,
}) => {
  return (
    <div className={`${backgroundColor}  p-6 rounded-lg shadow-md`}>
      <h2 className={`text-2xl ${textColor} font-bold`}>{title}</h2>
      <p className={`mt-2 mb-4 ${textColor}`}>{children}</p>
      <Link
        href={buttonInfo.href}
        className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
