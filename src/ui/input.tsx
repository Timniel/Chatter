import React, { ChangeEvent, ReactNode, useState } from "react";

import { UseFormRegister } from "react-hook-form";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  icon?: ReactNode; // The icon to be displayed
  iconPosition?: "left" | "right"; // Position of the icon
  name?: string; // Name of the input for form submission and hook form registration
  register?: UseFormRegister<any>; // React Hook Form register function
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  validate?: (value: string) => string | boolean;
  error?: { message?: string }; // React Hook Form errors object
  msgTooltip?: boolean; // Show message as a tooltip
  multiple?: boolean; // If true, make it a multi select instead of single select. Only works with type
  id?: string;
  label?: string;
  alternateIcon?: ReactNode;
  onIconClick?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  onFocus,
  readOnly = false,
  icon,
  iconPosition = "left", // default icon position
  name = "",
  register,
  required = "",
  error,
  pattern,
  minLength,
  validate,
  defaultValue,
  multiple,
  id,
  label,
  alternateIcon,
  onIconClick,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleIconClick = () => {
    if (onIconClick) {
      setShowPassword(!showPassword);
    }
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full space-y-2 ">
      {" "}
      {label && <p className="text-sm font-light text-white ">{label}</p>}
      <div className={`relative w-full `}>
        {icon && iconPosition === "left" && (
          <button
            type="button"
            onClick={handleIconClick}
            className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none  ${
              error && error.message ? "!-top-4 " : "top-0"
            } `}
          >
            {icon}
          </button>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          id={id}
          onChange={onChange}
          readOnly={readOnly}
          multiple={multiple}
          {...(register ?? (() => ({})))(name, {
            required,
            pattern,
            minLength,
            validate,
          })}
          className={`bg-transparent  border ${
            error
              ? "border-danger-500"
              : "border-[#CED4DA] placeholder:text-black/80  font-light "
          }  rounded-md  h-10 w-full text-xs px-4 py-5 ${
            icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""
          } ${className}`}
          style={{
            transition: "outline-offset 0.2s ease, box-shadow 0.2s ease",
            outline: "2px solid transparent",
            outlineOffset: "-2px",
          }}
          onFocus={(e) => {
            e.target.style.outlineOffset = "0px";
            e.target.style.boxShadow = `0 0 0 1px ${
              error ? "#ff0000" : "#6699ff"
            }`;
            if (onFocus) onFocus(e);
          }}
          onBlur={(e) => {
            e.target.style.outlineOffset = "-2px";
            e.target.style.boxShadow = "none";
          }}
        />
        {icon && iconPosition === "right" && (
          <button
            className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
              error && "-top-5"
            }`}
            onClick={handleIconClick}
            type="button"
          >
            {showPassword ? alternateIcon : icon}
          </button>
        )}
        {error && error.message && (
          <div
            className={`${
              type === "hidden" ? "" : "mt-[0.1rem]"
            } text-xs italic text-red-500  text-end`}
          >
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};
