"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  BookingType,
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData: FormData) {
  const session = await auth();

  if (!session)
    throw new Error("You need to be signed in to update your profile");

  const nationalID = formData.get("nationalID") as string | null;
  const nationalityAndFlag = formData.get("nationality") as string | null;

  if (!nationalID || !nationalityAndFlag) {
    throw new Error("Missing form data");
  }
  const [nationality, countryFlag] = nationalityAndFlag.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Provide a valid national ID number");
  }

  const updateData = { nationalID, nationality, countryFlag };

  updateGuest(session?.user?.guestId, updateData);

  revalidatePath("/account/profile");
}

export async function delteReservationAction(bookingId: number) {
  const session = await auth();

  if (!session)
    throw new Error("You need to be signed in to update your profile");

  const guestId = session?.user?.guestId;
  if (typeof guestId !== "number") {
    throw new Error("Invalid guest ID");
  }
  const guestBooking = await getBookings(guestId);
  const guestBookingIds = guestBooking.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this booking");
  }

  deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateReservationAction(formData: FormData) {
  const session = await auth();
  if (!session)
    throw new Error("You need to be signed in to update your profile");

  const bookingId = formData.get("id") as string | null;

  const updateData = {
    id: Number(bookingId),
    numGuests: formData.get("numGuests")
      ? Number(formData.get("numGuests"))
      : undefined,
    observations: formData.get("observations") as string | null,
  };

  updateBooking(updateData.id, updateData);

  revalidatePath("/account/reservations/");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

export async function createReservationAction(
  bookingData: BookingType,
  formData: FormData
) {
  const session = await auth();
  if (!session)
    throw new Error("You need to be signed in to update your profile");

  const guestId = session?.user?.guestId;
  if (typeof guestId !== "number") {
    throw new Error("Invalid guest ID");
  }

  const newBookingData = {
    ...bookingData,
    guestId,
    numGuests: formData.get("numGuests")
      ? Number(formData.get("numGuests"))
      : undefined,
    observations: formData.get("observations")?.slice(0, 1000) as string | null,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  createBooking(newBookingData);

  revalidatePath(`cabins/${bookingData.cabinId}`);

  redirect("/cabins/thanks");
}
