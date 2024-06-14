import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FormGroup,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  styled,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { setUser } from "@/reducers/userReducer";
import { setTokensInCookies } from "@/utils/cookie";


const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    color: "#6269d8",
  },
  "&.Mui-checked": {
    "& .MuiSvgIcon-root": {
      color: "#6269d8",
    },
    "&.MuiCheckbox-root": {
      color: "#6269d8",
    },
  },
}));

// Define a Zod schema for form validation
const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type FormData = z.infer<typeof FormSchema>;

interface loadingData {
  isLoading: boolean;
}

const Login = () => {
  const router = useRouter();
  const dispatch=useDispatch()
  const [loading, setLoading] = useState<loadingData>({ isLoading: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading({ isLoading: true });

    try {
      const response = await fetch(
        "https://stemprotocol.codefremics.com/api/v2/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: data.email,
            password: data.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const authdata = await response.json();
      if (authdata.status == 404) {
        toast.error(authdata.description);
        return;
      }
      
      const {access_token,refresh_token,status,type,...userData}=authdata
      setTokensInCookies(access_token,refresh_token)
      dispatch(setUser({...userData,rememberMe:data.rememberMe,isAuthenticated:true}));

      // Redirect to the dashboard
      router.push("/dashboard");

      toast.success("Login successful!");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading({ isLoading: false });
    }
  };

  // Watch email and password fields for real-time form validation
  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    if (email || password) {
      trigger(["email", "password"]);
    }
  }, [email, password, trigger]);

  return (
    <>
      <Head>
        <title>Egamlio - Login</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <Toaster />
      <section className="login-reg">
        <div className="overlay pb-120">
          <div className="container">
            <div className="top-area pt-4 mb-30">
              <div className="row d-flex align-items-center">
                <div className="col-sm-5 col">
                  <Link className="flex text-light back-home" href="/">
                    <img src="/images/icon/left-icon.png" alt="image" />
                    Back To Egamlio
                  </Link>
                </div>
                <div className="col-sm-2 text-center col">
                  <Link href="/index-3">
                    <img src="/images/logo.png" alt="image" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="row pt-20 m-2 d-flex justify-content-center">
              <div className="col-lg-6">
                <div className="login-reg-main text-center">
                  <div className="row form-area">
                    <div className="col-12 section-text">
                      <h4>Welcome Back!</h4>
                      <p>
                        We're so excited to see you again! Log In to your
                        Egamlio Account!
                      </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-12 mb-4">
                        <FormGroup>
                          <FormControl>
                            <TextField
                              label="Email Address"
                              id="email"
                              type="email"
                              {...register("email")}
                              error={!!errors.email}
                              helperText={
                                errors.email ? (
                                  <React.Fragment>
                                    <WarningIcon color="error" />
                                    {errors.email.message}
                                  </React.Fragment>
                                ) : (
                                  ""
                                )
                              }
                              InputLabelProps={{
                                sx: {
                                  color: "#fff",
                                  "&.Mui-focused": {
                                    color: "#6269d8",
                                  },
                                },
                              }}
                              InputProps={{
                                sx: {
                                  color: "#fff",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#6269d8",
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#6269d8",
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      borderColor: "#6269d8",
                                    },
                                  "&.Mui-disabled": {
                                    color: "#fff",
                                  },
                                },
                              }}
                            />
                          </FormControl>
                        </FormGroup>
                      </div>
                      <div className="col-12 mb-4">
                        <FormGroup>
                          <FormControl>
                            <TextField
                              label="Password"
                              id="password"
                              type="password"
                              {...register("password")}
                              error={!!errors.password}
                              helperText={
                                errors.password ? (
                                  <React.Fragment>
                                    <WarningIcon color="error" />
                                    {errors.password.message}
                                  </React.Fragment>
                                ) : (
                                  ""
                                )
                              }
                              InputLabelProps={{
                                sx: {
                                  color: "#fff",
                                  "&.Mui-focused": {
                                    color: "#6269d8",
                                  },
                                },
                              }}
                              InputProps={{
                                sx: {
                                  color: "#fff",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#6269d8",
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#6269d8",
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      borderColor: "#6269d8",
                                    },
                                  "&.Mui-disabled": {
                                    color: "#fff",
                                  },
                                },
                              }}
                            />
                          </FormControl>
                        </FormGroup>
                      </div>
                      <div className="col-12 mb-2">
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <StyledCheckbox {...register("rememberMe")} />
                            }
                            label="Remember me"
                          />
                        </FormGroup>
                      </div>
                      <div className="col-12">
                        <Button
                          type="submit" // Ensure the button is a submit button
                          disabled={
                            !!errors.email ||
                            !!errors.password ||
                            loading.isLoading
                          }
                          className="cmn-btn w-60"
                          variant="contained"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {loading.isLoading ? (
                            <span className="text-light flex">
                              <CircularProgress
                                className="text-light mr-2"
                                size={25}
                              />
                              Please wait...
                            </span>
                          ) : (
                            "Login"
                          )}
                        </Button>
                      </div>
                    </form>
                    <div className="reg-with">
                      <div className="or">
                        <p>OR</p>
                      </div>
                      <div className="social">
                        <ul className="footer-link d-flex justify-content-center align-items-center">
                          <li>
                            <Link href="#">
                              <i className="fab fa-facebook-f"></i>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fab fa-google"></i>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fab fa-twitch"></i>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fab fa-apple"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="account mt-30">
                    <p>
                      Don't have an account?{" "}
                      <Link href="register">Sign Up Here</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
