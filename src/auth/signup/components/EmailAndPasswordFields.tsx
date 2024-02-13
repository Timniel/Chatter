import Icon from "../../../ui/icon";
import { Input } from "../../../ui/input";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import { FormData } from "../signup";

interface EmailAndPasswordFieldsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors;
  getValues: UseFormGetValues<FormData>;
}

const EmailAndPasswordFields = ({
  register,
  errors,
  getValues,
}: EmailAndPasswordFieldsProps) => {
  const pattern = {
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: "Invalid email address",
  };
  const minLength = {
    value: 7,
    message: "Password must be more than 6 characters",
  };

  return (
    <>
      <div className={`relative w-full ${errors.email ? "" : "mb-3"}`}>
        <Input
          type="email"
          className=""
          placeholder="Johndoe@gmail.com"
          name="email"
          error={errors.email}
          register={register}
          required="Email is required"
          pattern={pattern}
          label="Email address"
        />
      </div>
      <div className={`relative w-full ${errors.password ? "" : "mb-3"}`}>
        {" "}
        <Input
          type="password"
          placeholder="*******"
          name="password"
          label="Password"
          error={errors.password}
          register={register}
          required="Passwword is required"
          minLength={minLength}
          icon={<Icon icon="ph:eye" className="w-4 h-4 text-black" />}
          alternateIcon={
            <Icon
              icon="mingcute:eye-close-line"
              className="w-4 h-4 text-black"
            />
          }
          onIconClick
          iconPosition="right"
        />
      </div>
      <div
        className={`relative w-full ${errors.passwordConfirm ? "" : "mb-3"}`}
      >
        {" "}
        <Input
          type="password"
          placeholder="*******"
          name="passwordConfirm"
          label="Confirm password"
          error={errors.passwordConfirm}
          register={register}
          required="Confirm Passwword is required"
          validate={
            (value) =>
              value === getValues("password") || "Passwords do not match" // validate function
          }
          icon={<Icon icon="ph:eye" className="w-4 h-4 text-black" />}
          alternateIcon={
            <Icon
              icon="mingcute:eye-close-line"
              className="w-4 h-4 text-black"
            />
          }
          onIconClick
          iconPosition="right"
        />
      </div>
    </>
  );
};

export default EmailAndPasswordFields;
