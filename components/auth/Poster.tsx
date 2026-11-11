import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const POSTER_SRC =
  "https://lottie.host/13795f88-b4c5-4abd-b80c-8662b00fd661/GPtaB3QCXF.lottie";

export default function Poster() {
  return (
    <div className="relative size-full">
      <DotLottieReact
        src={POSTER_SRC}
        loop
        autoplay
        layout={{ fit: "cover", align: [0.5, 0.5] }}
        backgroundColor="#dceeff"
        className="absolute inset-0 size-full"
      />
    </div>
  );
}
