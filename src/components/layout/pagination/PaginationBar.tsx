import React from "react";

type PaginationBarProps = {
  page: number;
  totalPages: number;
  onChange: (nextPage: number) => void;
};

export const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  totalPages,
  onChange,
}) => {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={!canPrev}
        className="rounded-full border px-4 py-2 text-sm disabled:opacity-50"
      >
        Previous
      </button>

      <span className="rounded-full border px-4 py-2 text-sm">
        {page} / {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={!canNext}
        className="rounded-full border px-4 py-2 text-sm disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
};
