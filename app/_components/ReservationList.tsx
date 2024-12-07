"use client";

import React, { useOptimistic } from "react";
import { BookingType } from "../_lib/data-service";
import ReservationCard from "./ReservationCard";
import { delteReservationAction } from "../_lib/actions";
import { CabinType } from "./CabinCard";

export default function ReservationList({
  bookings,
  cabins,
}: {
  bookings: BookingType[];
  cabins: CabinType[];
}) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currBookings, bookingId) => {
      return currBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelte(bookingId: number) {
    optimisticDelete(bookingId);
    await delteReservationAction(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          cabins={cabins}
          key={booking.id}
          onDelete={handleDelte}
        />
      ))}
    </ul>
  );
}
