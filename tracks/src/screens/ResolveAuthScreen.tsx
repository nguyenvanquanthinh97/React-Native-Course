import React, { FC, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ResolveAuthScreen: FC = () => {
  const { tryLocalSignin } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignin();
  }, []);

  return null;
};

export default ResolveAuthScreen;
