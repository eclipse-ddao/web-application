/* eslint-disable @next/next/no-img-element */
import Container from "./common/Container";
import Head from "next/head";
import Button from "./common/Button";
import { useRouter } from "next/router";
import Image from "next/image";
function App() {
  const router = useRouter();

  return (
    <Container>
      <Head>
        <title>Eclipse</title>
      </Head>
      <div className="relative w-full h-full ">
        {/* Navbar */}
        <div className="flex items-center justify-between px-24 mt-10">
          <div className="cursor-pointer w-28" onClick={() => router.push("/")}>
            <Image src="/eclipse.png" width="384" height="165" alt="logo" />
          </div>
          <div>
            <div className="flex gap-2 ">
              <span className="p-2 border rounded-md cursor-pointer text-grey-200 border-grey-500">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512">
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
              </span>
              <span className="p-2 border rounded-md cursor-pointer text-grey-200 border-grey-500">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                </svg>
              </span>
              <span className="p-2 border rounded-md cursor-pointer text-grey-200 border-grey-500">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512">
                  <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        {/* Main */}
        <div className="w-full ">
          <div className="absolute z-20 flex flex-col w-full text-center uppercase">
            <div className="flex flex-col items-center w-full gap-5">
              <span className="w-4/5 mt-20 font-black leading-none text-center text-transparent uppercase bg-gradient-to-bl from-brand-600 to-white font-raleway text-8xl bg-clip-text drop-shadow-lg">
                Best way to manage
                <br /> your data daos
              </span>

              <div className="flex items-center gap-4 mx-auto font-raleway">
                <div className="flex flex-row gap-2 ">
                  <Button
                    className="flex items-center gap-2 px-16 font-bold font-raleway"
                    onClick={() => router.push("/getting-started")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Enter To App
                  </Button>
                  <Button className="p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </Button>
                </div>

                {/* <span className="px-6 py-4 rounded-md bg-cyan-300"></span> */}
                <span className="font-bold text-white capitalize cursor-pointer hover:underline">
                  Documentation
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="absolute bottom-0 flex flex-row items-center justify-between w-full text-center text-white">
          <div className="flex items-center justify-center w-full text-lg border border-b-0 border-l-0 border-r-0 shadow-xl border-grey-400 bg-gradient-to-bl from-white/20 via-white/10 to-white/0 backdrop-blur-lg h-36">
            for corporates
          </div>
          <div className="flex items-center justify-center w-full text-lg border border-b-0 border-r-0 border-grey-400 bg-gradient-to-bl from-white/20 via-white/10 to-white/0 backdrop-blur-md h-36 ">
            for researchers
          </div>
          <div className="flex items-center justify-center w-full text-lg border border-b-0 border-grey-400 bg-gradient-to-bl from-white/20 via-white/0 to-white/0 backdrop-blur-lg h-36 ">
            for data archivists
          </div>
          <div className="flex items-center justify-center w-full text-lg border-t border-grey-400 bg-gradient-to-bl from-white/20 via-white/10 to-white/0 backdrop-blur-lg h-36 ">
            for the people
          </div>
        </div>
      </div>
    </Container>
  );
}

export default App;
