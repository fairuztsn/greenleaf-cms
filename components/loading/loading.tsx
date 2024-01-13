import { useState, CSSProperties } from "react";
import { BarLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loading() {

  return (
    <div className="h-screen flex justify-center items-center">
        <BarLoader
        color={"#15b24b"}
      />
      </div>
  )
}

export default Loading;