import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description: "Φόρμα επικοινωνίας για αιτήματα & συνεργασίες.",
};

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Φόρτωση...</div>}>
      <ContactForm />
    </Suspense>
  );
}
