import { useState } from "react";
import {
  type UseFormRegister,
  type RegisterOptions,
  type Path,
  type FieldValues,
  type FieldError,
} from "react-hook-form";

export interface InputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  labelname?: string;
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
  labelname,
  validation,
  required,
  ...props
}: InputProps<T>) => {
  const errorClassses = error ? "border-red-primary" : "border-gray-600";
  const requiredAsterisk = required ? (
    <span className="font-semibold text-red-primary">*</span>
  ) : null;

  const WITHIN = "top-4 -z-20 px-4";

  const FLOAT = "px-2 -top-1 z-20 scale-90";

  const [labelClasses, setLabelClasses] = useState(WITHIN);

  return (
    <>
      <label
        htmlFor={name}
        className={`${labelClasses} absolute select-none text-xs font-bold uppercase tracking-wide text-gray-500 transition-all duration-300`}
      >
        {labelname} {requiredAsterisk}
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
        <span role={"alert"} className="text-sm text-red-primary md:text-base">
          {error?.type == "required" ? "Required" : null}
          {error?.type == "pattern" ? "Input valid e-mail" : null}
        </span>
      ) : null}
    </>
  );
};

export default Input;
