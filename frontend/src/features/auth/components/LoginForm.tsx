import { yupResolver } from "@hookform/resolvers/yup";
import { useAppStore } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import parseJwt from "@/utils/parseJwt";
import * as Yup from "yup";

import { login, loginSuccess } from "../authSlice";
import { Button } from "@/components/Button";
import { CardBody, CardFooter, CardHeader } from "@/components/Card";
import { TextFieldInput } from "@/components/Form";
import styles from "./AuthForm.module.css";
import { toast } from "react-toastify";
import httpClient from "@/api/Httpclient";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export type LoginRequest = Yup.InferType<typeof validationSchema>;

export default function LoginForm() {
  const { useAppSelector, dispatch } = useAppStore();
  const { status, error } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (credentials: LoginRequest) => {
    dispatch(login(credentials))
      .unwrap()
      .then((payload) => {
        httpClient.interceptors.request.use((conf) => {
          conf.headers.Authorization = `Bearer ${payload.accessToken}`;

          return conf;
        });
      });
  };

  if (status === "failed") toast.error(error!.message);

  return (
    <>
      <CardHeader className={styles.headerContainer}>
        <h2>Login</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextFieldInput
            error={errors.email?.message}
            {...register("email")}
            label="Email"
            size="lg"
          />
          <TextFieldInput
            {...register("password")}
            error={errors.password?.message}
            wrapperClassName={styles.input}
            label="Password"
            size="lg"
          />

          <Button
            isLoading={status === "loading"}
            className={styles.loginButton}
            size="lg"
            fullWidth
          >
            Login
          </Button>
          <div className={styles.signup}>
            <small>
              Don't have an account?
              <Link className={styles.signupLink} to="/signup">
                Signup instead
              </Link>
            </small>
          </div>

          <div className={styles.separator}>OR</div>

          <CardFooter className={styles.footerContainer}>
            <GoogleLogin
              size="medium"
              onSuccess={(credentials) => {
                const claims = parseJwt(credentials.credential!);
                dispatch(
                  loginSuccess({
                    accessToken: credentials.credential!,
                    user: {
                      email: claims.email,
                      firstName: claims.given_name,
                      lastName: claims.family_name,
                      id: claims.sub,
                    },
                  })
                );
              }}
            />
          </CardFooter>
        </form>
      </CardBody>
    </>
  );
}
