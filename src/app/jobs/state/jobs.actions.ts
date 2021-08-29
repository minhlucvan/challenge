import { createAction, props } from "@ngrx/store";
import { Job } from "../../shared/models/jobs";

// Fetch all jobs
export const getJobs = createAction("[Jobs API] Get Jobs");
export const getJobsSuccess = createAction(
  "[Jobs API] Get Jobs Success",
  props<{ jobs: Job[] }>()
);
export const getJobsError = createAction(
  "[Jobs API] Get Jobs Error",
  props<{ error: string }>()
);

// Adding Job Actions
export const addJobLoad = createAction("[Jobs API] Add Job Load");
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
