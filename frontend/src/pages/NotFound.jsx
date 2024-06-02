import React from "react";
import notimage from "../assets/404-computer.svg";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className=" bg-white dark:bg-gray-900 h-screen">
      <section className="flex flex-col justify-start items-center" >
        <div className="flex justify-center">
          <img className="w-[300px]" src={notimage} alt="" />
        </div>
        <div className=" mx-auto max-w-screen-xl ">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <Link
              href="/"
              className="inline-flex text-white bg-slate-400 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
