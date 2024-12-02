// import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import CabinCard, { CabinType } from "./CabinCard";

export default async function CabinList({ filter }: { filter: string }) {
  // noStore();

  const cabins: CabinType[] = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;

  if (filter === "all") {
    displayedCabins = cabins;
  }
  if (filter === "small")
    displayedCabins = cabins.filter((c) => c.maxCapacity <= 3);

  if (filter === "medium")
    displayedCabins = cabins.filter(
      (c) => c.maxCapacity > 3 && c.maxCapacity <= 7
    );

  if (filter === "large")
    displayedCabins = cabins.filter((c) => c.maxCapacity > 7);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
