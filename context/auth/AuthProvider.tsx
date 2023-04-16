import { FC, useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

// import Cookies from 'js-cookie';
// import axios from "axios";

import { AuthContext, authReducer } from "./";

// import { tesloApi } from '../../api';
import { IUser } from "../../interfaces";
// import { neuronaApi } from "../../api";
// import axios from "axios";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "[Auth] - Login", payload: data?.user as IUser });
    }
  }, [status, data]);

  // const registerUser = async (
  //   name: string,
  //   email: string,
  //   password: string,
  //   role: string
  // ): Promise<{ hasError: boolean; message?: string }> => {
  //   try {
  //     await neuronaApi.post("/user/register", {
  //       name,
  //       email,
  //       password,
  //       role,
  //       id_user: (data?.user as IUser).id,
  //     });

  //     return {
  //       hasError: false,
  //     };
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       return {
  //         hasError: true,
  //         message: error.message,
  //       };
  //     }

  //     return {
  //       hasError: true,
  //       message: "No se pudo crear el usuario - intente de nuevo",
  //     };
  //   }
  // };

  // const checkRole = async (
  //   email: string
  // ): Promise<{ hasError: boolean; message?: any }> => {
  //   try {
  //     await neuronaApi.post("/user/checkrole", { email });

  //     return {
  //       hasError: false,
  //     };
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       return {
  //         hasError: true,
  //         message: error.response?.data,
  //       };
  //     }

  //     return {
  //       hasError: true,
  //       message: "No cuenta con permisos de administrador",
  //     };
  //   }
  // };

  const logout = () => {
    signOut();
    router.push("./");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // Methods
        // loginUser,
        // registerUser,
        // checkRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
