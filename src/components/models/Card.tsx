import { ReactNode, useState } from "react";
import { TaskType } from "../type";
import SingleTaskModel from "./SingleTaskModel";

interface CardProps {}

const Card = ({
  task,
  children,
  singleTask,
  taskId,
}: {
  task: TaskType;
  children: ReactNode;
}) => {
  const [openSingle, setopenSingle] = useState(false);
  return (
    <>
      <form
        className="p-4 rounded-xl task-anim border border-slate-500 bg-slate-50 shadow-md"
        onClick={() => singleTask(task?.id)}
      >
        <div className="flex items-center gap-4">
          <img
            src={
              "https://task.ecmpp.com/storage/" +
              task?.image?.split("public/")[1]
            }
            alt="img"
            className="rounded-md w-20 h-20 cursor-pointer -mt-14"
            onClick={() => setopenSingle(true)}
          />
          <h2
            className="text-xl cursor-pointer text-green-700 font-semibold"
            onClick={() => setopenSingle(true)}
          >
            {task?.title}
          </h2>
        </div>
        <p className=" text-slate-600 mt-4">{task?.content}</p>
        {children}
      </form>
      {openSingle && (
        <SingleTaskModel
          setopenSingle={setopenSingle}
          taskId={taskId}
          task={task}
        />
      )}
    </>
  );
};

export default Card;
