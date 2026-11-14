'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

/**
 * On phones, scales the text so its widest line is exactly as wide as the element (the lines never wrap).
 * The element is sized by `className` (e.g. the same width as the buttons below it); from `md` up the text is
 * left alone and wraps normally. Until the script runs, the CSS font size in `className` is used.
 */
export default function FitText({
  as: Tag = 'p',
  className = '',
  min = 12,
  max = 40,
  children,
}: {
  as?: ElementType;
  className?: string;
  min?: number;
  max?: number;
  children: ReactNode;
}) {
  const box = useRef<HTMLElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const boxEl = box.current;
    const textEl = text.current;
    if (!boxEl || !textEl) return;
    const phone = window.matchMedia('(max-width: 767px)');

    const fit = () => {
      if (!phone.matches) {
        textEl.style.fontSize = '';
        return;
      }
      textEl.style.fontSize = '100px'; // measure at a known size, then scale to the available width
      const natural = textEl.getBoundingClientRect().width;
      if (natural <= 0) return;
      const size = Math.max(min, Math.min(max, (100 * boxEl.clientWidth) / natural));
      textEl.style.fontSize = `${size}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(boxEl);
    phone.addEventListener('change', fit);
    void document.fonts?.ready.then(fit); // the web font changes the text width once it loads
    return () => {
      observer.disconnect();
      phone.removeEventListener('change', fit);
    };
  }, [min, max, children]);

  return (
    <Tag ref={box} className={className}>
      <span ref={text} className="max-md:inline-block max-md:whitespace-nowrap">
        {children}
      </span>
    </Tag>
  );
}
