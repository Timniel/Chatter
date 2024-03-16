import { useForm } from "react-hook-form";

import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

import client from "./../../services/client";

import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";

import { logIn, refreshAuthData, setLoading } from "../authSlice";
import { RootState } from "../../store/rootReducer";

import { useToast } from "../../hooks/toast";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import SubmitButton from "./components/SubmitButton";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const { status } = useSelector((state: RootState) => state.auth);
  const { showToast } = useToast();
  const isLoading = status === "loading";
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    dispatch(setLoading(true));
    const submissionData = {
      ...data,
      email: data.email.toLowerCase(),
    };

    // Pre-submission Email Existence Check
    try {
      const emailExists = await doesEmailExist(submissionData.email);
      if (!emailExists) {
        dispatch(setLoading(false));
        showToast("Email doesn't exist", "warning");
        return;
      }
    } catch (error) {
      dispatch(setLoading(false));
      showToast("Failed to log in. Please try again.", "danger");
      return; // Exit early if there was an error checking the email
    }

    try {
      const resultAction = await dispatch(
        logIn({
          email: submissionData.email,
          password: submissionData.password,
        })
      );
      unwrapResult(resultAction);
      showToast(`Logged in successful!`, "success");
      setTimeout(() => {
        navigate(`/app`);
      }, 1000);
    } catch (error) {
      showToast("Incorrect password. Please try again!", "danger");
    }
  };
  async function doesEmailExist(email: string) {
    const emailCheck = await client.collection("users").getFullList({
      filter: `email = '${email}'`,
    });

    return emailCheck.length === 1;
  }
  const [authGoogle, setAuthGoogle] = useState(false);
  const loginWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAuthGoogle(true);
    client.authStore.clear();

    try {
      let w = window.open("", "_blank");
      await client.collection("users").authWithOAuth2({
        provider: "google",
        urlCallback: (url) => {
          if (w && w.location) {
            w.location.href = url;
          }
          setAuthGoogle(false);
        },
      });
      dispatch(refreshAuthData());
      navigate(`/app`);
    } catch (error) {
      showToast("Failed to sign in. Please try again later.", "danger");
    } finally {
    }
  };

  return (
    <div className="relative flex flex-col ">
      <h2 className="text-2xl text-center mnpm run dev -7">Welcome back</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 px-10"
      >
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <SubmitButton isLoading={isLoading} />
        <p className="text-center ">Or</p>
        <div className="flex flex-col space-y-2 text-black ">
          <button
            className="inline-flex items-center justify-center px-4 py-3 mb-1 mr-1 text-xs font-bold text-black transition-all duration-150 ease-linear rounded-md outline-none bg-neutral-200 active:bg-blueGray-50 focus:outline-none hover:shadow-md "
            type="button"
            onClick={(e) => loginWithGoogle(e)}
          >
            <Icon icon="devicon:google" className="w-4 h-4 mr-1 " />
            {authGoogle ? "Loading Google OAuth..." : "Sign in with Google"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
