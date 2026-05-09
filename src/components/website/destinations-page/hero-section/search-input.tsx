"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

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
    <div className="max-w-md grid grid-cols-[auto_1fr_auto] gap-2.5 items-center bg-[#F5E8C7] p-1 pl-2.5 rounded-full mx-auto w-full border border-black/5 shadow-sm">
      <Icon icon={"akar-icons:location"} width="20" className="text-[#2d2d2d]" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Where do you want to go?"
        className="outline-none w-full placeholder:text-[#2d2d2d]/50 text-[#2d2d2d] bg-transparent font-lato"
      />
      <Button onClick={handleSearch} className="rounded-full">
        Search
        <Icon icon={"ep:right"} width="16" />
      </Button>
    </div>
  );
}
