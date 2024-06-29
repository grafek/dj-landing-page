type Props = {
  level: number;
  className?: string;
  children: React.ReactNode;
};

const Heading: React.FC<Props> = ({ level, className, children }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`text-2xl font-medium md:text-3xl ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;
