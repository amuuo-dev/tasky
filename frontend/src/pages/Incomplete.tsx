import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/constants";
import Task from "@/components/Task";

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
            />
          ))
        ) : (
          <div className="md:mb-4 mb-2 uppercase font-semibold work-sans md:text-xl text-base text-center">
            you don't have any tasks
          </div>
        )}
      </div>
    </div>
  );
};

export default Incomplete;
