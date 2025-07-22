import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArchiveRestore, SquarePen, Trash } from "lucide-react";
import { BASE_URL } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type TaskProps = {
  title: string;
  description: string;
  id: string;
  variant?: "default" | "trash";
};

async function deleteTask(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/tasks/delete/${id}`, {
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
  } catch (error) {
    console.error("error deleting task");
    throw error;
  }
}

async function restoreTask(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/tasks/restore/${id}`, {
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
  } catch (error) {
    console.error("error restoring this task", error);
    throw error;
  }
}

const Task = ({ title, description, id, variant = "default" }: TaskProps) => {
  const navigate = useNavigate();

  const mutationFn = variant === "trash" ? restoreTask : deleteTask;

  const { mutate, isPending } = useMutation({
    mutationKey: [variant === "trash" ? restoreTask : deleteTask],
    mutationFn,
    onSuccess: () => {
      toast.success(
        variant === "trash"
          ? "successfully restored your task!!"
          : "successfully deleted your task!!"
      );
      navigate(variant === "trash" ? "/tasks" : "/trash");
    },
    onError: () => {
      toast.error(
        variant === "trash"
          ? "Failed to restore task"
          : "Error deleting this specific task"
      );
    },
  });

  return (
    <Card className="flex-1 border-none">
      <CardHeader>
        <CardTitle className="md:text-lg text-base text-blue-400 capitalize">
          {title}
        </CardTitle>
        <CardDescription className="md:text-base text-sm text-[#374151]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-4">
        {variant !== "trash" && (
          <>
            <Button
              className="cursor-pointer hover:text-white hover:bg-blue-500 flex-1"
              variant="outline"
            >
              mark as Complete
            </Button>
            <Button
              className="cursor-pointer border-blue-500 hover:bg-blue-400 hover:text-white flex-1"
              variant="outline"
            >
              <Link to={`/edit/${id}`} className="flex items-center gap-1">
                Update <SquarePen />
              </Link>
            </Button>
          </>
        )}
        <Button
          variant="outline"
          className={`cursor-pointer flex-1 ${
            variant === "trash"
              ? "hover:text-green-600 border-green-300 hover:bg-green-200"
              : "hover:text-red-500 border-red-200 hover:bg-red-200"
          }`}
          onClick={() => mutate(id)}
        >
          {isPending
            ? variant === "trash"
              ? "Restoring..."
              : "Deleting..."
            : variant === "trash"
            ? "Restore"
            : "Delete"}{" "}
          {variant === "trash" ? (
            <ArchiveRestore className="text-green-600" />
          ) : (
            <Trash className="text-red-500" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Task;
