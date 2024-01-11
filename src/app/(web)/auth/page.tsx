"use client";

import { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// default Value
const defaultFormData = {
  email: "",
  name: "",
  password: "",
};

const Auth = () => {
  // hooks
  const [formData, setFormData] = useState(defaultFormData);

  //   Form Onchange function
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect hook to help redirect after Auth.
  useEffect(() => {
    if (session) router.push("/");
  }, [router, session]);

  // Login Handler
  const loginHandler = async () => {
    try {
      await signIn();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, try again");
    }
  };

  //   Form onSubmit function
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await signUp(formData);
      if (user) {
        toast.success("Success, Please sign in");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setFormData(defaultFormData);
    }
  };
  return (
    <>
      <section className="container mx-auto">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto ">
          <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
              Create an account
            </h1>
            <p>OR</p>
            <span className="inline-flex items-center">
              <FaGithub
                onClick={loginHandler}
                className="mr-3 text-4xl cursor-pointer text-black dark:text-white"
              />
              |
              <FcGoogle
                onClick={loginHandler}
                className="ml-3 text-4xl cursor-pointer"
              />
            </span>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
              required
              className="inputStyles"
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter email address"
              required
              className="inputStyles"
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder=" Enter password"
              required
              minLength={6}
              className="inputStyles"
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign Up
            </button>
          </form>
          <p>
            Already have an account
            <button
              onClick={loginHandler}
              className="text-blue-700 font-semibold underline"
            >
              Login
            </button>
          </p>
        </div>
      </section>
    </>
  );
};

export default Auth;
