import axios from "axios";
import { FC, useEffect, useState } from "react";
import TaskModel from "./TaskModel";

interface SingleTaskModelProps {}

const SingleTaskModel: FC<SingleTaskModelProps> = ({
  setopenSingle,
  taskId,
  task,
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
    <>
      <TaskModel onClick={() => setopenSingle(false)} ttl="single task">
        <div className="mt-5 mx-4 flex gap-4 items-center">
          <img
            src={
              "https://task.ecmpp.com/storage/" +
              task?.image?.split("public/")[1]
            }
            alt="img"
            className="rounded-md w-20 h-20 cursor-pointer "
            onChange={handleChange}
          />
          <div>
            <h2 onChange={handleChange} className="text-xl font-semibold">
              {task.title}
            </h2>
            <p onChange={handleChange} className="text-sm">
              {task.content}
            </p>
          </div>
        </div>
      </TaskModel>
    </>
  );
};

export default SingleTaskModel;
