import { useRef, useState } from "react";

export function useQueryBuffer(timeoutMs = 400) {
  const [activeQuery, setActiveQuery] = useState("");
  const [buffer, setBuffer] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function reset() {
    setBuffer("");
    setActiveQuery("");
  }

  function handleKey(key: string) {
    if (/^[a-z0-9+ ]$/i.test(key)) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const next = buffer + key.toLowerCase();
      setBuffer(next);
      setActiveQuery(next);
      timeoutRef.current = setTimeout(() => setBuffer(""), timeoutMs);
    }
    if (key === "Backspace") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const next = buffer.slice(0, -1);
      setBuffer(next);
      setActiveQuery(next);
      timeoutRef.current = setTimeout(() => setBuffer(""), timeoutMs);
    }
  }

  return { activeQuery, buffer, handleKey, reset };
}
