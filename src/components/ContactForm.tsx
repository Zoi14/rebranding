"use client";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Συγχρονισμένα services με το ServicesGrid για συνέπεια
const SERVICE_OPTIONS = [
  "Social Media Management",
  "Content Creation (Video & Photo)",
  "Web Design & Development",
  "Video Editing",
  "Rebranding / Redesign",
  "Άλλο / Δωρεάν Αξιολόγηση",
];

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const params = useSearchParams();

  const initialService = useMemo(() => {
    const v = params.get("service");
    // Αντιστοίχιση του ID από το URL με το πλήρες όνομα της υπηρεσίας
    if (v === "social") return "Social Media Management";
    if (v === "content") return "Content Creation (Video & Photo)";
    if (v === "video") return "Video Editing";
    if (v === "web") return "Web Design & Development";
    if (v === "redesign") return "Rebranding / Redesign";
    if (v === "design") return "Social Media Management"; // Fallback mapping based on id
    return "";
  }, [params]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: initialService,
    message: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Πες μου το όνομά σου.";
    if (!form.email.trim()) e.email = "Το email είναι απαραίτητο.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Μη έγκυρη μορφή email.";
    if (form.phone && form.phone.replace(/\D/g, "").length < 8)
      e.phone = "Έλεγξε τον αριθμό τηλεφώνου.";
    if (!form.message.trim())
      e.message = "Γράψε μου λίγα λόγια για το project.";
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  // Safe accessor to handle boolean | string return
  const getError = (n: string): string | undefined => {
    return touched[n] && errors[n] ? errors[n] : undefined;
  };

  function onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      service: true,
      message: true,
    });

    if (!isValid) {
      setStatus("error");
      setError("Παρακαλώ διόρθωσε τα πεδία με κόκκινο.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await resp.json().catch(() => ({}));

      if (!resp.ok || !data?.ok)
        throw new Error(data?.error || `HTTP ${resp.status}`);

      setStatus("success");
      setForm({ fullName: "", email: "", phone: "", service: "", message: "" });
      setTouched({});
    } catch (err: any) {
      console.error("submit failed:", err?.message);
      setStatus("error");
      setError(err?.message || "Κάτι πήγε στραβά. Δοκίμασε ξανά.");
    }
  }

  // Styles για τα Inputs (επαναχρησιμοποιούμενα)
  const inputClasses = (errorText: string | undefined) => `
    w-full bg-white/[0.03] border rounded-lg px-4 py-3.5 text-white placeholder-slate-500
    transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50
    ${errorText
      ? "border-red-500/50 focus:border-red-500"
      : "border-white/10 focus:border-blue-500 hover:border-white/20"
    }
  `;

  const labelClasses = "block text-xs font-bold uppercase tracking-widest text-blue-300 mb-2";

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-10 rounded-3xl bg-[#0F172A] border border-white/5 shadow-2xl relative overflow-hidden">

      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

      <form className="relative z-10 space-y-8" onSubmit={onSubmit} noValidate>

        {/* Row 1: Name & Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="fullName" className={labelClasses}>Ονοματεπωνυμο</label>
            <input
              id="fullName"
              name="fullName"
              placeholder="π.χ. Μαρία Παπαδοπούλου"
              value={form.fullName}
              onChange={onChange}
              onBlur={onBlur}
              className={inputClasses(getError("fullName"))}
            />
            {getError("fullName") && (
              <span className="text-xs text-red-400 mt-1 block animate-pulse">{errors.fullName}</span>
            )}
          </div>

          <div className="group">
            <label htmlFor="email" className={labelClasses}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@email.com"
              value={form.email}
              onChange={onChange}
              onBlur={onBlur}
              className={inputClasses(getError("email"))}
            />
            {getError("email") && <span className="text-xs text-red-400 mt-1 block animate-pulse">{errors.email}</span>}
          </div>
        </div>

        {/* Row 2: Phone & Service */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="phone" className={labelClasses}>Τηλεφωνο (Προαιρετικο)</label>
            <input
              id="phone"
              name="phone"
              placeholder="π.χ. 69xxxxxxx"
              value={form.phone}
              onChange={onChange}
              onBlur={onBlur}
              className={inputClasses(getError("phone"))}
            />
            {getError("phone") && <span className="text-xs text-red-400 mt-1 block animate-pulse">{errors.phone}</span>}
          </div>

          <div className="group">
            <label htmlFor="service" className={labelClasses}>Ενδιαφερομαι για</label>
            <div className="relative">
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={onChange}
                onBlur={onBlur}
                className={`${inputClasses(getError("service"))} appearance-none cursor-pointer`}
                style={{ backgroundColor: "#0F172A" }} // Fix for dark dropdown options
              >
                <option value="" disabled className="text-slate-500">Διάλεξε υπηρεσία</option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s} className="bg-[#0F172A] text-white py-2">
                    {s}
                  </option>
                ))}
              </select>
              {/* Custom Arrow Icon */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
            {getError("service") && (
              <span className="text-xs text-red-400 mt-1 block animate-pulse">{errors.service}</span>
            )}
          </div>
        </div>

        {/* Row 3: Message */}
        <div className="group">
          <label htmlFor="message" className={labelClasses}>Το Μηνυμα σου</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Πες μου για το project σου, τους στόχους και το deadline..."
            value={form.message}
            onChange={onChange}
            onBlur={onBlur}
            className={inputClasses(getError("message"))}
          />
          {getError("message") && (
            <span className="text-xs text-red-400 mt-1 block animate-pulse">{errors.message}</span>
          )}
        </div>

        {/* Global Error Message */}
        {status === "error" && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.7)] hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {status === "sending" ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Αποστολη...
              </>
            ) : status === "success" ? (
              <>
                <span className="text-green-300">✓</span> Σταλθηκε
              </>
            ) : (
              "Αποστολη μηνυματος"
            )}
          </button>

          <a
            href="mailto:rebrandingbyzoe@gmail.com"
            className="text-sm text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-blue-400"
          >
            ή στείλε email απευθείας
          </a>
        </div>

        {/* Success Animation */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0F172A]/95 backdrop-blur-sm rounded-3xl"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-4 border border-green-500/30">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-medium text-white mb-2">Ευχαριστώ!</h3>
              <p className="text-slate-400 text-center max-w-xs">
                Έλαβα το μήνυμά σου και θα επικοινωνήσω μαζί σου το συντομότερο.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-8 text-sm text-blue-400 hover:text-white transition-colors uppercase tracking-widest font-bold"
              >
                Νεο Μηνυμα
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </form>
    </div>
  );
}