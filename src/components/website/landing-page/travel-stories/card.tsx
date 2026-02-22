import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Story } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface CardProps {
  story: Story;
}

export default function Card({ story }: CardProps) {
  // Simple truncate for content if needed, or rely on CSS line-clamp
  return (
    <div className="bg-[#F8EFD8] rounded-xl overflow-hidden grid w-full max-w-sm sm:max-w-none mx-auto h-full grid-rows-[auto_1fr]">
      {/* Story Image */}
      <span className="grid relative h-64 overflow-hidden">
        <ImageWithFallback
          src={story.cover_image}
          fill
          className="object-cover object-center hover:scale-105 transition-transform duration-300"
          alt={story.title}
        />
      </span>

      <div className="grid gap-5 p-5 content-between">
        {/* Story Title and Description */}
        <div className="grid gap-3">
          <h3 className="font-semibold text-xl line-clamp-2">
            {story.title}
          </h3>
          <p className="line-clamp-3 text-muted-foreground">
            {/* We might want to strip HTML tags if content is rich text */}
            {story.content.replace(/<[^>]*>?/gm, '')}
          </p>
        </div>

        <Link href={`/stories-and-tips/${story.slug}`}>
          <Button className="w-max">
            Read more
            <Icon icon={"ep:right"} width="24" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
