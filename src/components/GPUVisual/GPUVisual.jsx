import React from "react";
import { motion } from "framer-motion";
import rtx5070Image from "../../assets/images/rtx-5070.png";

const GPUVisual = () => {
  return (
    <div className="flex justify-center items-center relative">
      <motion.div
        className="relative"
        style={{
          transform: "perspective(1000px) rotateY(-15deg) rotateX(5deg)",
        }}
        initial={{
          opacity: 0,
          transform:
            "perspective(1000px) rotateY(-25deg) rotateX(15deg) translateY(50px)",
        }}
        animate={{
          opacity: 1,
          transform:
            "perspective(1000px) rotateY(-15deg) rotateX(5deg) translateY(0px)",
        }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        whileHover={{
          transform:
            "perspective(1000px) rotateY(-10deg) rotateX(2deg) translateY(0px)",
        }}
      >
        <img
          src={rtx5070Image}
          alt="NVIDIA RTX 4080 Graphics Card"
          className="w-full max-w-lg h-auto filter drop-shadow-2xl"
        />

        <motion.div
          className="absolute top-8 -left-16 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 shadow-xl hidden lg:block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 0 }}
        >
          <div className="text-sm font-semibold text-gray-900">16GB VRAM</div>
          <div className="text-xs text-gray-600">GDDR6X</div>
        </motion.div>

        <motion.div
          className="absolute bottom-12 -right-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 shadow-xl hidden lg:block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        >
          <div className="text-sm font-semibold text-gray-900">Boost Clock</div>
          <div className="text-xs text-gray-600">2.5 GHz</div>
        </motion.div>

        <motion.div
          className="absolute top-24 -left-20 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 shadow-xl hidden lg:block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 4 }}
        >
          <div className="text-sm font-semibold text-gray-900">Ray Tracing</div>
          <div className="text-xs text-gray-600">3rd Gen RT</div>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 rounded-lg blur-2xl -z-10 animate-pulse"></div>
      </motion.div>
    </div>
  );
};

export default GPUVisual;
