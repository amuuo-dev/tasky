import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/constants";
import Task from "@/components/Task";
import { type TaskProps } from "./Incomplete";

async function fetchAllCompletedTasks() {
  try {
    const response = await fetch(`${BASE_URL}/tasks/completed`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data.completed;
  } catch (error) {
    console.error("error fetching all completed tasks", error);
    throw error;
  }
}

const Completed = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks-completed"],
    queryFn: fetchAllCompletedTasks,
  });

  if (isLoading) {
    return <div>Loading completed tasks....</div>;
  }

  if (error) {
    return <div>Error fetching all completed tasks</div>;
  }

  return (
    <div>
      <h1 className="md:mb-4 mb-2 uppercase font-semibold work-sans md:text-xl text-base text-center">
        This are all your completed tasks
      </h1>
      <div className="flex gap-4 flex-wrap p-4">
        {data.length > 0 ? (
          data.map((completed: TaskProps) => (
            <Task
              key={completed.id}
              title={completed.title}
              description={completed.description}
              id={completed.id}
            />
          ))
        ) : (
          <div className="md:mb-4 mb-2 uppercase font-semibold work-sans md:text-xl text-base text-center">
            you dont have any completed tasks
          </div>
        )}
      </div>
    </div>
  );
};

export default Completed;
