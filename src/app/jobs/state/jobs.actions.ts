import { createAction, props } from "@ngrx/store";
import { Job } from "../../shared/models/jobs";

// Fetch all jobs
export const getJobsMeta = createAction("[Jobs API] Get Jobs meta");
export const getJobsSuccess = createAction(
  "[Jobs API] Get Jobs Success",
  props<{ jobs: Job[] }>()
);
export const getJobsError = createAction(
  "[Jobs API] Get Jobs Error",
  props<{ error: string }>()
);

// Adding Job Actions
export const addJobSuccess = createAction(
  "[Jobs API] Add Job Success",
  props<{ job: Job }>()
);
export const addJobError = createAction(
  "[Jobs API] Add Job Error",
  props<{
    error: string;
  }>()
);

// TODO: add additional actions for other CRUD operations

export const addJob = createAction(
  "[Jobs API] Add New Job",
  props<{ job: Job }>()
);

export const deleteJob = createAction(
  "[Jobs API] Delete Job",
  props<{ job: Job }>()
);

export const deleteJobSuccess = createAction(
  "[Jobs API] Delete Job Success",
  props<{ job: Job }>()
);
export const deleteJobError = createAction(
  "[Jobs API] Delete Job Error",
  props<{
    error: string;
  }>()
);
export const updateJobSuccess = createAction(
  "[Jobs API] Update Job Success",
  props<{ job: Job }>()
);
export const updateJobError = createAction(
  "[Jobs API] Add Job Error",
  props<{
    error: string;
  }>()
);

// TODO: add additional actions for other CRUD operations

export const updateJob = createAction(
  "[Jobs API] Update Job",
  props<{ job: Job }>()
);
export const getJobById = createAction(
  "[Jobs API] Get Job By Id",
  props<{ id: string }>()
);
export const getJobByIdSuccess = createAction(
  "[Jobs API] Get Job By Id Success",
  props<{ job: Job | undefined }>()
);
export const getJobByIdFail = createAction(
  "[Jobs API] Get Job By Id Fail",
  props<{
    error: string;
  }>()
);
export const search = createAction(
  "[Jobs API] Search post",
  props<{ title?: string }>()
);
export const searchSuccess = createAction(
  "[Jobs API] Search post success",
  props<{ jobs: Job[] }>()
);

export const filterJob = createAction(
  "[Jobs API] filter jobs",
  props<{ type?: number; title?: string; company?: string, search?: string }>()
);
export const filterSuccess = createAction(
  "[Jobs API] filter job success",
  props<{ jobs: Job[] }>()
);
