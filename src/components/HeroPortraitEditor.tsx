"use client";

import { useEffect, useRef, useState } from "react";

type Offset = { x: number; y: number };

const STORAGE_KEY = "quantranlab-hero-portrait-position";
const DEFAULT_OFFSET: Offset = { x: 0, y: 0 };
const MAX_OFFSET = 110;
const VIEWBOX = { width: 560, height: 510 };

const shapePath = "M146 24C78 31 28 81 34 147C39 199 73 223 113 246C151 269 164 296 143 327C122 357 73 372 50 414C20 470 77 494 154 494C242 494 304 469 357 435C411 401 452 365 491 327C544 275 543 210 505 155C472 107 419 81 364 72C299 61 243 16 146 24Z";

function clamp(value: number) {
  return Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, value));
}

export function HeroPortraitEditor({ onError }: { onError: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{ pointerId: number; x: number; y: number; offset: Offset } | null>(null);
  const [offset, setOffset] = useState<Offset>(DEFAULT_OFFSET);
  const [draftOffset, setDraftOffset] = useState<Offset>(DEFAULT_OFFSET);
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, offset: draftOffset };
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const deltaX = ((event.clientX - dragRef.current.x) / rect.width) * VIEWBOX.width;
    const deltaY = ((event.clientY - dragRef.current.y) / rect.height) * VIEWBOX.height;
    setDraftOffset({
      x: clamp(dragRef.current.offset.x + deltaX),
      y: clamp(dragRef.current.offset.y + deltaY),
    });
  };

  const handlePointerUp = (event: React.PointerEvent<SVGSVGElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    setIsDragging(false);
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
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={() => { dragRef.current = null; setIsDragging(false); }}
        style={{ cursor: isEditing ? (isDragging ? "grabbing" : "grab") : "default", touchAction: isEditing ? "none" : "auto" }}
      >
        <defs>
          <linearGradient id="profile-shape-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="0.55" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#9fd7ff" stopOpacity="0.1" />
          </linearGradient>
          <clipPath id="profile-shape-clip" clipPathUnits="userSpaceOnUse">
            <path d={shapePath} />
          </clipPath>
        </defs>
        <g clipPath="url(#profile-shape-clip)">
          <image
            href="/profile.jpg"
            x="0"
            y="0"
            width={VIEWBOX.width}
            height={VIEWBOX.height}
            preserveAspectRatio="xMidYMid slice"
            transform={`translate(${shownOffset.x} ${shownOffset.y}) translate(280 255) scale(1.12) translate(-280 -255)`}
            onError={onError}
          />
          <rect width={VIEWBOX.width} height={VIEWBOX.height} fill="url(#profile-shape-sheen)" />
        </g>
        <path d={shapePath} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      {isEditing && <div className="profile-editor-controls"><span>Kéo ảnh profile để căn vị trí</span><button type="button" onClick={savePosition}>Lưu vị trí</button></div>}
    </>
  );
}

