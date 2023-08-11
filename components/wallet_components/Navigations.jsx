import React, { useState } from "react"

import Delegations from "./Delegations"
import MNRVTip from "./MNRVTip"
import Stake from "./Stake"
import Transfer from "./Transfer"

function Main(props) {
  const [activeItem, setActiveItem] = useState("Stake")

  const onClickHandler = (data) => {
    setActiveItem(data.value)
  }

  return (
    <div className="min-h-screen bg-slate-100 ">
      <div className="py-4">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:text-center"></div>
          <div style={{ width: "1200px" }}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <button
                className={`${
                  activeItem === "Stake"
                    ? "bg-slate-500 text-white"
                    : "bg-white border border-slate-300"
                } rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 `}
                onClick={() => onClickHandler({ value: "Stake" })}
              >
                Stake
              </button>
              <button
                className={`${
                  activeItem === "Transfer"
                    ? "bg-slate-500 text-white"
                    : "bg-white border border-slate-300"
                } rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 `}
                onClick={() => onClickHandler({ value: "Transfer" })}
              >
                Transfer
              </button>
              <button
                className={`${
                  activeItem === "Delegations"
                    ? "bg-slate-500 text-white"
                    : "bg-white border border-slate-300"
                } rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 `}
                onClick={() => onClickHandler({ value: "Delegations" })}
              >
                Delegations
              </button>
              <button
                className={`${
                  activeItem === "Tip"
                    ? "bg-slate-500 text-white"
                    : "bg-white border border-slate-300"
                } rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 `}
                onClick={() => onClickHandler({ value: "Tip" })}
              >
                Tip
              </button>
            </div>
          </div>
          <div className="mt-10" style={{ width: "1200px" }}>
            {activeItem === "Stake" ? <Stake /> : null}
            {activeItem === "Transfer" ? <Transfer /> : null}
            {activeItem === "Tip" ? <MNRVTip /> : null}
            {activeItem === "Delegations" ? <Delegations /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Navigation(props) {
  return <Main {...props} />
}
