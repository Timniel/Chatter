import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/toast";
import { useNavigate } from "react-router-dom";
import { setLoading, signUp } from "../authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { RootState } from "../../store/rootReducer";
import client from "../../services/client";

import PersonalInfoFields from "./components/PersonalInfoFields";
import RoleSelector from "./components/RoleSelector";
import EmailAndPasswordFields from "./components/EmailAndPasswordFields";
import SubmitButton from "./components/SubmitButton";
import { Icon } from "@iconify/react/dist/iconify.js";

export interface FormData {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const { status } = useSelector((state: RootState) => state.auth);
  const { showToast } = useToast();
  const isLoading = status === "loading";
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    dispatch(setLoading(true));

    const submissionData = {
      ...data,
      email: data.email.toLowerCase(),
    };

    try {
      const emailExists = await doesEmailExist(submissionData.email);
      if (emailExists) {
        dispatch(setLoading(false));
        showToast("Email already exists", "warning");

        return;
      }
    } catch (error) {
      dispatch(setLoading(false));
      showToast("Failed to sign up. Please try again.", "danger");
      return;
    }

    try {
      const resultAction = await dispatch(signUp(submissionData));
      unwrapResult(resultAction);
      showToast("Account created successfully!", "success");
      setTimeout(() => {
        navigate(`/get-started`);
      }, 1000);
    } catch (error) {
      showToast("Failed to sign up. Please try again later.", "danger");
    }
  };

  async function doesEmailExist(email: string) {
    const emailCheck = await client.collection("users").getFullList({
      filter: `email = '${email}'`,
    });

    return emailCheck.length > 0;
  }

  return (
    <div className="relative flex flex-col ">
      <h2 className="text-2xl text-center mb-7">Register as a Writer/Reader</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-10">
        <PersonalInfoFields register={register} errors={errors} />
        <RoleSelector register={register} errors={errors} />
        <EmailAndPasswordFields
          register={register}
          errors={errors}
          getValues={getValues}
        />
        <SubmitButton isLoading={isLoading} />
        <div className="flex flex-col space-y-2 text-black ">
          <button
            className="inline-flex items-center justify-center px-4 py-2 mb-1 mr-1 text-xs font-bold transition-all duration-150 ease-linear bg-white border rounded-md outline-none active:bg-blueGray-50 text-blueGray-700 focus:outline-none hover:shadow-md "
            type="button"
          >
            <Icon icon="devicon:google" className="w-4 h-4 mr-1 " />
            Sign up with Google{" "}
          </button>
          <button
            className="inline-flex items-center justify-center px-4 py-2 mb-1 mr-1 text-xs font-bold transition-all duration-150 ease-linear bg-white border rounded-md outline-none active:bg-blueGray-50 text-blueGray-700 focus:outline-none hover:shadow-md "
            type="button"
          >
            <Icon icon="devicon:linkedin" className="w-4 h-4 mr-1 " />
            Sign up with Linkedin
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
