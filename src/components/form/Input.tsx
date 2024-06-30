"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues,
  FieldError,
} from "react-hook-form";
import RequiredAsterisk from "./RequiredAsterisk";

export interface InputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label?: string;
  register: UseFormRegister<T>;
  className?: string;
  error?: FieldError;
  validation?: RegisterOptions<T>;
  required?: boolean;
}

const Input = <T extends FieldValues>({
  name,
  register,
  className = "",
  error,
  label,
  validation,
  required,
  ...props
}: InputProps<T>) => {
  const t = useTranslations("ValidationMessages");
  const errorClassses = error ? "border-error" : "border-gray-600";

  const WITHIN = "top-4 -z-20 px-4";
  const FLOAT = "px-2 -top-1 z-20 scale-90";

  const [labelClasses, setLabelClasses] = useState(WITHIN);

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`${labelClasses} absolute select-none text-xs font-bold uppercase tracking-wide text-gray-500 transition-all duration-300`}
      >
        {label} {required ? <RequiredAsterisk /> : null}
      </label>
      <input
        {...register(name, validation)}
        id={name}
        aria-invalid={error ? "true" : "false"}
        onFocus={() => {
          setLabelClasses(FLOAT);
        }}
        onBlur={(event) => {
          if (event.target.value.trim().length === 0) {
            setLabelClasses(WITHIN);
          }
        }}
        className={`${className} ${errorClassses} mt-1 w-full border-b-[1px] bg-transparent px-3 py-2 focus:border-gray-400 focus:outline-none`}
        {...props}
      />
      {error ? (
        <span role={"alert"} className="text-sm text-error md:text-base">
          {error?.type === "required" ? t("Required") : null}
          {error?.type === "pattern" ? t("E-mail") : null}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
