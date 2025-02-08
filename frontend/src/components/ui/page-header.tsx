import { cn } from "@/lib/utils";

export const PageHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("col-span-full", className)} {...props}>
      <div className="flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">
        {children}
      </div>
    </div>
  );
};

export const PageHeaderHeading = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1
      className={cn(
        "text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]",
        className
      )}
      {...props}
    />
  );
};

export const PageHeaderDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={cn(
        "text-balance text-lg font-light text-foreground",
        className
      )}
      {...props}
    />
  );
};
