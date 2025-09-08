import { useNavigate } from "react-router";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import ErrorMessage from "../../ui/ErrorMessage";
import { useLogin } from "../../hooks/auth/uselogin";

function Login() {
  const navigate = useNavigate();

  const { login, isLogging } = useLogin();

  const validationLogin = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationLogin),
  });

  function onSubmit({ email, password }: { email: string; password: string }) {
    console.log(email, password);

    toast.success("email, password");
    login({ email, password });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center min-h-screen">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box max-w-xl w-1/3 border p-12 ">
          <label className="input w-full mx-auto mt-4">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                <path d="M3 7l9 6l9 -6" />
              </g>
            </svg>

            <input
              type="email"
              className="grow"
              placeholder="email"
              {...register("email")}
            />
            {errors.email && (
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            )}
          </label>

          <label className="input w-full mt-4">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z" />
                <path d="M15 9h.01" />
              </g>
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="password"
              {...register("password")}
            />
            {errors.password && (
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            )}
          </label>

          <span className="grid grid-cols-2 gap-4">
            <button className="btn btn-primary mt-4">Login</button>
            <button
              className="btn btn-secondary mt-4"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </span>
        </fieldset>
      </div>
    </form>
  );
}
export default Login;
