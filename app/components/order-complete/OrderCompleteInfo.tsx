interface Props {
  orderEmail: string;
}

export default function OrderCompleteInfo({ orderEmail }: Props) {
  return (
    <>
      <h1 className="relative mb-4 py-2 text-center font-bold text-3xl uppercase tracking-wide">
        <span className="relative z-10 px-8 text-white">Thank you!</span>
        <span className="-skew-x-12 absolute inset-0 bg-blue-primary"></span>
      </h1>
      <div className="flex flex-col gap-3">
        <p>
          Your order has been placed successfully.
          <br /> We&#39;ve sent a confirmation to{" "}
          <span className="font-semibold">{orderEmail}</span>.
        </p>
        <p>We&#39;ll let you know as soon as we&#39;ve shipped your order.</p>
      </div>
    </>
  );
}
