import { type RefObject, useEffect } from "react";

type EventListener = (event: MouseEvent | TouchEvent) => void;

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: EventListener,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};

export default useClickOutside;
