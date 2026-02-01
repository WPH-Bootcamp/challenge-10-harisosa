import { PropsWithChildren } from "react";

export const AuthContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <div className="flex min-h-screen w-full items-center justify-center px-6 py-10">
        {children}
      </div>
    </main>
  );
};
