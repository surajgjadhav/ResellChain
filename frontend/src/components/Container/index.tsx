import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="px-4 xl:px-6 2xl:px-4 mx-auto max-w-screen-lg py-8">
      <div className="grid grid-cols-12 gap-4">{children}</div>
    </div>
  );
};
export default Container;
