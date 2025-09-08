import { Outlet } from "react-router";

function AppLayout() {
  return (
    <>
      <h1 className="text-center text-2xl">Hello </h1>
      <Outlet />
    </>
  );
}
export default AppLayout;
