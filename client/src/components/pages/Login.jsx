import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

import Logo from "../../assets/react-2.svg";
import "./LoginStyle.scss";

export default function Login() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const navigate = useNavigate();

  const handleLogin = (values) => {
    axiosInstance
      .post("/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        const page = res.data;
        console.log(res.data);

        if (page === true) {
          localStorage.setItem("@user", JSON.stringify(res.config.data));
          toast.info("LogIn in successfully!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          navigate("/tasks");
        } else {
          toast.info(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  };

  const validationsLogin = yup.object().shape({
    email: yup.string().email("Invalid email!").required("Email is necessary!"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long!")
      .required("Password is required!"),
  });

  return (
    <>
      <div className="form-background">
        <div className="form-login ">
          <div className="form-login-header">
            <img src={Logo} alt="logo" />
            ReactJS
          </div>

          <div className="form-login-container">
            <Formik
              initialValues={{}}
              onSubmit={handleLogin}
              validationSchema={validationsLogin}
            >
              <Form className="login-form">
                <div className="form-group">
                  <Field
                    name="email"
                    type="email"
                    className="form-field"
                    placeholder="Enter Email..."
                    data-cy="login-email"
                  />

                  <ErrorMessage
                    component="span"
                    name="email"
                    className="form-error"
                  />
                </div>

                <div className="form-group">
                  <Field
                    name="password"
                    type="password"
                    className="form-field"
                    placeholder="Enter Password..."
                    data-cy="login-password"
                  />

                  <ErrorMessage
                    component="span"
                    name="password"
                    className="form-error"
                  />
                </div>

                <div className="form-login-footer">
                  <button
                    data-cy="login-btn-submit"
                    className="button"
                    type="submit"
                  >
                    SIGN IN
                  </button>
                  <div className="form-login-register">
                    <p>Don't have an account?</p>
                    <Link to={"/register"}>Sign Up</Link>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
