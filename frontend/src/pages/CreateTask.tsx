import { BASE_URL } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

type CreateTaskProps = {
  title: string;
  description: string;
};

async function createTask(task: CreateTaskProps) {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.createdTask;
  } catch (error) {
    console.error("error creating task");
    throw error;
  }
}

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dbError, setDbError] = useState("");

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: createTask,
    onSuccess: () => {
      navigate("/tasks");
      toast.success("successfully created task");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setDbError(error.message);
      toast.error("failed to create task");
    },
  });

  function handleCreateTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDbError("");
    const task = { title, description };
    mutate(task);
  }

  return (
    <div>
      <div className="flex justify-center py-10 px-2 md:px-0 md:py-5">
        <Card className="w-full md:min-w-2xl md:max-w-md border-none">
          <CardHeader>
            <CardTitle>Create your Task</CardTitle>
            <CardDescription>
              Enter your task title and description below to create a task
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="createTask" onSubmit={handleCreateTask}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  {dbError && (
                    <Alert className="border-none text-red-500 md:text-lg text-base font-medium flex justify-center items-center">
                      <AlertCircleIcon />
                      <AlertTitle>{dbError}</AlertTitle>
                    </Alert>
                  )}
                  <Label htmlFor="email">Title</Label>
                  <Input
                    id="email"
                    placeholder="enter task title"
                    required
                    className="focus:ring-blue-200"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    placeholder="enter task description"
                    required
                    className="border border-gray-700 rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    cols={50}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-blue-700 text-white hover:bg-blue-500 cursor-pointer"
              form="createTask"
            >
              {isPending ? "Creating...." : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreateTask;
