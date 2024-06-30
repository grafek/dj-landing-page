"use client";
import useClickOutside from "@/src/hooks/useClickOutside";
import { useState, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DropdownProps<T> = {
  options: T[] | readonly T[];
  selectedOption: T;
  onSelect: (option: T) => void;
  renderOption: (option: T) => ReactNode;
  renderSelected: (selectedOption: T) => ReactNode;
};

const Dropdown = <T extends {}>({
  options,
  selectedOption,
  onSelect,
  renderOption,
  renderSelected,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => setIsOpen(false);

  const handleOptionClick = (option: T) => {
    onSelect(option);
    setIsOpen(false);
  };

  useClickOutside(dropdownRef, closeDropdown);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center space-x-1 text-sm focus:outline-none"
        onClick={handleDropdownToggle}
      >
        {renderSelected(selectedOption)}
        <svg
          className={`ml-1 h-3 w-3 transform fill-current transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-12 rounded-md bg-slate-950 shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div className="py-1">
              {options.map((option, index) => (
                <motion.button
                  key={String(option)}
                  type="button"
                  className="flex w-full items-center justify-start px-4 py-2 text-left hover:bg-slate-900 focus:outline-none"
                  onClick={() => handleOptionClick(option)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {renderOption(option)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
