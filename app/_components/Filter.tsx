"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-900 flex">
      <Button
        handleFilter={handleFilter}
        filter="all"
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="small"
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="medium"
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="large"
        activeFilter={activeFilter}
      >
        8+ guests
      </Button>
    </div>
  );
}

type ButtonProps = {
  handleFilter: (filter: string) => void;
  filter: string;
  activeFilter: string;
  children: React.ReactNode;
};

function Button({ handleFilter, filter, activeFilter, children }: ButtonProps) {
  return (
    <button
      className={
        "px-5 py-2 hover:bg-primary-700" +
        (filter === activeFilter ? " bg-primary-700 text-primary-50" : "")
      }
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}