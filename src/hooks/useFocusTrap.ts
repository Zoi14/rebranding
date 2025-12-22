import { useEffect, useRef } from "react";

/** Traps focus inside `containerRef` when `enabled`. Restores focus on cleanup. */
export function useFocusTrap<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>, // ✅ accept null in the ref
  enabled: boolean,
  onEscape?: () => void
) {
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return; // ✅ null-guard

    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const focusables = getFocusable(container);
    (focusables[0] ?? container).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onEscape?.(); return; }
      if (e.key !== "Tab") return;

      const els = getFocusable(container);
      if (els.length === 0) { e.preventDefault(); container.focus(); return; }

      const idx = els.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (idx <= 0 ? els.length - 1 : idx - 1)
                              : (idx === els.length - 1 ? 0 : idx + 1);
      e.preventDefault();
      els[next].focus();
    };

    container.addEventListener("keydown", onKeyDown);
    return () => {
      container.removeEventListener("keydown", onKeyDown);
      lastFocusedRef.current?.focus?.();
      lastFocusedRef.current = null;
    };
  }, [containerRef, enabled, onEscape]);
}

function getFocusable(root: HTMLElement): HTMLElement[] {
  const selectors = [
    'a[href]:not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(root.querySelectorAll<HTMLElement>(selectors.join(","))).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}