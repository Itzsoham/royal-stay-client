"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

interface ReservationContextType {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const resetRange = () => setRange(undefined);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("Context must be used within a ReservationProvider");
  }
  return context;
}

export { ReservationProvider, useReservation };
