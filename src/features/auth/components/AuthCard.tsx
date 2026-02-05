import { PropsWithChildren } from "react";
import { Card, CardContent } from "@/components/ui/card";

type AuthCardProps = PropsWithChildren<{
  title: string;
}>;

export const AuthCard: React.FC<AuthCardProps> = ({ title, children }) => {
  return (
    <Card className="w-full max-w-90 rounded-xl border border-border shadow-sm">
      <CardContent className="p-6">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="mt-4">{children}</div>
      </CardContent>
    </Card>
  );
};
