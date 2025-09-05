export default function ProcessingPayment() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-6 px-10 py-8 text-center animate-fade-in-up">
      <h1 className="text-2xl font-bold text-blue-primary">
        Connecting to your card provider
      </h1>
      <p className="text-gray-600 text-lg">
        Processing your payment<span className="animate-pulse">...</span>
      </p>
      <div className="flex space-x-2">
        <div className="h-3 w-3 rounded-full bg-blue-primary animate-bounce [animation-delay:-0.3s]" />
        <div className="h-3 w-3 rounded-full bg-blue-primary animate-bounce [animation-delay:-0.15s]" />
        <div className="h-3 w-3 rounded-full bg-blue-primary animate-bounce" />
      </div>
    </main>
  );
}
