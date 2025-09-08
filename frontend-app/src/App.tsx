import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
// import { DevTools } from "jotai-devtools";
// import "jotai-devtools/styles.css";

import AuthLayout from "./ui/AuthLayout";
import AppLayout from "./ui/AppLayout";

import Login from "./feature/auth/Login";
import Signup from "./feature/auth/Signup";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<AppLayout />}></Route>

          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <DevTools /> */}

      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
export default App;
