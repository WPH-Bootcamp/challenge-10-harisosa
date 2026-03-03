"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type PaginationBarProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblings?: number;
  className?: string;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const buildItems = (
  current: number,
  total: number,
  siblings: number
): Array<number | "ellipsis"> => {
  if (total <= 7) return range(1, total);

  const items: Array<number | "ellipsis"> = [1];

  const left = Math.max(current - siblings, 2);
  const right = Math.min(current + siblings, total - 1);

  if (left > 2) items.push("ellipsis");
  items.push(...range(left, right));
  if (right < total - 1) items.push("ellipsis");

  items.push(total);
  return items.filter((x, i) => items[i - 1] !== x);
};

export const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  totalPages,
  onChange,
  siblings = 1,
  className,
}) => {
  const currentPage = clamp(page, 1, totalPages);

  if (totalPages <= 1) return null;

  const items = buildItems(currentPage, totalPages, siblings);

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent>

          <PaginationItem>
            <PaginationPrevious
              onClick={() => onChange(currentPage - 1)}
              aria-disabled={currentPage === 1}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {items.map((it, idx) => {
            if (it === "ellipsis") {
              return (
                <PaginationItem key={`e-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={it} >
                <PaginationLink
                  className={
                    it === currentPage ? "rounded-full text-white bg-primary-300" : ''}
                  isActive={it === currentPage}
                  onClick={() => onChange(it)}
                >
                  {it}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => onChange(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
