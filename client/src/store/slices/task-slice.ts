import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENV } from "../../env";
import {
  Task,
  TaskCreatePayload,
  TaskUpdatePayload,
} from "../../types/tasks/Task";
import axios from "axios";

export enum TasksStatus {
  IDLE,
  LOADING,
  LOADED,
  ERROR,
}

type TasksState = {
  status: TasksStatus;
  error: string | undefined;
  tasks: Task[];
};

const initialState: TasksState = {
  error: undefined,
  status: TasksStatus.IDLE,
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadTasks.fulfilled, (state, { payload }) => {
      state.error = "";
      state.status = TasksStatus.LOADED;
      state.tasks = payload;
    });
    builder.addCase(loadTasks.pending, (state) => {
      state.status = TasksStatus.LOADING;
      state.error = "";
    });
    builder.addCase(loadTasks.rejected, (state, { error }) => {
      state.status = TasksStatus.ERROR;
      state.error = error.message;
    });

    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.tasks.unshift(payload);
    });

    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      if (payload) {
        state.tasks = state.tasks.map((task) => (task.id === payload.id ? payload : task));
      }
    });

    builder.addCase(completeTask.fulfilled, (state, { meta: { arg } }) => {
      state.tasks = state.tasks.filter((task) => task.id !== arg);
    });

    builder.addCase(deleteTask.fulfilled, (state, { meta: { arg } }) => {
      state.tasks = state.tasks.filter((task) => task.id !== arg);
    });
  },
});

export const loadTasks = createAsyncThunk<Task[]>(
  "tasks/loadTasks",
  async () => {
    return (await axios<Task[]>(`${ENV.tasksApiPrefix}/tasks`)).data;
  }
);

export const createTask = createAsyncThunk<Task, TaskCreatePayload>(
  "tasks/createTask",
  async (newTask) => {
    const resp = await axios.post<Task>(`${ENV.tasksApiPrefix}/tasks`, newTask);
    return resp.data;
  }
);

export const updateTask = createAsyncThunk<
  Task | null,
  { id: string; payload: TaskUpdatePayload }
>("tasks/updateTask", async ({ id, payload }) => {
  const resp = await axios.patch<Task>(
    `${ENV.tasksApiPrefix}/tasks/${id}`,
    payload
  );
  return resp.data;
});

export const completeTask = createAsyncThunk<void, string>(
  "tasks/completeTask",
  async (taskId) => {
    await axios.delete(`${ENV.tasksApiPrefix}/tasks/${taskId}`);
  }
);

export const deleteTask = createAsyncThunk<void, string>(
  "tasks/deleteTask",
  async (taskId) => {
    await axios.delete(`${ENV.tasksApiPrefix}/tasks/${taskId}`);
  }
);

export const tasksReducer = tasksSlice.reducer;
