import Task from "@/components/Task";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/constants";
import { type TaskProps } from "./Incomplete";

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
      <h1 className="md:mb-4 mb-2 uppercase font-semibold work-sans md:text-xl text-base text-center">
        This are all your deleted tasks
      </h1>
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
          <div className="md:mb-4 mb-2 uppercase font-semibold work-sans md:text-xl text-base text-center">
            you dont have any completed tasks
          </div>
        )}
      </div>
    </div>
  );
};

export default Trash;
