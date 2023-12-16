import { FC, useEffect, useState } from "react";
import Button from "../ui/Button";
import axios from "axios";
import TaskModel from "./TaskModel";

interface UpdateTaskModelProps {}

const UpdateTaskModel: FC<UpdateTaskModelProps> = ({
  updateTask,
  setopenUpdate,
  errors,
  taskId,
}) => {
  const [taskData, settaskData] = useState({
    title: "",
    content: "",
    image: "",
    username: "bedo-2003",
  });

  const handleChange = (e) => {
    if (e.target?.name === "image") {
      settaskData({
        ...taskData,
        image: e.target.files[0],
      });
    } else {
      settaskData({ ...taskData, [e?.target?.name]: e.target.value });
    }
  };

  const getTask = async (id) => {
    const { data } = await axios.get(
      "https://task.ecmpp.com/api/task/Show/" + id
    );
    settaskData({
      title: data.title,
      content: data.content,
      id: data.id,
    });
  };

  useEffect(() => {
    getTask(taskId);
  }, [taskId]);

  return (
    <TaskModel onClick={() => setopenUpdate(false)} ttl="update task">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateTask(taskData);
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
            value={taskData.title}
          />
          <span className="text-red-800">{errors?.content}</span>
          <textarea
            className="p-2 rounded-md outline-none"
            onChange={handleChange}
            rows={4}
            cols={50}
            placeholder="Content"
            name="content"
            value={taskData.content}
          ></textarea>
          <input
            onChange={handleChange}
            type="file"
            name="image"
            id="image"
            accept=".png, .jpg, .jpeg"
            className=" border border-slate-400 p-2 rounded-md"
          />
          <span className="text-red-800">{errors?.title}</span>
          <Button
            type="submit"
            text="update task"
            className="py-2 px-10 text-sm"
          />
        </div>
      </form>
    </TaskModel>
  );
};

export default UpdateTaskModel;
