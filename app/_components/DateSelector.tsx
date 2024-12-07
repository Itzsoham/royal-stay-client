"use client";

import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CabinType } from "./CabinCard";
import { SettingsType } from "./Reservation";
import { useReservation } from "./ReservationContext";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";

function isAlreadyBooked(range: DateRange, datesArr: Date[] = []) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, {
        start: range.from as Date,
        end: range.to as Date,
      })
    )
  );
}

function DateSelector({
  settings,
  bookedDates,
  cabin,
}: {
  settings: SettingsType;
  bookedDates: Date[];
  cabin: CabinType;
}) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange =
    range && isAlreadyBooked(range, bookedDates) ? undefined : range;

  // CALCULATIONS
  const { discount, regularPrice } = cabin;
  const numNights = differenceInDays(
    displayRange?.to || new Date(),
    displayRange?.from || new Date()
  );
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={(selectedRange) => {
          setRange(selectedRange);
        }}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        hidden={{ before: new Date() }}
        endMonth={new Date(new Date().getFullYear() + 5, 0)}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(currDate) =>
          isPast(currDate) ||
          bookedDates.some((date) => isSameDay(date, currDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 text-primary-50 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
