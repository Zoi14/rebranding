import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-800">
      <div className="container-page py-10 text-sm text-neutral-400 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>© {new Date().getFullYear()} Rebranding — Social Media Content Creator</div>
        <div className="flex gap-4">
          <Link href="/services" className="hover:text-neutral-200">Υπηρεσίες</Link>
          <Link href="/contact" className="hover:text-neutral-200">Επικοινωνία</Link>
        </div>
      </div>
    </footer>
  );
}
