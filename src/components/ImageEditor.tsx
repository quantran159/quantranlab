"use client";
/* eslint-disable @next/next/no-img-element */

import { ChangeEvent, DragEvent, MouseEvent, PointerEvent, useEffect, useRef, useState } from "react";

type Variant = "hero" | "about";
type ImageState = { src: string; x: number; y: number; scale: number; rotation: number; format?: "percent" };

const shapePath = "M146 24C78 31 28 81 34 147C39 199 73 223 113 246C151 269 164 296 143 327C122 357 73 372 50 414C20 470 77 494 154 494C242 494 304 469 357 435C411 401 452 365 491 327C544 275 543 210 505 155C472 107 419 81 364 72C299 61 243 16 146 24Z";

const defaults: Record<Variant, ImageState> = {
  hero: { src: "/profile.jpg", x: 0, y: 0, scale: 1, rotation: 0, format: "percent" },
  about: { src: "/about-profile.jpg", x: 0, y: 0, scale: 1.05, rotation: 0, format: "percent" },
};

const storageKeys: Record<Variant, string> = {
  hero: "quantranlab-hero-image-editor",
  about: "quantranlab-about-image-editor",
};

export function ImageEditor({ variant, onError }: { variant: Variant; onError?: () => void }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; clientX: number; clientY: number; state: ImageState } | null>(null);
  const [saved, setSaved] = useState(defaults[variant]);
  const [draft, setDraft] = useState(defaults[variant]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem(storageKeys[variant]);
      const legacyKey = variant === "hero" ? "quantranlab-hero-portrait-position" : "quantranlab-about-portrait-position";
      const legacy = window.localStorage.getItem(legacyKey);
      try {
        const parsed = stored ? JSON.parse(stored) as Partial<ImageState> : legacy ? JSON.parse(legacy) as Partial<ImageState> : null;
        if (parsed && typeof parsed.x === "number" && typeof parsed.y === "number") {
          const needsHeroConversion = variant === "hero" && parsed.format !== "percent";
          const next = {
            ...defaults[variant],
            ...parsed,
            format: "percent" as const,
            x: needsHeroConversion ? parsed.x / 5.6 : variant === "about" && !stored ? parsed.x - 50 : parsed.x,
            y: needsHeroConversion ? parsed.y / 5.1 : variant === "about" && !stored ? parsed.y - 50 : parsed.y,
          };
          setSaved(next);
          setDraft(next);
        }
      } catch {
        window.localStorage.removeItem(storageKeys[variant]);
      }
      setIsEditing(new URLSearchParams(window.location.search).get(`edit-${variant}`) === "true");
    }, 0);
    return () => window.clearTimeout(timer);
  }, [variant]);

  const startEditing = () => {
    setDraft(saved);
    setError("");
    setIsEditing(true);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!isEditing || !frameRef.current) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, clientX: event.clientX, clientY: event.clientY, state: draft };
    setIsDragging(true);
  };

  const updateDrag = (clientX: number, clientY: number) => {
    if (!dragRef.current || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const unitX = 100 / rect.width;
    const unitY = 100 / rect.height;
    setDraft((current) => ({
      ...current,
      x: dragRef.current!.state.x + (clientX - dragRef.current!.clientX) * unitX,
      y: dragRef.current!.state.y + (clientY - dragRef.current!.clientY) * unitY,
    }));
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
    updateDrag(event.clientX, event.clientY);
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (!isEditing || dragRef.current) return;
    event.preventDefault();
    dragRef.current = { pointerId: -1, clientX: event.clientX, clientY: event.clientY, state: draft };
    setIsDragging(true);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== -1) return;
    updateDrag(event.clientX, event.clientY);
  };

  const handleMouseUp = () => {
    if (dragRef.current?.pointerId !== -1) return;
    dragRef.current = null;
    setIsDragging(false);
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    setIsDragging(false);
  };

  const readFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Vui lòng chọn file ảnh JPG, PNG hoặc WebP.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError("Ảnh nên nhỏ hơn 4MB để có thể lưu trên trình duyệt.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDraft((current) => ({ ...current, src: String(reader.result) }));
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) readFile(file);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isEditing) return;
    const file = event.dataTransfer.files?.[0];
    if (file) readFile(file);
  };

  const reset = () => setDraft({ ...defaults[variant] });
  const center = () => setDraft((current) => ({ ...current, x: 0, y: 0 }));
  const changeZoom = (value: string) => {
    setDraft((current) => ({ ...current, scale: clampZoom(Number(value)) }));
  };

  const clampZoom = (value: number) => Math.max(0.75, Math.min(3, value));
  const stopPanelEvent = (event: PointerEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const save = () => {
    try {
      window.localStorage.setItem(storageKeys[variant], JSON.stringify(draft));
      setSaved(draft);
      setIsEditing(false);
      setError("");
    } catch {
      setError("Không thể lưu ảnh này. Hãy chọn ảnh nhỏ hơn 4MB.");
    }
  };

  const cancel = () => {
    setDraft(saved);
    setIsEditing(false);
    setError("");
  };

  const shown = isEditing ? draft : saved;
  const imageTransform = `translate(${shown.x}%, ${shown.y}%) scale(${shown.scale}) rotate(${shown.rotation}deg)`;

  return (
    <div className={`image-editor image-editor-${variant}`}>
      <div
        ref={frameRef}
        className={`image-editor-frame image-editor-frame-${variant}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onLostPointerCapture={() => { dragRef.current = null; setIsDragging(false); }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          if (dragRef.current?.pointerId === -1) handleMouseUp();
        }}
        onDragOver={(event) => { if (isEditing) event.preventDefault(); }}
        onDrop={handleDrop}
        style={{ cursor: isEditing ? (isDragging ? "grabbing" : "grab") : "default", touchAction: isEditing ? "none" : "auto" }}
      >
        {variant === "hero" ? (
          <svg className="profile-shape" viewBox="0 0 560 510" role="img" aria-label="Ảnh cá nhân của Trần Mạnh Quân">
            <defs>
              <linearGradient id="profile-shape-sheen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
                <stop offset="0.55" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="1" stopColor="#9fd7ff" stopOpacity="0.1" />
              </linearGradient>
              <clipPath id="profile-shape-clip" clipPathUnits="userSpaceOnUse"><path d={shapePath} /></clipPath>
            </defs>
            <g clipPath="url(#profile-shape-clip)">
              <foreignObject x="0" y="0" width="560" height="510">
                <div className="image-editor-hero-image-wrap">
                  <img
                    src={shown.src}
                    alt="Ảnh cá nhân của Trần Mạnh Quân"
                    className="image-editor-hero-image"
                    draggable={false}
                    onError={onError}
                    onPointerDown={(event) => {
                      event.stopPropagation();
                      handlePointerDown(event as unknown as PointerEvent<HTMLDivElement>);
                    }}
                    onPointerMove={(event) => handlePointerMove(event as unknown as PointerEvent<HTMLDivElement>)}
                    onPointerUp={(event) => stopDragging(event as unknown as PointerEvent<HTMLDivElement>)}
                    onPointerCancel={(event) => stopDragging(event as unknown as PointerEvent<HTMLDivElement>)}
                    onLostPointerCapture={() => {
                      dragRef.current = null;
                      setIsDragging(false);
                    }}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                      handleMouseDown(event as unknown as MouseEvent<HTMLDivElement>);
                    }}
                    onMouseMove={(event) => handleMouseMove(event as unknown as MouseEvent<HTMLDivElement>)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={() => {
                      if (dragRef.current?.pointerId === -1) handleMouseUp();
                    }}
                    style={{ transform: imageTransform }}
                  />
                </div>
              </foreignObject>
              <rect width="560" height="510" fill="url(#profile-shape-sheen)" />
            </g>
            <path d={shapePath} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        ) : (
          <img
            src={shown.src}
            alt="Ảnh chân dung của Trần Mạnh Quân"
            className="image-editor-about-image"
            draggable={false}
            onError={onError}
            onPointerDown={(event) => {
              event.stopPropagation();
              handlePointerDown(event as unknown as PointerEvent<HTMLDivElement>);
            }}
            onPointerMove={(event) => handlePointerMove(event as unknown as PointerEvent<HTMLDivElement>)}
            onPointerUp={(event) => stopDragging(event as unknown as PointerEvent<HTMLDivElement>)}
            onPointerCancel={(event) => stopDragging(event as unknown as PointerEvent<HTMLDivElement>)}
            onLostPointerCapture={() => {
              dragRef.current = null;
              setIsDragging(false);
            }}
            onMouseDown={(event) => {
              event.stopPropagation();
              handleMouseDown(event as unknown as MouseEvent<HTMLDivElement>);
            }}
            onMouseMove={(event) => handleMouseMove(event as unknown as MouseEvent<HTMLDivElement>)}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              if (dragRef.current?.pointerId === -1) handleMouseUp();
            }}
            style={{ transform: imageTransform }}
          />
        )}
      </div>
      {isEditing ? (
        <div
          className="image-editor-panel"
          onPointerDown={stopPanelEvent}
          onPointerMove={stopPanelEvent}
          onPointerUp={stopPanelEvent}
          onMouseDown={stopPanelEvent}
          onMouseMove={stopPanelEvent}
          onMouseUp={stopPanelEvent}
          onClick={stopPanelEvent}
        >
          <label className="image-editor-upload">Thay ảnh<input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} /></label>
          <label className="image-editor-zoom">Zoom <button type="button" aria-label="Thu nhỏ ảnh" onClick={() => changeZoom(String(draft.scale - 0.1))}>−</button><input type="range" min="0.75" max="3" step="0.01" value={draft.scale} onInput={(event) => changeZoom(event.currentTarget.value)} onChange={(event) => changeZoom(event.currentTarget.value)} /><button type="button" aria-label="Phóng to ảnh" onClick={() => changeZoom(String(draft.scale + 0.1))}>+</button></label>
          <button type="button" onClick={() => setDraft({ ...draft, rotation: draft.rotation - 5 })}>↺</button>
          <button type="button" onClick={() => setDraft({ ...draft, rotation: draft.rotation + 5 })}>↻</button>
          <button type="button" onClick={center}>Căn giữa</button>
          <button type="button" onClick={reset}>Reset</button>
          <button type="button" onClick={cancel}>Hủy</button>
          <button type="button" className="image-editor-save" onClick={save}>Lưu</button>
          {error && <small>{error}</small>}
        </div>
      ) : (
        <button type="button" className="profile-editor-open" onClick={startEditing}>Chỉnh ảnh</button>
      )}
    </div>
  );
}

