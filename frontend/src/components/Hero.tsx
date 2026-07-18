"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#2f81f7] via-[#1f6feb] to-[#10141a] px-8 py-20 text-center shadow-2xl">
      <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-white/10 p-5 backdrop-blur-md">
            <FaGithub className="h-14 w-14 text-white" />
          </div>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-white">
          GitHub Developer Dashboard
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
          Search any GitHub developer and instantly explore their profile,
          repositories, programming languages and recent public activity —
          all in one modern dashboard.
        </p>
      </motion.div>
    </section>
  );
}