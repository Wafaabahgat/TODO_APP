import axios from "axios";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CreateTaskModel from "./models/CreateTaskModel";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import Button from "./ui/Button";
import UpdateTaskModel from "./models/UpdateTaskModel";
import { TaskType } from "./type";
import Card from "./models/Card";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [allTasks, setallTasks] = useState([]);
  const [openCreate, setopenCreate] = useState(false);
  const [openUpdate, setopenUpdate] = useState(false);

  const [createErrors, setcreateErrors] = useState(false);
  const [taskID, settaskID] = useState<string | undefined>("");

  const getAllTasks = async () => {
    const { data } = await axios.get(
      "https://task.ecmpp.com/api/task/all/bedo-2003"
    );
    setallTasks(data);
  };

  // DELETE
  const deleteTask = async (taskID?: string) => {
    await axios
      .delete("https://task.ecmpp.com/api/task/remove/" + taskID)
      .then((res) => {
        toast.success(res?.data?.success);
        getAllTasks();
      })
      .catch((err) => {
        return toast.error(err);
      });
  };

  // UPDATE
  const updateTask = async (taskData: TaskType) => {
    await axios
      .post(`https://task.ecmpp.com/api/task/edit`, taskData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success(res?.data?.success);
        getAllTasks();
      })
      .catch((err) => {
        setcreateErrors(err?.response?.data);
      });
  };

  // SINGLE
  const singleTask = async (taskData: TaskType) => {
    await axios.get(`https://task.ecmpp.com/api/task/Show/` + taskData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // CREATE
  const createTask = async (taskData: TaskType) => {
    if ((taskData?.title as string)?.length < 3) {
      return toast.error("The title must be at least 3 characters.");
    }
    await axios
      .post("https://task.ecmpp.com/api/task/add", taskData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(res?.data?.success);
        setopenCreate(false);
        getAllTasks();
      })
      .catch((err) => {
        setcreateErrors(err?.response?.data);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="relative w-[60%] mx-auto">
      <h1 className="font-bold text-center text-4xl mb-4 text-slate-600">
        Todo App
      </h1>
      <div className="mb-5">
        <Button
          onClick={() => setopenCreate(true)}
          className="w-full py-2 px-6 text-xl"
          text="create new task"
        />
        {openCreate && (
          <CreateTaskModel
            setopenCreate={setopenCreate}
            createTask={createTask}
            errors={createErrors}
          />
        )}
      </div>
      <div className="grid grid-cols-card gap-14 py-7">
        
        {allTasks?.map((e: TaskType, i) => (
          <Card key={i} task={e} singleTask={singleTask} taskId={taskID}>
            <div
              key={i}
              className="flex gap-2 items-center justify-end pt-5 text-2xl"
            >
              <button
                type="button"
                className="text-green-800"
                onClick={() => {
                  settaskID(e?.id);
                  setopenUpdate(true);
                }}
              >
                <AiFillEdit className="active:scale-95 cursor-pointer text-green-700" />
              </button>
              <button
                type="button"
                onClick={() => deleteTask(e?.id)}
                className="text-red-800"
              >
                <AiOutlineDelete className="active:scale-95 cursor-pointer text-red-800" />
              </button>
            </div>
          </Card>
        ))}
        {openUpdate && (
          <UpdateTaskModel
            taskId={taskID}
            setopenUpdate={setopenUpdate}
            updateTask={updateTask}
            errors={createErrors}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

{
  /* <table className="min-w-[300px]">
          <thead>
            <tr className=" capitalize">
              <th>image</th>
              <th>title</th>
              <th>content</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {allTasks?.map((t: TaskType) => (
              <tr key={t?.id}>
                <td>
                  <img
                    src={
                      "https://task.ecmpp.com/storage/" +
                      t?.image?.split("public/")[1]
                    }
                    alt="img"
                    className="rounded-md w-20 h-20 cursor-pointer"
                  />
                </td>
                <td>{t?.title}</td>
                <td>{t?.content}</td>
                <td>
                  <div className="flex gap-2 items-center px-2">
                    <button
                      className="text-green-800"
                      onClick={() => {
                        settaskID(t?.id);
                        setopenUpdate(true);
                      }}
                    >
                      <AiFillEdit className="active:scale-95 cursor-pointer text-green-700" />
                    </button>
                    {openUpdate && (
                      <UpdateTaskModel
                        taskId={taskID}
                        setopenUpdate={setopenUpdate}
                        updateTask={updateTask}
                        errors={createErrors}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => deleteTask(t?.id)}
                      className="text-red-800"
                    >
                      <AiOutlineDelete className="active:scale-95 cursor-pointer text-red-800" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */
}
