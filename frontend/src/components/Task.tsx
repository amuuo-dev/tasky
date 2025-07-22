import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { SquarePen, Trash } from "lucide-react";
import { BASE_URL } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

const Task = ({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: string;
}) => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["deletedTask"],
    mutationFn: deleteTask,
    onSuccess: () => {
      navigate("/trash");
      toast.success("successfully deleted your task!!");
    },
    onError: () => {
      toast.error("error deleting this specific task");
    },
  });

  function handleDeleteTask(id: string) {
    mutate(id);
  }

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
        <Button
          className="cursor-pointer hover:text-red-500 border-red-200 hover:bg-red-200 flex-1"
          variant="outline"
          onClick={() => handleDeleteTask(id)}
        >
          {isPending ? "Deleting...." : "Delete"}{" "}
          <Trash className="text-red-500" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Task;
