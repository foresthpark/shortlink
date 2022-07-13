import type { NextPage } from "next";
import Head from "next/head";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  RefreshIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";
import { HomeIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import useThemeDetector from "../hooks/isDarkTheme";
import { useState } from "react";
import SlugList from "../components/modal";

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);

  const isDarkTheme = useThemeDetector();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    const res = await axios.post("/api/createlink", {
      url: data.url,
    });
    toast.success("Shortlink copied to clipboard", {
      position: "top-left",
      autoClose: 2000,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
    await navigator.clipboard.writeText(
      `https://u.forestp.dev/${res.data.slug}`
    );
    reset();
  };

  const onError = (error: any) => {
    console.log("🚀 ~ file: index.tsx ~ line 47 ~ onError ~ error", error);
    toast.error(error.url.message, {
      position: "top-left",
      autoClose: 2000,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex flex-col items-start justify-center h-screen bg-blue-100 gap-4 px-8">
      <Head>
        <title>Shorter the better</title>
      </Head>
      <div className="text-4xl font-bold text-red-600">urls</div>
      <div className="text-6xl font-semibold text-gray-800">shorter,</div>
      <div
        className={`${
          isDarkTheme ? "bg-gray-500" : "bg-gray-200"
        } rounded-xl w-4/5 flex flex-row items-center justify-start`}
      >
        <div className="flex flex-row items-center justify-start gap-3 p-5 w-full">
          <div className="rounded-full bg-red-400 w-5 h-5"></div>
          <div className="rounded-full bg-yellow-400 w-5 h-5"></div>
          <div className="rounded-full bg-green-400 w-5 h-5"></div>
          <ArrowLeftIcon className="w-8 h-8 text-gray-400" />
          <ArrowRightIcon className="w-8 h-8 text-gray-400" />
          <RefreshIcon className="w-8 h-8 text-gray-400" />
          <HomeIcon className="w-8 h-8 text-gray-400" />
          <div className="relative flex items-stretch flex-grow focus-within:z-10 w-100">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
              <input
                {...register("url", {
                  required: "URL is required",
                  pattern: {
                    value:
                      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                    message: "Invalid URL",
                  },
                })}
                type="text"
                className="focus:ring-blue-400 focus:border-blue-400 block rounded-full w-full pl-10 sm:text-sm border-gray-300 placeholder-gray-300 p-2"
                placeholder="https://example.com"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="text-6xl font-semibold text-gray-800">the better</div>
      {/* <button onClick={() => setOpen(true)}>Click me</button> */}
      <SlugList open={open} setOpen={setOpen} />
    </div>
  );
};

export default Home;
