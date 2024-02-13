import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "../../../ui/input";
import { FormData } from "../signin";

interface EmailInputProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors;
}
const EmailInput = ({ register, errors }: EmailInputProps) => {
  const pattern = {
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: "Invalid email address",
  };
  return (
    <div className={`relative w-full ${errors.email ? "" : "mb-3"}`}>
      <Input
        type="email"
        placeholder="Johndoe@gmail.com"
        name="email"
        error={errors.email}
        register={register}
        required="Email is required"
        pattern={pattern}
        label="Email address"
      />
    </div>
  );
};

export default EmailInput;
