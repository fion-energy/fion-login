import { clsx } from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";

export enum ButtonSizes {
  Small = "Small",
  Large = "Large",
}

export enum ButtonVariants {
  Primary = "Primary",
  Secondary = "Secondary",
  Destructive = "Destructive",
}

export enum ButtonColors {
  Neutral = "Neutral",
  Primary = "Primary",
  Warn = "Warn",
}

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  size?: ButtonSizes;
  variant?: ButtonVariants;
  color?: ButtonColors;
};

// eslint-disable-next-line react/display-name
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = ButtonVariants.Primary,
      size = ButtonSizes.Small,
      color = ButtonColors.Primary,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        type="button"
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-none select-none",
          "focus-visible:ring-2 focus-visible:ring-gray-950/20 focus-visible:ring-offset-1",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "px-4 h-8 gap-1.5": size === ButtonSizes.Small,
            "px-6 h-9 gap-2": size === ButtonSizes.Large,
          },
          {
            "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200":
              variant === ButtonVariants.Primary && color !== ButtonColors.Warn,
            "bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700":
              variant === ButtonVariants.Primary && color === ButtonColors.Warn,
            "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800":
              variant === ButtonVariants.Secondary,
            "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900":
              variant === ButtonVariants.Destructive,
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
