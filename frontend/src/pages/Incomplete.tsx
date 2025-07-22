import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/constants";
import Task from "@/components/Task";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

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

export type TaskProps = {
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
            <Task
              key={task.id}
              title={task.title}
              description={task.description}
              id={task.id}
              status={task.isCompleted ? "complete" : "incomplete"}
            />
          ))
        ) : (
          <div className="grid gap-4 w-full max-w-xl m-auto md:p-6 p-4">
            <Alert className="text-red-600">
              <AlertCircleIcon />
              <AlertTitle className="text-base font-medium">
                You have NO tasks created
              </AlertTitle>
              <AlertDescription>
                <p>Create task to be able to see it displayed here</p>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default Incomplete;
