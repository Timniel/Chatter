import { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "../signup";

interface RoleSelectorProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors;
}

const RoleSelector = ({ register, errors }: RoleSelectorProps) => {
  const [role, setRole] = useState("");

  const handleChange = (event: any) => {
    setRole(event.target.value);
  };
  const { onChange, ...rest } = register("role", {
    required: "Role selection is required",
  });

  return (
    <div className={`relative w-full ${errors.role ? "" : "mb-3"} space-y-2`}>
      <label className="text-sm font-light text-white">
        You are joining as?
      </label>

      <select
        id="role-select"
        value={role}
        onChange={(event) => {
          onChange(event);
          handleChange(event);
        }}
        {...rest}
        className={`bg-transparent   ${
          errors.role
            ? "outline outline-danger-500"
            : "border-[#CED4DA] border outline-none  font-light  placeholder:text-black/80 "
        }  rounded-[0.4rem]  h-10 w-full text-xs px-3 py-1  `}
      >
        <option value="">--Please choose an option--</option>
        <option value="reader">Reader</option>
        <option value="writer">Writer</option>
      </select>
    </div>
  );
};

export default RoleSelector;
