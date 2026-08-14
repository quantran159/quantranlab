"use client";

import { useEffect, useRef, useState } from "react";

type Offset = { x: number; y: number };

const STORAGE_KEY = "quantranlab-hero-portrait-position";
const DEFAULT_OFFSET: Offset = { x: 0, y: 0 };
const MAX_OFFSET = 55;

function clamp(value: number) {
  return Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, value));
}

export function HeroPortraitEditor({ onError }: { onError: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{ x: number; y: number; offset: Offset } | null>(null);
  const [offset, setOffset] = useState<Offset>(DEFAULT_OFFSET);
  const [draftOffset, setDraftOffset] = useState<Offset>(DEFAULT_OFFSET);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const savedOffset = JSON.parse(saved) as Offset;
          if (typeof savedOffset.x === "number" && typeof savedOffset.y === "number") {
            setOffset(savedOffset);
            setDraftOffset(savedOffset);
          }
        } catch {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
      setIsEditing(new URLSearchParams(window.location.search).get("edit") === "hero-portrait");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!isEditing || !svgRef.current) return;
    svgRef.current.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, offset: draftOffset };
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const deltaX = ((event.clientX - dragRef.current.x) / rect.width) * 560;
    const deltaY = ((event.clientY - dragRef.current.y) / rect.height) * 510;
    setDraftOffset({
      x: clamp(dragRef.current.offset.x + deltaX),
      y: clamp(dragRef.current.offset.y + deltaY),
    });
  };

  const savePosition = () => {
    setOffset(draftOffset);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draftOffset));
    setIsEditing(false);
  };

  const shownOffset = isEditing ? draftOffset : offset;

  return (
    <>
      <svg
        ref={svgRef}
        className="profile-shape"
        viewBox="0 0 560 510"
        role="img"
        aria-label="Ảnh cá nhân của Trần Mạnh Quân"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={() => { dragRef.current = null; }}
        onPointerCancel={() => { dragRef.current = null; }}
        style={{ cursor: isEditing ? "grab" : "default", touchAction: isEditing ? "none" : "auto" }}
      >
        <defs>
          <clipPath id="profile-shape-clip" clipPathUnits="userSpaceOnUse">
            <ellipse cx="342" cy="110" rx="190" ry="75" transform="rotate(-8 342 110)" />
            <ellipse cx="325" cy="240" rx="235" ry="95" transform="rotate(-8 325 240)" />
            <ellipse cx="300" cy="382" rx="140" ry="52.5" transform="rotate(-8 300 382)" />
          </clipPath>
        </defs>
        <g clipPath="url(#profile-shape-clip)">
          <image
            href="/profile.jpg"
            x="0"
            y="0"
            width="560"
            height="510"
            preserveAspectRatio="xMidYMid slice"
            transform={`translate(${shownOffset.x} ${shownOffset.y}) translate(280 255) scale(1.18) translate(-280 -255)`}
            onError={onError}
          />
        </g>
      </svg>
      {isEditing && <div className="profile-editor-controls"><span>Kéo ảnh profile để căn vị trí</span><button type="button" onClick={savePosition}>Lưu vị trí</button></div>}
    </>
  );
}

