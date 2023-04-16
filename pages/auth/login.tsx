import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { signIn, getSession, getProviders } from "next-auth/react";
import { QRLayout } from "../../components/layouts/QRLayout";
import { isEmail } from "../../utils/validations";
import { GetServerSideProps } from "next";

const login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      // console.log({prov});
      setProviders(prov);
    });
  }, []);

  const onLoginUser: any = async ({ name, email }: any) => {
    await signIn("credentials", { name, email, callbackUrl: "/generator" });
  };

  return (
    <QRLayout pageDescription="Iniciar Sesión" title="Iniciar Sesión">
      <div className="container mx-auto flex items-center justify-center">
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
          <div className="mybackground  sm:w-96 p-6 rounded shadow-lg mt-10 mx-1">
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-2xl">:)</h1>
            </div>
            <span className="flex justify-center text-white text-xl">
              Ingresa tus datos
            </span>
            <br />

            <label className="text-white">Nombre</label>
            <input
              className="w-full py-2 myblue text-white px-1 outline-none"
              type="text"
              {...register("name", {
                required: "Ingrese un nombre válido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
            />
            {!!errors.name ? (
              <div className="mb-4">
                <span className="text-red-700">{errors.name.message}</span>
              </div>
            ) : (
              <div className="mb-4"></div>
            )}

            <label className="text-white">Correo</label>
            <input
              className="w-full py-2 myblue text-white px-1 outline-none"
              type="email"
              {...register("email", {
                required: "Ingrese un correo válido",
                validate: isEmail,
              })}
            />
            {!!errors.email ? (
              <div className="mb-4">
                <span className="text-red-700">{errors.email.message}</span>
              </div>
            ) : (
              <div className="mb-4"></div>
            )}

            <button
              type="submit"
              className="mt-5 w-full h-10 text-white py-2 rounded myblue hover:bg-green-500 active:bg-green-900 transition-colors"
            >
              Ingresar
            </button>

            {Object.values(providers).map((provider: any) => {
              if (provider.id === "credentials")
                return <div key="credentials"></div>;

              return (
                <button
                  key={provider.id}
                  onClick={() =>
                    signIn(provider.id, { callbackUrl: "/generator" })
                  }
                  className="mt-5 w-full h-10 text-white py-2 rounded myblue hover:bg-green-500 active:bg-green-900 transition-colors"
                >
                  Ingresar con {provider.name}
                </button>
              );
            })}
          </div>
        </form>
      </div>
    </QRLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  // console.log({session});

  if (session) {
    return {
      redirect: {
        destination: "/generator",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default login;
