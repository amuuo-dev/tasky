import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/constants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SquarePen, Trash } from "lucide-react";

async function getAllIncompleteTasks() {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.specificTask;
  } catch (error) {
    console.error("error fetching all incomplete tasks", error);
    throw error;
  }
}

type TaskProps = {
  id: string;
  title: string;
  description: string;
  isDeleted: boolean;
  isCompleted: boolean;
};

const Incomplete = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllIncompleteTasks,
  });

  if (isLoading) {
    return <div> loading tasks.....</div>;
  }

  if (error) {
    return <div>error getting your tasks</div>;
  }

  return (
    <div>
      <h1 className="md:mb-4 mb-2 uppercase font-semibold work-sans md:text-xl text-base text-center">
        Stay on Track – Here&apos;s What&apos;s Next
      </h1>
      <div className="flex gap-4 flex-wrap p-4">
        {data.length > 0 ? (
          data.map((task: TaskProps) => (
            <Card key={task.id} className="flex-1 border-none">
              <CardHeader>
                <CardTitle className="md:text-lg text-base text-blue-400 capitalize">
                  {task.title}
                </CardTitle>
                <CardDescription className="md:text-base text-sm text-[#374151]">
                  {task.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center gap-2">
                <Button
                  className="cursor-pointer hover:text-white hover:bg-blue-500"
                  variant="outline"
                >
                  mark as Complete
                </Button>
                <Button
                  className="cursor-pointer border-blue-500 hover:bg-blue-400 hover:text-white"
                  variant="outline"
                >
                  Update <SquarePen />
                </Button>
                <Button
                  className="cursor-pointer hover:text-red-500 border-red-200 hover:bg-red-200"
                  variant="outline"
                >
                  Delete <Trash className="text-red-500" />
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div>you don't have any tasks</div>
        )}
      </div>
    </div>
  );
};

export default Incomplete;
