import Task from "@/components/Task";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/constants";
import { type TaskProps } from "./Incomplete";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

async function getAllDeletedTasks() {
  try {
    const response = await fetch(`${BASE_URL}/tasks/deleted`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data.deleted;
  } catch (error) {
    console.error("error fetching all tasks deleted");
    throw error;
  }
}

const Trash = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["deletedTask"],
    queryFn: getAllDeletedTasks,
  });

  if (isLoading) {
    return <div>Loading completed tasks....</div>;
  }

  if (error) {
    return <div>Error fetching all completed tasks</div>;
  }

  return (
    <div>
      {data.length > 0 && (
        <>
          <h1 className="md:mb-4 mb-2 uppercase font-semibold work-sans md:text-xl text-base text-center">
            This are all your deleted tasks
          </h1>
          <div className="text-center mb-4 text-red-400 flex justify-center gap-4 items-center">
            <AlertCircleIcon />
            <p>Tasks in trash will be automatically be deleted after 30 days</p>
          </div>
        </>
      )}
      <div className="flex gap-4 flex-wrap p-4">
        {data.length > 0 ? (
          data.map((completed: TaskProps) => (
            <Task
              key={completed.id}
              title={completed.title}
              description={completed.description}
              id={completed.id}
              variant="trash"
            />
          ))
        ) : (
          <div className="grid gap-4 w-full max-w-xl m-auto md:p-6 p-4">
            <Alert className="text-red-600">
              <AlertCircleIcon />
              <AlertTitle className="text-base font-medium">
                You have NO deleted tasks
              </AlertTitle>
              <AlertDescription>
                <p>All finished and deleted tasks will be shown here</p>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trash;
