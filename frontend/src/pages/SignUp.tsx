import { AlertCircleIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/constants";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type UserProps = {
  firstName: string;
  password: string;
  lastName: string;
  userName: string;
  email: string;
};

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dbError, setDbError] = useState("");

  const navigate = useNavigate();

  async function createUser(user: UserProps) {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
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
      console.error("error creating user", error);
      throw error;
    }
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["post-user"],
    mutationFn: createUser,
    onError: (error: Error) => {
      setDbError(error.message);
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setDbError("");

    if (confirmPassword !== password) {
      setDbError("password and confirm password should match!");
      return;
    }

    const user: UserProps = { firstName, lastName, password, userName, email };
    mutate(user);
  }

  return (
    <div className="flex justify-center py-10 px-2 md:px-0 md:py-5">
      <Card className="w-full md:min-w-2xl max-w-md border-none">
        <CardHeader>
          <CardTitle className="md:text-xl text-base md:font-semibold font-medium work-sans md:tracking-wide">
            Sign up to Tasky!
          </CardTitle>
          <CardDescription className="text-[#374151] md:text-base text-sm">
            Enter your details below to create your account
          </CardDescription>
          <CardAction>
            <Link to="/login">
              <Button
                variant="outline"
                className="cursor-pointer hover:text-blue-700 md:text-lg text-base"
              >
                Login
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="signup-form" onSubmit={handleSignUp}>
            <div className="flex flex-col gap-4">
              <div>
                {dbError && (
                  <Alert className="border-none text-red-500 md:text-lg text-base font-medium flex justify-center items-center">
                    <AlertCircleIcon />
                    <AlertTitle>{dbError}</AlertTitle>
                  </Alert>
                )}
                <Label htmlFor="email">FirstName</Label>
                <Input
                  type="text"
                  className="focus:ring-blue-200 "
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">LastName</Label>
                <Input
                  type="text"
                  className="focus:ring-blue-200"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">UserName</Label>
                <Input
                  type="text"
                  className="focus:ring-blue-200"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  className="focus:ring-blue-200"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">password</Label>
                <Input
                  type="password"
                  className="focus:ring-blue-200"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Confirm Password</Label>
                <Input
                  type="password"
                  className="focus:ring-blue-200"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col">
          <Button
            form="signup-form"
            className="w-full cursor-pointer bg-blue-700 text-white hover:bg-blue-400"
            variant={"outline"}
            disabled={isPending}
          >
            {isPending ? "Signing up...." : "Sign Up"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
