import { cn } from "@/lib/utils";

interface ConteinerProps {
  className?: string;
  children?: React.ReactNode;
}

export const Container = ({ className, children }: ConteinerProps) => {
  return (
    <div className={cn("mx-auto max-w-[1280px]", className)}>{children}</div>
  );
};
