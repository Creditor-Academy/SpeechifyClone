export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
        {/* Left: White background with welcome text */}
        <div className="bg-white text-gray-900 px-8 py-16 md:px-12 md:py-24 flex items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Welcome User</h1>
            <p className="mt-4 text-base md:text-lg text-gray-600">
              Build your Speechify clone with a clean, modern Tailwind setup.
            </p>
            <div className="mt-8 flex gap-3">
              <button className="inline-flex items-center rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
                Get started
              </button>
              <button className="inline-flex items-center rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50">
                Learn more
              </button>
            </div>
          </div>
        </div>

        {/* Right: Dark panel with decorative elements */}
        <div className="relative bg-gray-950 text-gray-100 px-8 py-16 md:px-12 md:py-24 overflow-hidden">
          <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-indigo-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-xl grid-cols-3 gap-4">
            <div className="h-28 rounded-xl bg-white/5 backdrop-blur ring-1 ring-white/10" />
            <div className="h-40 rounded-xl bg-white/5 backdrop-blur ring-1 ring-white/10" />
            <div className="h-32 rounded-xl bg-white/5 backdrop-blur ring-1 ring-white/10" />
            <div className="h-36 rounded-xl bg-white/5 backdrop-blur ring-1 ring-white/10" />
            <div className="h-28 rounded-xl bg-white/5 backdrop-blur ring-1 ring-white/10" />
            <div className="h-44 rounded-xl bg-white/5 backdrop-blur ring-1 ring-white/10" />
          </div>

          <p className="relative mt-8 text-center text-sm text-gray-400">
            Sample placeholders for future controls/visuals
          </p>
        </div>
      </div>
    </section>
  )
}

