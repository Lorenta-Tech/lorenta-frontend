import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DepartmentLayout() {
  return (
    <>
      <Navbar isDepartment />

      <main className="mx-auto w-full max-w-7xl flex-1 overflow-x-hidden px-4 py-8 md:px-6 md:py-10">
        <Outlet />
      </main>
    </>
  );
}