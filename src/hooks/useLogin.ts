import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useLogin = () => {
  const schema = yup.object({
    username: yup
      .string()
      .required("Campo obrigatório")
      .min(3, "Mínimo de 3 caracteres")
      .max(20, "Máximo de 20 caracteres")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return { register, handleSubmit, errors };
};
