export default function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-2xl text-center bg-white p-10 rounded-2xl shadow-lg">
        <div className="text-6xl mb-6">❤️</div>

        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Thank You For Your Donation!
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Your donation helps us rescue and care for injured animals.
          Thank you for supporting Vidyasagar Jeev Daya Parivar Trust.
        </p>

        <a
          href="/"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
