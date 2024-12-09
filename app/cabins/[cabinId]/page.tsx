import { CabinType } from "@/app/_components/CabinCard";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";
import { getCabin } from "@/app/_lib/data-service";
import { Suspense } from "react";
import { notFound } from "next/navigation";

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: { cabinId: number };
}) {
  try {
    const cabin: CabinType = await getCabin(Number(params.cabinId));

    return {
      title: `Cabin ${cabin.name}`,
      description: cabin.description || "Discover our luxurious cabins.",
      image: cabin.image || "/default-cabin.jpg", // Fallback image
    };
  } catch (error) {
    console.error("Metadata generation failed:", error);
    return {
      title: "Cabin not found",
      description: "Explore our other luxurious cabins.",
    };
  }
}

// Main Page Component
export default async function Page({
  params,
}: {
  params: { cabinId: number };
}) {
  try {
    const cabin: CabinType = await getCabin(Number(params.cabinId));
    if (!cabin) {
      notFound();
    }

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
  } catch (error) {
    console.error("Error rendering cabin page:", error);
    return <div>Cabin not available. Please check back later.</div>;
  }
}
