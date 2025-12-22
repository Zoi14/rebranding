// FILE: src/app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm"; // relative import

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description: "Φόρμα επικοινωνίας για αιτήματα & συνεργασίες.",
};

export default function Page() {
  return <ContactForm />;
}
