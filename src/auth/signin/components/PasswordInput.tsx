import { FieldErrors, UseFormRegister } from "react-hook-form";
import Icon from "../../../ui/icon";
import { Input } from "../../../ui/input";
import { FormData } from "../signin";

interface PasswordInputProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors;
}
const PasswordInput = ({ register, errors }: PasswordInputProps) => {
  const minLength = {
    value: 7,
    message: "Password must be more than 6 characters",
  };
  return (
    <div className={`relative w-full ${errors.password ? "" : "mb-3"}`}>
      {" "}
      <Input
        type="password"
        placeholder="*******"
        label="Password"
        name="password"
        error={errors.password}
        register={register}
        required="Passwword is required"
        minLength={minLength}
        icon={<Icon icon="ph:eye" className="w-4 h-4 text-black" />}
        alternateIcon={
          <Icon icon="mingcute:eye-close-line" className="w-4 h-4 text-black" />
        }
        onIconClick
        iconPosition="right"
      />
    </div>
  );
};

export default PasswordInput;
