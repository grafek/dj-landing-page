export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelname?: string;
  className?: string;
  required?: boolean;
}

const TextArea = ({
  name,
  className,
  labelname,
  required,
  ...props
}: TextAreaProps) => {
  const requiredAsterisk = required ? (
    <span className="font-semibold text-red-primary">*</span>
  ) : null;

  return (
    <>
      <label htmlFor={name}>
        {labelname} {requiredAsterisk}
      </label>
      <textarea
        id={name}
        className={`${className} mt-1 max-h-[60px] min-h-[40px] w-full rounded-md bg-transparent px-3 py-2 outline outline-1 outline-gray-500 focus:outline-gray-300 sm:h-[250px] sm:max-h-[150px] md:max-h-[420px] xl:h-[380px]`}
        {...props}
      />
    </>
  );
};

export default TextArea;
