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
    <BarLoader
          color={"#15b24b"}
    />
  )
}

export default Loading;