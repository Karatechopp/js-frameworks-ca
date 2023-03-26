import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { JWT_PATH } from "../../constants/api";
import DisplayMessage from "../common/DisplayMessage";

const url = JWT_PATH;

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    errors = {},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);
      setAuth(response.data);
      navigate("/admin");
    } catch (error) {
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loginError && <DisplayMessage className="error">{loginError}</DisplayMessage>}
      <fieldset disabled={submitting}>
        <div>
          <input {...register("username", { required: true })} placeholder="Username" />
          {errors.username && <DisplayMessage className="error">{errors.username.message}</DisplayMessage>}
        </div>

        <div>
          <input {...register("password", { required: true })} placeholder="Password" type="password" />
          {errors.password && <DisplayMessage className="error">{errors.password.message}</DisplayMessage>}
        </div>
        <button type="submit">{submitting ? "Loggin in..." : "Login"}</button>
      </fieldset>
    </form>
  );
}
