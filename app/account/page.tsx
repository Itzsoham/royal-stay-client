import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest Area",
};

export default async function page() {
  const session = await auth();

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome {session?.user?.name}
      </h2>
    </div>
  );
}
