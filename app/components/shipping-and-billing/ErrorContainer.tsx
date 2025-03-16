import Image from "next/image";
import warningIcon from "@/public/warning-icon.svg";

export default function ErrorContainer() {
  return (
    <section className="flex gap-4 text-red-primary border border-red-primary py-2 px-4 rounded-lg my-6">
      <Image src={warningIcon} alt="Error warning icon" />
      <div>
        <p className="font-semibold antialiased">Error</p>
        <p>Please fix the errors in the form.</p>
      </div>
    </section>
  );
}
