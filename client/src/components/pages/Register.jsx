import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

import Logo from "../../assets/react-2.svg";
import "./RegisterStyle.scss";

export default function Register() {
  const axiosInstance = axios.create({
    baseURL: "https://servertasks.onrender.com/api/v1/auth"
  });

  const navigate = useNavigate();

  const handleRegister = (data) => {
    axiosInstance
      .post("/register", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data.message === "Sign In in successfully!") {
          toast.info(res.data.message, {
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
  const validationsRegister = yup.object().shape({
    fullName: yup.string().required("Full Name is necessary!"),
    email: yup.string().email("Invalid email!").required("Email is necessary!"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long!")
      .required("Password is required!"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match!")
      .required("Password is required!"),
  });

  return (
    <>
      <div className="form-background">
        <div className="form-register">
          <div className="form-register-header">
            <img src={Logo} alt="logo" />
            ReactJS
          </div>

          <div className="form-register-container">
            <Formik
              initialValues={{}}
              onSubmit={handleRegister}
              validationSchema={validationsRegister}
            >
              <Form className="login-form">
                <div className="form-group">
                  <Field
                    name="fullName"
                    type="text"
                    className="form-field"
                    placeholder="Full Name"
                  />

                  <ErrorMessage
                    component="span"
                    name="fullName"
                    className="form-error"
                  />
                </div>
                <div className="form-group">
                  <Field
                    name="email"
                    type="email"
                    className="form-field"
                    placeholder="Email"
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
                    placeholder="Password"
                  />

                  <ErrorMessage
                    component="span"
                    name="password"
                    className="form-error"
                  />
                </div>

                <div className="form-group">
                  <Field
                    name="confirmation"
                    type="password"
                    className="form-field"
                    placeholder="Confirm Password"
                  />

                  <ErrorMessage
                    component="span"
                    name="confirmation"
                    className="form-error"
                  />
                </div>
                <div className="form-register-footer">
                  <button className="button" type="submit">
                    SIGN UP
                  </button>
                  <div className="form-register-login">
                    <p>Have an account?</p>
                    <Link to={"/"}>Sign In</Link>
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
