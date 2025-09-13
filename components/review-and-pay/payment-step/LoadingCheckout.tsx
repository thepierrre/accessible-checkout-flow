export default function LoadingCheckout() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h2 className="mb-6 animate-pulse font-bold text-2xl text-blue-primary uppercase tracking-wider">
        Preparing secure checkout
      </h2>
      <div className="loadingBar bg-gradient-to-r from-blue-300 via-blue-500 to-blue-900" />
      <p className="mt-4 text-gray-600 text-sm">Hang on, we are connecting…</p>
    </div>
  );
}
