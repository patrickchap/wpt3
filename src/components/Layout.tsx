import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        {props.children}
      </div>
    </main>
  );
};
