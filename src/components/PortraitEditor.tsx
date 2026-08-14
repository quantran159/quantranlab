"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Position = { x: number; y: number };

const STORAGE_KEY = "quantranlab-about-portrait-position";
const DEFAULT_POSITION: Position = { x: 50, y: 50 };

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function PortraitEditor() {
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; position: Position } | null>(null);
  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);
  const [draftPosition, setDraftPosition] = useState<Position>(DEFAULT_POSITION);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const savedPosition = JSON.parse(saved) as Position;
          if (typeof savedPosition.x === "number" && typeof savedPosition.y === "number") {
            setPosition(savedPosition);
            setDraftPosition(savedPosition);
          }
        } catch {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
      setIsEditing(new URLSearchParams(window.location.search).get("edit") === "portrait");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isEditing || !frameRef.current) return;
    frameRef.current.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, position: draftPosition };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const deltaX = ((event.clientX - dragRef.current.x) / rect.width) * 100;
    const deltaY = ((event.clientY - dragRef.current.y) / rect.height) * 100;
    setDraftPosition({
      x: clamp(dragRef.current.position.x - deltaX),
      y: clamp(dragRef.current.position.y - deltaY),
    });
  };

  const stopDragging = () => {
    dragRef.current = null;
  };

  const savePosition = () => {
    setPosition(draftPosition);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draftPosition));
    setIsEditing(false);
  };

  const shownPosition = isEditing ? draftPosition : position;

  return (
    <div className={`portrait-editor${isEditing ? " portrait-editor-active" : ""}`}>
      <div
        ref={frameRef}
        className="portrait-placeholder"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        style={{ cursor: isEditing ? "grab" : "default", touchAction: isEditing ? "none" : "auto" }}
      >
        <Image
          src="/about-profile.jpg"
          alt="Ảnh chân dung của Trần Mạnh Quân"
          fill
          sizes="(max-width: 900px) 90vw, 32vw"
          className="about-portrait-image"
          draggable={false}
          style={{ objectPosition: `${shownPosition.x}% ${shownPosition.y}%` }}
        />
      </div>
      {isEditing && <div className="portrait-editor-controls"><span>Kéo ảnh để căn vị trí</span><button type="button" onClick={savePosition}>Lưu vị trí</button></div>}
    </div>
  );
}

