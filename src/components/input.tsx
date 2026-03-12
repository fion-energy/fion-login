"use client";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import { ChangeEvent, DetailedHTMLProps, forwardRef, InputHTMLAttributes, ReactNode } from "react";

export type TextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string;
  suffix?: string;
  placeholder?: string;
  defaultValue?: string;
  error?: string | ReactNode;
  success?: string | ReactNode;
  disabled?: boolean;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value: ChangeEvent<HTMLInputElement>) => void;
};

// eslint-disable-next-line react/display-name
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      placeholder,
      defaultValue,
      suffix,
      required = false,
      error,
      disabled,
      success,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    return (
      <label className="relative flex flex-col gap-1.5 text-sm">
        <span className={clsx("font-medium text-gray-900 dark:text-gray-50", !!error && "text-red-600 dark:text-red-400")}>
          {label} {required && "*"}
        </span>
        <div className="relative">
          <input
            suppressHydrationWarning
            ref={ref}
            className={clsx(
              "h-9 w-full rounded-lg border bg-transparent px-3 text-sm text-gray-900 transition-colors outline-none",
              "placeholder:text-gray-400 dark:text-gray-50 dark:placeholder:text-gray-500",
              "focus-visible:border-gray-400 focus-visible:ring-2 focus-visible:ring-gray-950/10 dark:focus-visible:border-gray-500 dark:focus-visible:ring-gray-50/10",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                : "border-gray-200 dark:border-gray-800",
              suffix && "pr-24",
            )}
            defaultValue={defaultValue}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            autoComplete={props.autoComplete ?? "off"}
            onChange={(e) => onChange && onChange(e)}
            onBlur={(e) => onBlur && onBlur(e)}
            {...props}
          />

          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              @{suffix}
            </span>
          )}
        </div>

        {error && (
          <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
        )}

        {success && (
          <div className="flex flex-row items-center gap-1 text-xs text-green-600">
            <CheckCircleIcon className="h-3.5 w-3.5" />
            <span>{success}</span>
          </div>
        )}
      </label>
    );
  },
);
