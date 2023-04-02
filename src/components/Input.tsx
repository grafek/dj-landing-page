export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelname?: string;
  className?: string;
  required?: boolean;
}

const Input = ({
  name,
  className = "",
  labelname,
  required,
  ...props
}: InputProps) => {
  const requiredAsterisk = required ? (
    <span className="font-semibold text-red-primary">*</span>
  ) : null;

  return (
    <>
      <label htmlFor={name}>
        {labelname} {requiredAsterisk}
      </label>
      <input
        id={name}
        className={`${className} mt-1 w-full rounded-md bg-transparent px-3 py-2 outline outline-1 outline-gray-500  focus:outline-gray-300`}
        {...props}
      />
    </>
  );
};

export default Input;
