import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/Button";
import { CardBody, CardFooter, CardHeader } from "@/components/Card";
import { TextFieldInput } from "@/components/Form";
import styles from "./AuthForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppDispatch, RootState } from "@/store";
import { signup } from "../authSlice";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Must be 6 characters long"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null!],
    "Passwords do not match"
  ),
});

export type SignupRequest = Yup.InferType<typeof validationSchema>;

export default function SignupForm() {
  const dispatch: AppDispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  if (authState.status === "failed") toast.error(authState.error?.message);
  if (authState.status === "succeeded") toast.success("Signed up successfully");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  console.error(errors);
  const onSubmit = (values: SignupRequest) => {
    dispatch(signup(values));
  };

  return (
    <>
      <CardHeader className={styles.headerContainer}>
        <h2>Signup</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextFieldInput {...register("email")} label="Email" size="lg" />

          <TextFieldInput
            {...register("firstName")}
            wrapperClassName={styles.input}
            label="First Name"
            size="lg"
          />
          <TextFieldInput
            {...register("lastName")}
            wrapperClassName={styles.input}
            label="Last Name"
            size="lg"
          />
          <TextFieldInput
            {...register("password")}
            wrapperClassName={styles.input}
            label="Password"
            size="lg"
          />
          <TextFieldInput
            {...register("confirmPassword")}
            wrapperClassName={styles.input}
            label="Confirm Password"
            size="lg"
          />

          <Button
            isLoading={authState.status === "loading"}
            className={styles.loginButton}
            size="lg"
            fullWidth
          >
            Register
          </Button>
          <div className={styles.signup}>
            <small>
              Already have an account?
              <Link className={styles.signupLink} to="/">
                Login instead
              </Link>
            </small>
          </div>

          <div className={styles.separator}>OR</div>

          <CardFooter className={styles.footerContainer}>
            <GoogleLogin
              size="large"
              onSuccess={(credentials) => console.log(credentials)}
            />
          </CardFooter>
        </form>
      </CardBody>
    </>
  );
}
