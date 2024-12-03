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
  const cabin: CabinType = await getCabin(params.cabinId);

  return {
    title: `Cabin ${cabin.name}`,
    description: cabin.description,
    image: cabin.image,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({ params: { cabinId: cabin.id } }));
}

export default async function Page({
  params,
}: {
  params: { cabinId: number };
}) {
  const cabin: CabinType = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
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
}
