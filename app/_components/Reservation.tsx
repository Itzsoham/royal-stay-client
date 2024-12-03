import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { CabinType } from "./CabinCard";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

export type SettingsType = {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};

export default async function Reservation({ cabin }: { cabin: CabinType }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}