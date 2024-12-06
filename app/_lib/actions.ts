"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { updateGuest } from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData: FormData) {
  const session = await auth();

  console.log(formData);

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
