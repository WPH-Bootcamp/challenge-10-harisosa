import React, { PropsWithChildren } from "react";
import Image from "next/image";

interface EmptyStateProps extends PropsWithChildren {
  title: string;
  img: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  img,
  description,
  ctaLabel,
  onCtaClick,
  children
}) => {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16 sm:px-8 lg:px-16 2xl:px-24">
      <div className="flex flex-col items-center text-center">
        <Image
          src={img}
          alt="No results"
          width={160}
          height={160}
          priority
        />

        <h2 className="mt-6 text-base font-semibold">{title}</h2>

        {description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {ctaLabel && (
          <button
            type="button"
            onClick={onCtaClick}
            className="mt-7 rounded-full bg-sky-600 px-7 py-3 text-sm font-medium text-white hover:bg-sky-700"
          >
            {ctaLabel}
          </button>
        )}
        {
          children
        }
      </div>
    </div>
  );
};

export default EmptyState;
