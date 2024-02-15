export default WecomeHero;

import React from "react";
import ThemeSelector from "../atoms/ThemeSelector";
import UserIndicator from "../atoms/UserIndicator";

function FeaetureIcon({ title, children }) {
  return (
    <div className="w-70 h-32 rounded-xl bg-base-300 relative shadow-xl hover:bg-accent p-2">
      <div className="w-full h-full flex flex-col content-start items-start justify-center">
        <div className="w-full p-2 flex content-center items-center justify-center">
          <h1 className="text-xl">{title}</h1>
        </div>
        <div className="w-full flex flex-grow content-center items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

function WecomeHero() {
  const pageSource = typeof window !== "undefined" ? window.location.href : "";
  return (
    <div className="h-screen w-screen relative bg-content">
      <div className="w-full h-full flex p-10 content-center items-center justify-center relative">
        <div className="w-full h-full flex flex-col gap-6 content-center items-center justify-center relative">
          <div className="border-2 rounded-2xl">
            <h1 className="text-2xl sm:text-4xl lg:text-7xl">
              {" "}
              Django-Vike-Chat 👋
            </h1>
          </div>
          <h1 className="text-sm sm:text-xl">
            Example of a open dynamic chat app
          </h1>
          <div className="flex flex-row flex-wrap gap-4 max-w-full content-center items-center justify-center">
            <FeaetureIcon title={"DaisyUI + tailwind"}>
              <ThemeSelector />
            </FeaetureIcon>
            <FeaetureIcon title={"Vike SSR + ClientRouting"}>
              <a href={`/chat/`} className="btn btn-primary">
                Navigate client side (chat)
              </a>
            </FeaetureIcon>
            <FeaetureIcon title={"Fully opensource on github"}>
              <button className="btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Check the repo
              </button>
            </FeaetureIcon>
            <FeaetureIcon title={"Django Auth + User Management"}>
              <UserIndicator />
            </FeaetureIcon>
          </div>
        </div>
      </div>
    </div>
  );
}
