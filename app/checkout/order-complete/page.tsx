import checkIcon from "../../../public/icons/checkIcon.svg";
import Image from "next/image";

export default function OrderCompletePage() {
  return (
    <main className="flex flex-col gap-12 my-8 mx-auto w-144 border border-gray-primary p-6 rounded-lg">
      <div>
        <h1 className="text-4xl w-full mb-2 font-medium text-blue-primary">
          Thanks for your purchase!
        </h1>
        <p>An email confirmation has been sent to example@gmail.com</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <p className="font-semibold">Order number:</p>
          <p>2025-03-30-00053</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Order total:</p>
          <p>€45.50</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Shipped by:</p>
          <p>Saturday, 2 April</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Shipped to:</p>
          <p>Munich Av. 20 74343 Munich, Germany</p>
        </div>
      </div>

      <div>
        <p>Need help? Contact us</p>
      </div>

      <button>Continue shopping</button>
    </main>
  );
}
