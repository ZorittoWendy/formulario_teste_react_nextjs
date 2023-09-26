"use client";

import { useForm } from "react-hook-form";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, "A senha precisa ter pelo menos 6 caracteres")
    .required("Campo obrigatorio!!!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas precisam ser iguais")
    .required("Campo obrigatorio"),
});

const Form = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { errors, isSubmitted } = formState;

  console.log("errors", errors);
  console.log("isSubmitted", isSubmitted);

  const handleSubmitData = (data: any) => {
    console.log("submit", data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <h2>reset de senha</h2>

      <input
        {...register("password")}
        autoFocus
        type="password"
        placeholder="senha"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="confirme sua senha"
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <button type="submit" disabled={isSubmitted}>
        {isSubmitted ? "Enviando ..." : "Enviar"}
      </button>
    </form>
  );
};

export default Form;
