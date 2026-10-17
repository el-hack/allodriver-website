"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  id: string;
  titleId: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}

/** Native dialog owns Escape and focus containment. Effects are cleaned up on unmount. */
export function Modal({ id, titleId, closeLabel, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const trigger = document.activeElement;
    if (!dialog) return;
    dialog.showModal();
    document.body.classList.add("modal-open");
    return () => {
      dialog.close();
      if (!document.querySelector("dialog[open]")) document.body.classList.remove("modal-open");
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus();
    };
  }, []);

  if (typeof document === "undefined") return null;
  return createPortal(
    <dialog
      ref={ref}
      id={id}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          onClose();
      }}
    >
      <button className="dialog-close" type="button" aria-label={closeLabel} onClick={onClose}>
        ×
      </button>
      {children}
    </dialog>,
    document.body,
  );
}
