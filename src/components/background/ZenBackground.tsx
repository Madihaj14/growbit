
"use client";
import AnimatedBlobs from "./AnimatedBlobs";
import Fireflies from "./Fireflies";
import FloatingLeaves from "./FloatingLeaves";
import SimpleFlowers from "./SimpleFlowers";
import FloatingIcons from "./FloatingIcons";

const ZenBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-[#D3E4FD] to-[#C8E6C9] dark:from-slate-900 dark:to-slate-800 -z-10">
      {/* Animated blobs */}
      <AnimatedBlobs />

      {/* ✨ Floating Fireflies */}
      <Fireflies />

      {/* 🍃 Floating Leaves */}
      <FloatingLeaves />

      {/* 🌸 Simple Flowers */}
      <SimpleFlowers />

      {/* Floating doodles/icons */}
      <FloatingIcons />

      {/* Ripple effect container */}
      <div id="ripple-container" className="absolute inset-0 pointer-events-none" />
    </div>
  );
};

export default ZenBackground;
