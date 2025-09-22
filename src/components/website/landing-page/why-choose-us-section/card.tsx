import React, { ReactNode } from "react";

interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function Card({ icon, title, description }: CardProps) {
  return (
    <div className="bg-[#F8EFD8] rounded-xl overflow-hidden grid grid-rows-[1fr_auto] w-full p-5 gap-10">
      <span className="grid place-content-center w-12 h-12 rounded-full bg-[#F4A261]">
        {icon}
      </span>

      {/* Destination Name and Description  */}
      <div className="grid gap-3 content-start">
        <h3 className="font-semibold text-xl">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
