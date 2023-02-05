import React, { DetailedHTMLProps, FC } from "react";

type AlertProps = {
  fullWidth?: boolean;
  type?: "info";
  label: string;
  subLabel: string;
  variant?: "primary" | "secondary" | "tertiary";
  showLearnMore?: boolean;
} & DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Alert: FC<AlertProps> = ({
  fullWidth = false,
  className,
  type = "info",
  label,
  subLabel,
  showLearnMore = false,
  variant = "primary",
  ...divProps
}) => {
  const fullWidthStyle = fullWidth ? "w-full" : "";
  const getVariant = () => {
    switch (variant) {
      case "primary": {
        return "bg-brand-200 border-brand-200 text-black";
      }
      case "secondary": {
        return "text-white bg-transparent hover:bg-grey-100 active:bg-transparent border border-brand-200";
      }
      case "tertiary": {
        return "text-black bg-grey-300 hover:bg-grey-400 active:bg-grey-500";
      }
      default: {
        return "text-white bg-brand-600 hover:bg-brand-500 active:bg-brand-600 ";
      }
    }
  };

  return (
    <div
      {...divProps}
      className={`flex flex-row gap-4 font-medium font-raleway p-4 items-center justify-between select-none focus:outline-none text-sm rounded-lg ${fullWidthStyle} border-0 bg-blue-100 ${getVariant()} ${className}`}>
      <div className="flex gap-4">
        <div className="text-brand-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-grey-700">{label}</div>
          <div className="text-xs text-grey-500">{subLabel}</div>
        </div>
      </div>
      <div className="flex items-center gap-2"></div>
    </div>
  );
};

export default Alert;
