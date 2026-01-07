import React from "react";

export default function Hero() {
  return (
    <div className="relative isolate px-6 pt-24 lg:px-8 bg-gray-900">
      {/* фон сверху */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72rem]"
        />
      </div>

      {/* контент */}
      <div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-40 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
          Data to enrich your online business
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-400">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-400"
          >
            Get started
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            Learn more →
          </a>
        </div>
      </div>
    </div>
  );
}
