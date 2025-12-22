// src/components/BodyReady.tsx
"use client";
import { useEffect } from "react";

export default function BodyReady() {
  useEffect(() => {
    document.body.classList.add("is-ready"); // γιατί: legacy CSS απαιτεί αυτή την κλάση
    return () => document.body.classList.remove("is-ready");
  }, []);
  return null;
}
