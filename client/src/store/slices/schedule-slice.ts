import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";
import { ENV } from "../../env";
import { ScheduleUnitDto } from "../../types/tasks/ScheduleUnitDto";

export enum ScheduleStatus {
  IDLE,
  LOADING,
  LOADED,
  ERROR,
}

type ScheduleState = {
  status: ScheduleStatus;
  error: string | undefined;
  scheduleUnits: ScheduleUnitDto[];
};

const initialState: ScheduleState = {
  error: undefined,
  status: ScheduleStatus.IDLE,
  scheduleUnits: [],
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadSchedule.fulfilled, (state, { payload }) => {
      state.error = "";
      state.status = ScheduleStatus.LOADED;
      state.scheduleUnits = payload;
    });
    builder.addCase(loadSchedule.pending, (state) => {
      state.status = ScheduleStatus.LOADING;
      state.error = "";
    });
    builder.addCase(loadSchedule.rejected, (state, { error }) => {
      state.status = ScheduleStatus.ERROR;
      state.error = error.message;
    });
  },
});

export const loadSchedule = createAsyncThunk<ScheduleUnitDto[]>(
  "schedule/loadSchedule",
  async () => {
    return (
      await axiosInstance<ScheduleUnitDto[]>(
        `${ENV.schedulerApiPrefix}/scheduler`
      )
    ).data.sort((unit1, unit2) =>
      unit1.executionStart > unit2.executionStart
        ? 1
        : unit1.executionStart === unit2.executionStart
        ? 0
        : -1
    );
  }
);

export const scheduleReducer = scheduleSlice.reducer;
