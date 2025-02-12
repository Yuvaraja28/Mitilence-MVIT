import React from "react";

export default function ProfileCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative w-52 bg-gray-300 rounded-xl border-4 border-purple-500 p-4 text-center">
        <div className="w-full h-32 bg-gray-400 rounded-lg flex items-center justify-center">
          <div className="w-20 h-20 bg-white rounded-full"></div>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full bg-white rounded-b-lg py-4 px-4 flex flex-col items-center"
          style={{ transform: "translateY(30%)" }}
        >
          <p className="text-purple-600 font-semibold text-lg">Yuvaraja</p>
          <p className="text-gray-700 text-sm">Developer</p>
          <div className="flex gap-2 mt-2">
            <a href="#" className="text-purple-500">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                alt="GitHub"
                className="w-5 h-5"
              />
            </a>
            <a href="#" className="text-purple-500">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Linkedin.svg"
                alt="LinkedIn"
                className="w-5 h-5"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};