import React from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

export const ArticleDetailHero: React.FC<Props> = ({ src, alt }) => {
  return (
    <div className="w-full overflow-hidden flex justify-center rounded-2xl border border-border">
      <div className="w-full relative">
        <Image
          src={src}
          alt={alt}
          priority
          className="w-full"
          width={800}
          height={607}
        />
      </div>
    </div>
  );
};
