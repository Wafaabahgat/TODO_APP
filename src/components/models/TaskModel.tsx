import { FC, ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface TaskModelProps {}

const TaskModel: FC<TaskModelProps> = ({
  children,
  ttl,
  onClick,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="fixed z-[999] inset-0 place-items-center bg-slate-800/50">
      <div className="py-3 md:max-w-[45%] w-[65%] backdrop-blur-[8px] mt-10 bg-slate-200 mx-auto rounded-xl">
        <span className="flex justify-between mr-4">
          <p className="text-2xl font-semibold px-4 capitalize text-green-700">{ttl}</p>
          <button
            onClick={onClick}
            className="bg-red-700 text-lg text-slate-100 rounded-sm p-1"
          >
            <IoMdClose />
          </button>
        </span>
        {children}
      </div>
    </div>
  );
};

export default TaskModel;
