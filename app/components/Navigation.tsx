import Link from "next/link";

export default function Navigation() {
  return (
    <div className="bg-gray-400 flex px-20 py-3 items-center justify-between">
      <div>logo</div>
      <div className="gap-2 flex">
        <Link href="/cabins">Cabins</Link>
        <Link href="/about">About</Link>
        <Link href="/account">Your account</Link>
      </div>
    </div>
  );
}
