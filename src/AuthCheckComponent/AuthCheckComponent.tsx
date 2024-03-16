import { useState, useEffect, ReactNode } from "react";

import { Navigate } from "react-router-dom";
import client from "../services/client";

import Loader from "../ui/loader";

type AuthCheckComponentProps = {
  children: ReactNode;
};
const AuthCheckComponent = ({ children }: AuthCheckComponentProps) => {
  const isValid = client.authStore.isAuthRecord;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isValid) {
      setIsLoading(false);
    } else {
      <Navigate to="/" />;
    }
  }, [isValid]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isValid) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthCheckComponent;
