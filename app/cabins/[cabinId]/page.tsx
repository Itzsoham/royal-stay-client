import { CabinType } from "@/app/_components/CabinCard";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { cabinId: number };
}) {
  try {
    const cabin: CabinType = await getCabin(params.cabinId);
    return {
      title: `Cabin ${cabin.name}`,
      description: cabin.description,
      image: cabin.image,
    };
  } catch {
    return {
      title: "Cabin not found",
      description: "Explore our other luxurious cabins.",
    };
  }
}
export async function generateStaticParams() {
  try {
    const cabins = await getCabins();
    return cabins.map((cabin) => ({
      params: { cabinId: cabin.id.toString() },
    }));
  } catch {
    console.error("Failed to fetch cabin paths");
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: { cabinId: number };
}) {
  try {
    const cabin: CabinType = await getCabin(params.cabinId);
    if (!cabin) throw new Error("Cabin not found");
    return (
      <div>
        <Cabin cabin={cabin} />
        <div>
          <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
            Reserve {cabin.name} today. Pay on arrival.
          </h2>
          <Suspense fallback={<Spinner />}>
            <Reservation cabin={cabin} />
          </Suspense>
        </div>
      </div>
    );
  } catch {
    return <div>Cabin not available. Please check back later. </div>;
  }
}
