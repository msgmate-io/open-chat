import React from "react";

export { Page };

function Page(pageProps) {
  return (
    <div className="hero min-h-screen">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Tims Stack V3</h1>
          <p className="mb-5">Now with Vike.dev</p>
          <button onClick={() => {}} className="btn btn-primary">
            Click
          </button>
          <a href="/chat" className="btn btn-primary">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
