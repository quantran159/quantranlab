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
      glow.style.transform = `translate3d(${x - 38}px, ${y - 38}px, 0)`;
      frame = 0;
    };

    const showAt = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      glow.dataset.visible = "true";
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const hide = () => {
      glow.dataset.visible = "false";
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    document.addEventListener("pointermove", showAt, { passive: true });
    document.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", hide);

    return () => {
      document.removeEventListener("pointermove", showAt);
      document.removeEventListener("pointerout", handlePointerOut);
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

