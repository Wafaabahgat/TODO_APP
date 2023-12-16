import { ChangeEvent, ChangeEventHandler, useState } from "react";
import Button from "../ui/Button";
import { TaskType } from "../type";
import TaskModel from "./TaskModel";

const CreateTaskModel = ({
  createTask,
  setopenCreate,
  errors,
}: {
  createTask: (task: TaskType) => void;
  setopenCreate: (data: boolean) => void;
  errors: TaskType;
}) => {
  const [taskData, settaskData] = useState({
    title: "",
    content: "",
    image: "",
    username: "bedo-2003",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    if (e.target.name === "image") {
      settaskData({
        ...taskData,
        image: e?.target?.files[0],
      });
    } else {
      settaskData({ ...taskData, [e?.target?.name]: e.target.value });
    }
  };

  return (
    <TaskModel onClick={() => setopenCreate(false)} ttl="create task">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTask(taskData);
        }}
      >
        <span className="text-red-800">{errors?.image}</span>
        <div className="flex flex-col gap-2 mt-3 mx-2">
          <input
            className="p-2 rounded-md outline-none"
            onChange={handleChange}
            type="text"
            placeholder="Title"
            name="title"
            id="title"
            required
          />

          <span className="text-red-800">{errors?.content}</span>
          <textarea
            className="p-2 rounded-md outline-none"
            onChange={handleChange}
            rows={4}
            cols={50}
            placeholder="Content"
            name="content"
          ></textarea>
          <input
            onChange={handleChange}
            type="file"
            name="image"
            id="image"
            accept=".png, .jpg, .jpeg"
            className=" border border-slate-400 p-2 rounded-md"
            required
          />
          <span className="text-red-800">{errors?.title}</span>
          <Button
            type="submit"
            text="create task"
            className="py-2 px-10 text-sm"
          />
        </div>
      </form>
    </TaskModel>
  );
};

export default CreateTaskModel;
