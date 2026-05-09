"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/destinations?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/destinations");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="max-w-md grid grid-cols-[auto_1fr_auto] gap-2.5 items-center bg-secondary p-1 pl-2.5 rounded-full mx-auto w-full">
      <Icon icon={"akar-icons:location"} width="20" color="#2d2d2d" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Where do you want to go?"
        className="outline-none w-full placeholder:text-black text-black bg-transparent"
      />
      <Button onClick={handleSearch}>
        Search
        <Icon icon={"ep:right"} width="16" />
      </Button>
    </div>
  );
}
