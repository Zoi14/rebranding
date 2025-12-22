// ============================================================================
// FILE: src/components/ContactForm.tsx  (μένει όπως το έχεις λειτουργικά,
//        απλώς χρησιμοποιεί τις κλάσεις .card/.btn/.form-modern που ορίσαμε)
// ============================================================================
"use client";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const SERVICE_OPTIONS = [
  "Διαχείριση Social Media","Design για Social Media","Content Creation (Video & Photo)",
  "Web Design & Κατασκευή Ιστοσελίδας","Δωρεάν Αξιολόγηση",
];

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const params = useSearchParams();
  const initialService = useMemo(() => {
    const v = params.get("service");
    try { return v ? decodeURIComponent(v) : ""; } catch { return v || ""; }
  }, [params]);

  const [form, setForm] = useState({ fullName: "", email: "", phone: "", service: initialService, message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const errors = React.useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Πες μου το όνομά σου.";
    if (!form.email.trim()) e.email = "Χρειάζομαι email για να απαντήσω.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Βάλε ένα έγκυρο email.";
    if (form.phone && form.phone.replace(/\D/g, "").length < 8) e.phone = "Βάλε ένα έγκυρο τηλέφωνο (προαιρετικό).";
    if (!form.message.trim()) e.message = "Γράψε λίγες λεπτομέρειες για το τι χρειάζεσαι.";
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;
  const showError = (n: string) => touched[n] && errors[n];

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target; setForm((p) => ({ ...p, [name]: value }));
  }
  function onBlur(e: React.FocusEvent<HTMLElement>) {
    const name = (e.target as HTMLInputElement).name; setTouched((p) => ({ ...p, [name]: true }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ fullName: true, email: true, phone: true, service: true, message: true });
    if (!isValid) { setStatus("error"); setError("Έλεγξε τα πεδία με κόκκινο και δοκίμασε ξανά."); return; }
    setStatus("sending"); setError("");
    try {
      const resp = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data?.ok) throw new Error(data?.error || `HTTP ${resp.status}`);
      setStatus("success");
      setForm({ fullName: "", email: "", phone: "", service: "", message: "" });
      setTouched({});
    } catch (err: any) {
      console.error("submit failed:", err?.message);
      setStatus("error"); setError(err?.message || "Δεν στάλθηκε. Δοκίμασε ξανά.");
    }
  }

  return (
    <section className="card container-page">
      <header className="page-header">
        <h1>Επικοινωνία</h1>
        <p>Συμπλήρωσε τη φόρμα και θα σου απαντήσω σύντομα.</p>
      </header>

      <form className="form-modern" onSubmit={onSubmit} noValidate>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName">Ονοματεπώνυμο</label>
            <input id="fullName" name="fullName" placeholder="π.χ. Μαρία Παπαδοπούλου"
                   value={form.fullName} onChange={onChange} onBlur={onBlur}
                   className={showError("fullName") ? "is-invalid" : ""}/>
            {showError("fullName") && <div className="error">{errors.fullName}</div>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="π.χ. name@email.com"
                   value={form.email} onChange={onChange} onBlur={onBlur}
                   className={showError("email") ? "is-invalid" : ""}/>
            {showError("email") && <div className="error">{errors.email}</div>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="phone">Τηλέφωνο (προαιρετικό)</label>
            <input id="phone" name="phone" placeholder="π.χ. 69xxxxxxx"
                   value={form.phone} onChange={onChange} onBlur={onBlur}
                   className={showError("phone") ? "is-invalid" : ""}/>
            {showError("phone") && <div className="error">{errors.phone}</div>}
          </div>
          <div>
            <label htmlFor="service">Υπηρεσία (optional)</label>
            <select
  className="select-dark w-full rounded-xl border border-white/10 bg-zinc-900 text-white px-4 py-3"
  id="service"
  name="service"
  value={form.service}
  onChange={onChange}
  onBlur={onBlur}
>
  <option value="">Διάλεξε υπηρεσία</option>
  {SERVICE_OPTIONS.map((s) => (
    <option key={s} value={s}>
      {s}
    </option>
  ))}
</select>

          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="message">Μήνυμα</label>
          <textarea id="message" name="message" rows={5}
                    placeholder="Πες μου τι χρειάζεσαι, στόχο, deadline, και ό,τι άλλο βοηθάει."
                    value={form.message} onChange={onChange} onBlur={onBlur}
                    className={showError("message") ? "is-invalid" : ""}/>
          {showError("message") && <div className="error">{errors.message}</div>}
        </div>

        {status === "error" && <div className="error mt-3">{error}</div>}

        <div className="actions">
          <button className="btn" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Αποστολή..." : "Αποστολή"}
          </button>
          <a className="btn secondary" href="mailto:rebrandingbyzoe@gmail.com">Email</a>
        </div>

        {status === "success" && <div className="form-success">Στάλθηκε ✅ Θα λάβεις απάντηση σύντομα.</div>}
      </form>
    </section>
  );
}
