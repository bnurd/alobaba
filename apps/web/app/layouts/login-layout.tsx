import { Outlet } from "react-router";

export default function LoginLayout() {
  return (
    <div>
      <header className="sticky top-0 z-[99] border-b border-b-gray-300 bg-white py-3 md:py-4">
        <div className="max-w-8xl bg-red-5 mx-auto flex w-full items-center px-2 md:px-10">
          <h1 className="text-primary-500 font-semibold md:text-2xl">Alobaba.com</h1>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
