"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface CardProps {
  ques: string;
  ans: string;
}

export default function Card({ ans, ques }: CardProps) {
  const [isShowAns, setIsShowAns] = useState(false);

  return (
    <div className="relative bg-secondary p-5 rounded-lg max-w-3xl mx-auto">
      <div className="grid grid-flow-col gap-10 items-center justify-between">
        <p className="font-semibold sm:text-xl">{ques}</p>

        <button
          onClick={() => setIsShowAns(!isShowAns)}
          className="relative overflow-hidden rounded-lg grid text-xl text-white cursor-pointer"
        >
          {isShowAns ? (
            <Icon icon={"uil:minus-circle"} width="24" color="#2D2D2D" />
          ) : (
            <Icon icon={"gg:add"} width="24" color="#2D2D2D" />
          )}
        </button>
      </div>

      <p
        className={`overflow-hidden transition-all ${
          isShowAns ? "max-h-[1000px] mt-5" : "max-h-0"
        }`}
      >
        {ans}
      </p>
    </div>
  );
}
