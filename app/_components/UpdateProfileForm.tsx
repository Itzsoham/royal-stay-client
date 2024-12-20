import Image from "next/image";
import { ReactNode } from "react";
import { GuestType } from "@/app/_lib/data-service";
import { updateProfileAction } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

export default function UpdateProfileForm({
  children,
  guest,
}: {
  children: ReactNode;
  guest: GuestType;
}) {
  return (
    <div>
      <form
        action={updateProfileAction}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            name="fullName"
            defaultValue={guest?.fullName ?? ""}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled
            name="email"
            defaultValue={guest?.email ?? ""}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <Image
              src={guest?.countryFlag ?? ""}
              alt="Country flag"
              width={30}
              height={20}
              className=" rounded-sm"
            />
          </div>

          {children}
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            defaultValue={guest?.nationalID ?? ""}
            name="nationalID"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingText="Updating profile">
            Update profile
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
