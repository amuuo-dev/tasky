import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/constants";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import useUser from "@/store/userStore";
import { toast } from "react-toastify";

type UserProps = {
  email: string;
  password: string;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dbError, setDbError] = useState("");

  const navigate = useNavigate();

  const { setUser } = useUser();

  async function loginUser(user: UserProps) {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      console.error("error logging you in");
      throw error;
    }
  }

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data);
      navigate("/tasks");
      toast.success("successfully logged in");
    },
    onError: (error) => {
      setDbError(error.message);
      toast.error("error logging in");
    },
  });

  function handleLoginUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDbError("");
    const user: UserProps = { email, password };
    mutate(user);
  }

  return (
    <div className="flex justify-center py-10 px-2 md:px-0 md:py-5">
      <Card className="w-full md:min-w-2xl max-w-md border-none">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to="/signup">
              <Button
                variant="outline"
                className="cursor-pointer hover:text-blue-700 md:text-lg text-base"
              >
                Sign Up
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="loginForm" onSubmit={handleLoginUser}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                {dbError && (
                  <Alert className="border-none text-red-500 md:text-lg text-base font-medium flex justify-center items-center">
                    <AlertCircleIcon />
                    <AlertTitle>{dbError}</AlertTitle>
                  </Alert>
                )}
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="focus:ring-blue-200 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <p className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </p>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  className="focus:ring-blue-200 "
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            className={`w-full bg-blue-700 text-white hover:bg-blue-500 ${
              isPending ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            }`}
            variant={"outline"}
            type="submit"
            form="loginForm"
          >
            {isPending ? "Logging in...." : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
