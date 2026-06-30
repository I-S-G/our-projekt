"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { label: "Most Recent", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Most Liked", value: "liked" },
  { label: "Most Commented", value: "commented" },
];

export default function SortDropDown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  
  const sortBy = searchParams.get("sort") ?? "newest";

  const changeSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex text-dark-grey cursor-pointer ">
          <span> {sortOptions.find((option) => option.value === sortBy)?.label} </span>
          <ChevronDown />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-link w-38" align="start">
        {
            sortOptions.map((option) => (
                (option.value !== sortBy) && (
                    <DropdownMenuItem key={option.value} onClick={() => {changeSort(option.value)}}>
                        {option.label}
                    </DropdownMenuItem>
                )
            ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
 