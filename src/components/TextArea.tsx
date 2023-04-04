import { useState } from "react";
import {
  type UseFormRegister,
  type RegisterOptions,
  type Path,
  type FieldValues,
  type FieldError,
} from "react-hook-form";

export interface TextAreaProps<T extends FieldValues>
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: Path<T>;
  labelname?: string;
  register: UseFormRegister<T>;
  className?: string;
  error?: FieldError;
  validation?: RegisterOptions<T>;
  required?: boolean;
}

const TextArea = <T extends FieldValues>({
  name,
  register,
  validation,
  className,
  error,
  labelname,
  required,
  ...props
}: TextAreaProps<T>) => {
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
      <textarea
        {...register(name, validation)}
        id={name}
        onFocus={() => {
          setLabelClasses(FLOAT);
        }}
        onBlur={(event) => {
          if (event.target.value.trim().length === 0) {
            setLabelClasses(WITHIN);
          }
        }}
        aria-invalid={error ? "true" : "false"}
        className={`${className} ${errorClassses} mt-1 h-24 max-h-[120px] w-full border-b-[1px] bg-transparent px-3 py-2 focus:border-gray-400 focus:outline-none sm:h-[250px] sm:max-h-[150px] md:max-h-[420px] xl:h-[380px]`}
        {...props}
      />
      {error ? (
        <span role={"alert"} className="text-sm text-red-primary md:text-base">
          {error?.type == "required" ? "Required" : null}
        </span>
      ) : null}
    </>
  );
};

export default TextArea;
