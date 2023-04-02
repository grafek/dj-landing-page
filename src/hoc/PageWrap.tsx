import { ComponentType } from "react";

const withPageWrapper = <T extends {}>(
  Component: ComponentType<T>,
  id: string,
  className?: string
) =>
  function HOC(props: T) {
    return (
      <section
        id={id}
        className={`${className} flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center pb-10`}
      >
        <Component {...props} />
      </section>
    );
  };

export default withPageWrapper;
