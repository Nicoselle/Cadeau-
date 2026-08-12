import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer select-none items-center gap-2 text-sm",
          className,
        )}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="h-4 w-4 shrink-0 rounded border-border text-primary accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...props}
        />
        {label ? <span>{label}</span> : null}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
