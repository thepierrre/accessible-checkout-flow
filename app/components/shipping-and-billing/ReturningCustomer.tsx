import Link from "next/link";
import Image from "next/image";
import questionIcon from "../../../public/question-icon.svg";

export function ReturningCustomer() {
  return (
    <section className="flex flex-col gap-2 text-lg text-black-primary border-b pb-1 border-gray-primary px-6">
      <div className="flex gap-1">
        <Link href="/login" className="text-blue-primary font-medium">
          Log in
        </Link>
        <p>or</p>
        <Link href="/create-account" className="text-blue-primary font-medium">
          sign up
        </Link>
        <p>(optional)</p>
        <Image src={questionIcon} alt="login and sign-up information" />
      </div>
    </section>
  );
}
