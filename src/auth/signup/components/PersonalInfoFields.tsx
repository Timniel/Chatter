import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "../../../ui/input";
import { FormData } from "../signup";

interface RoleSelectorProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors;
}

const PersonalInfoFields = ({ register, errors }: RoleSelectorProps) => (
  <div
    className={`relative w-full ${
      errors.firstName || errors.lastName ? "" : "mb-3"
    } flex justify-between space-x-2 `}
  >
    <Input
      type="text"
      placeholder="John"
      name="firstName"
      error={errors.firstName}
      register={register}
      required="First name is required"
      label="First name"
    />{" "}
    <Input
      type="text"
      placeholder="Doe"
      name="lastName"
      error={errors.lastName}
      register={register}
      required="Last name is required"
      label="Last name"
    />{" "}
  </div>
);

export default PersonalInfoFields;
