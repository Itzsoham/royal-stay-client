import { getBookedDatesByCabinId, getCabins } from "@/app/_lib/data-service";

export async function GET(
  request: Request,
  { params }: { params: { cabinId: number } }
) {
  const { cabinId } = params;
  try {
    const [cabins, bookedDates] = await Promise.all([
      getCabins,
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabins, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not fount" });
  }
}
