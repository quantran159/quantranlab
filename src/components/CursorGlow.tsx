"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let frame = 0;
    let x = -100;
    let y = -100;

    const render = () => {
      glow.style.transform = `translate3d(${x - 68}px, ${y - 68}px, 0)`;
      frame = 0;
    };

    const showAt = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      glow.dataset.visible = "true";
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const hide = () => {
      glow.dataset.visible = "false";
    };

    const handlePointerOut = (event: MouseEvent) => {
      if (!event.relatedTarget) hide();
    };

    window.addEventListener("mousemove", showAt, { passive: true });
    window.addEventListener("mouseout", handlePointerOut);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("mousemove", showAt);
      window.removeEventListener("mouseout", handlePointerOut);
      window.removeEventListener("blur", hide);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={glowRef} className="cursor-glow" aria-hidden="true">
      <span className="cursor-glow-flame cursor-glow-flame-one" />
      <span className="cursor-glow-flame cursor-glow-flame-two" />
    </div>
  );
}