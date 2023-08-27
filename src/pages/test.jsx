import React, { useState } from "react";

const test = () => {
  const [first, setfirst] = useState(false);
  return (
    <>
      <button onClick={() => setfirst(!first)}>button</button>
      <div
        className={`${
          first ? "" : "pointer-events-none  opacity-0 "
        }  modal  fixed left-0 top-0 flex h-full w-full items-center justify-center transition-all`}
      >
        <div
          onClick={() => {
            setfirst(!first);
          }}
          className="modal-overlay fixed h-full w-full bg-gray-900 opacity-50"
        ></div>

        <div
          className={`fixed left-0 top-0 z-20 h-full w-64 -translate-x-full transform 
        bg-white shadow-lg transition-all duration-500 ${
          first ? "translate-x-0" : ""
        }
      `}
        >
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold">Drawer</h2>
            <p className="text-gray-500">This is a drawer.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default test;
