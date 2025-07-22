import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/constants";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type TaskUpdateByIdProps = {
  title: string;
  description: string;
};

async function markTaskAsIncomplete(id: string) {
  const response = await fetch(`${BASE_URL}/tasks/incomplete/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

async function markTaskAsComplete(id: string) {
  const response = await fetch(`${BASE_URL}/tasks/complete/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

const Update = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  async function getTaskById() {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return data.task;
    } catch (error) {
      console.error("error fetching this task");
      throw error;
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["getTaskById", id],
    queryFn: getTaskById,
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
    }
  }, [data]);

  async function updateTaskById(task: TaskUpdateByIdProps) {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "PATCH",
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
      return data;
    } catch (error) {
      console.error("error updating this task");
      throw error;
    }
  }

  const mutation = useMutation({
    mutationKey: ["task-update", id],
    mutationFn: updateTaskById,
    onSuccess: () => {
      toast.success("task updated successfully!");
      navigate("/tasks");
    },
  });

  const statusMutation = useMutation({
    mutationKey: [data?.isCompleted ? "mark-incomplete" : "mark-complete"],
    mutationFn: () =>
      data?.isCompleted
        ? markTaskAsIncomplete(id as string)
        : markTaskAsComplete(id as string),
    onSuccess: () => {
      toast.success(
        data?.isCompleted
          ? "Marked task as incomplete!"
          : "Marked task as complete!"
      );
      navigate(data?.isCompleted ? "/tasks" : "/completed");
    },
    onError: () => {
      toast.error("Error updating task status");
    },
  });

  function handleUpdateTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const task = { title, description };
    mutation.mutate(task);
  }

  if (isLoading) {
    return <div>loading ...</div>;
  }

  if (error) {
    return <div>error fetching this blog</div>;
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full md:min-w-2xl md:max-w-md border-none py-10 px-2 md:px-0 md:py-5">
        <CardHeader>
          <CardTitle>Updated this task</CardTitle>
          <CardDescription>
            Edit here your task, by providing different title and description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="updateTask" onSubmit={handleUpdateTask}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Edit Title</Label>
                <Input
                  type="text"
                  className="focus:ring-blue-200"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Edit Description</Label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-700 rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 cursor-pointer bg-blue-700 text-white hover:bg-blue-500"
            form="updateTask"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            variant="outline"
            className="flex-1 cursor-pointer  bg-blue-700 text-white hover:bg-blue-500"
            onClick={() => statusMutation.mutate()}
            disabled={statusMutation.isPending}
          >
            {statusMutation.isPending
              ? data?.isCompleted
                ? "Reverting..."
                : "Marking..."
              : data?.isCompleted
              ? "Mark as Incomplete"
              : "Mark as Complete"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Update;
