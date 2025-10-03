"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Category, User } from "@/app/generated/prisma";
import { useDebouncedCallback } from "use-debounce";

const SearchData = ({
  data,
  placeholder,
  showSelected,
  selectValue,
  filterNotArticle,
}: {
  data?: Category[] | User[];
  placeholder: string;
  showSelected?: boolean;
  filterNotArticle?: boolean;
  selectValue?: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  if (!data) return null;

  return (
    <div className="flex gap-2">
      {showSelected && (
        <Select onValueChange={(value) => handleSearch(value)}>
          <SelectTrigger className="w-[180px] bg-white text-black cursor-pointer">
            <SelectValue placeholder={selectValue} />
          </SelectTrigger>
          <SelectContent>
            {Array.isArray(data) &&
              data.length > 0 &&
              (data[0].hasOwnProperty("role")
                ? data.map((user) => (
                    <SelectItem
                      key={user.id}
                      value={(user as User).role}
                      className="text-black cursor-pointer"
                    >
                      {(user as User).role}
                    </SelectItem>
                  ))
                : data
                    .filter((category) =>
                      filterNotArticle
                        ? !category.name.startsWith("Artikel")
                        : category.name.startsWith("Artikel")
                    )
                    .map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.name}
                        className="text-black cursor-pointer"
                      >
                        {category.name}
                      </SelectItem>
                    )))}
          </SelectContent>
        </Select>
      )}
      <div className="relative w-[240px] rounded-md bg-white">
        <Input
          placeholder={placeholder}
          className="pr-2 pl-9 placeholder:text-slate-400 text-black"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString() || ""}
        />
        <Search className="absolute left-2 top-2 size-5 text-slate-400" />
      </div>
    </div>
  );
};

export default SearchData;
