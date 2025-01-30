import React from "react";

type Props = {
  text: string;
  backgroundColor: string;
};

const Chip: React.FC<Props> = ({ text, backgroundColor }) => {
  console.log(backgroundColor);

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className="flex justify-center rounded-xl py-1 px-2.5 border text-sm text-white transition-all shadow-md w-[100px]"
    >
      {text}
    </div>
  );
};

export default Chip;
