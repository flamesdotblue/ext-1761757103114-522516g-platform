import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/30 to-white pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-10">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Seamless order tracking
          </h2>
          <p className="text-gray-600 mt-1 max-w-xl">
            Securely view your recent purchases, invoices, and payment status. Just use your phone number.
          </p>
        </div>
      </div>
    </section>
  );
}
