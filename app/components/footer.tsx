import * as React from "react"
import { useFetcher } from "@remix-run/react"

export default function Footer() {
  const fetcher = useFetcher()

  React.useEffect(() => {
    if (fetcher.data) {
      console.log("data", fetcher.data)
    }
  }, [fetcher.data])

  return (
    <div
      className={`bg-hero-pattern -mt-8 md:-mt-16 lg:-mt-[7.1rem] pt-8 md:pt-16 lg:pt-[7.1rem] text-white`}
    >
      <div className="lg:w-[55em] mx-auto py-12">
        <div className="mx-8 lg:mx-0">
          <h2 className="font-raleway uppercase font-bold border-b-2 border-white/30 text-xl pb-5 mb-5">
            Get in touch
          </h2>
          <p className="font-sans font-light leading-7">
            If you would like to get in touch with me, you may feel free to
            contact me via this web form below. I cannot guarantee I will
            promptly respond, as I am not currently accepting solicitations from
            recruiters.
          </p>

          {fetcher.data?.success === false ? (
            <div className="mt-4 font-bold text-red-600 uppercase font-raleway p-4 bg-red-700/10 rounded border-2 border-red-700/80">
              Error Submitting Form
              {fetcher.data?.error ? `: ${fetcher.data?.error}` : null}
            </div>
          ) : null}

          {fetcher.data?.success === true ? (
            <div className="mt-4 font-bold uppercase font-raleway p-4 bg-primary/20 rounded border-2 border-primary/80">
              Successfully Submitted Message
            </div>
          ) : null}

          <fetcher.Form method="post" action="/email">
            <div className="flex flex-col md:flex-row mt-4">
              <div className="flex flex-1 flex-col pr-6">
                <label className="uppercase text-sm font-bold font-raleway tracking-widest">
                  Name
                </label>
                <input
                  className={`border-2 border-white/10 rounded-md mt-4 appearance-none focus:border-primary focus:outline-0 py-2 px-4 tracking-wider ${
                    fetcher.data?.fieldErrors?.name
                      ? "border-red-700 bg-red-700/5"
                      : "mb-8 bg-white/5"
                  }`}
                  type="text"
                  name="name"
                />

                {fetcher.data?.fieldErrors?.name ? (
                  <div className="font-bold font-raleway uppercase text-red-700 mb-4">
                    {fetcher.data?.fieldErrors?.name}
                  </div>
                ) : null}

                <label className="uppercase text-sm font-bold font-raleway tracking-widest">
                  Email
                </label>
                <input
                  className={`border-2 border-white/10 rounded-md mt-4 appearance-none focus:border-primary focus:outline-0 py-2 px-4 tracking-wider ${
                    fetcher.data?.fieldErrors?.email
                      ? "border-red-700 bg-red-700/5"
                      : "mb-8 bg-white/5"
                  }`}
                  type="email"
                  name="email"
                />

                {fetcher.data?.fieldErrors?.email ? (
                  <div className="font-bold font-raleway uppercase text-red-700 mb-4">
                    {fetcher.data?.fieldErrors?.email}
                  </div>
                ) : null}

                <label className="uppercase text-sm font-bold font-raleway tracking-widest">
                  Phone Number
                </label>
                <input
                  className={`border-2 border-white/10 rounded-md mt-4 appearance-none focus:border-primary focus:outline-0 py-2 px-4 tracking-wider ${
                    fetcher.data?.fieldErrors?.phone
                      ? "border-red-700 bg-red-700/5"
                      : "mb-8 bg-white/5"
                  }`}
                  type="tel"
                  name="phone"
                />

                {fetcher.data?.fieldErrors?.phone ? (
                  <div className="font-bold font-raleway uppercase text-red-700 mb-4">
                    {fetcher.data?.fieldErrors?.phone}
                  </div>
                ) : null}

                <label className="uppercase text-sm font-bold font-raleway tracking-widest">
                  Message
                </label>
                <textarea
                  className={`border-2 border-white/10 rounded-md mt-4 appearance-none focus:border-primary focus:outline-0 py-2 px-4 tracking-wider h-48 ${
                    fetcher.data?.fieldErrors?.message
                      ? "border-red-700 bg-red-700/5"
                      : "mb-8 bg-white/5"
                  }`}
                  name="message"
                />

                {fetcher.data?.fieldErrors?.message ? (
                  <div className="font-bold font-raleway uppercase text-red-700 mb-4">
                    {fetcher.data?.fieldErrors?.message}
                  </div>
                ) : null}

                <div>
                  <button
                    type="submit"
                    className="uppercase text-sm font-bold font-raleway tracking-widest inline-block py-4 px-8 border-2 border-white/10 bg-white/5 rounded-md hover:border-primary/80 active:border-primary active:bg-white/20"
                  >
                    Send Message
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-col pl-4">
                <div className="flex flex-row mb-12">
                  <div className="border-2 border-white/10 rounded-full w-8 p-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      fill="white"
                    >
                      <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                    </svg>
                  </div>
                  <div className="flex-1 pl-4 pt-1 content-center">
                    Pepperell, MA
                  </div>
                </div>

                <div className="flex flex-row mb-12">
                  <div className="border-2 border-white/10 rounded-full w-8 p-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                      fill="white"
                    >
                      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                    </svg>
                  </div>
                  <div className="pl-4 pt-1 flex-1 content-center">
                    <a
                      href="https://github.com/JimmayVV"
                      className="pb-0.5 border-dashed border-b border-b-white/50 hover:border-solid hover:border-primary"
                      target="_blank"
                    >
                      Jimmy's Github Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </fetcher.Form>
        </div>
      </div>
    </div>
  )
}
