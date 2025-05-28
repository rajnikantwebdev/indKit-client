import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset messages
    setUsernameError("");
    setPasswordError("");
    setSuccessMessage("");
    setServerError("");

    // Validate inputs
    let valid = true;
    if (!username.trim()) {
      setUsernameError("Username required");
      valid = false;
    }
    if (!password.trim()) {
      setPasswordError("Password required");
      valid = false;
    }
    if (!valid) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/login`,
        {
          username,
          password,
        }
      );
      setSuccessMessage("User logged in successfully");
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard", { state: { username: response.data.username } });
    } catch (error) {
      setServerError(
        error.response?.data?.error || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-12 rounded secondary-bg w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="text-color mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-color"
              >
                Username
              </label>
            </div>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {usernameError && (
                <p className="mt-1 text-sm text-red-600">{usernameError}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-color"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs"
            >
              Sign in
            </button>
          </div>
          {successMessage && (
            <p className="mt-4 text-center text-sm text-green-600">
              {successMessage}
            </p>
          )}
          {serverError && (
            <p className="mt-4 text-center text-sm text-red-600">
              {serverError}
            </p>
          )}
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <a
            href="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
