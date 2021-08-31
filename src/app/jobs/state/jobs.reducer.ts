import { Job, JobsFilter } from "./../../shared/models/jobs";
import {
  createReducer,
  on,
  Action,
  createFeatureSelector,
  createSelector,
  createAction,
} from "@ngrx/store";

import * as jobsActions from "./jobs.actions";

export interface FilterCategory {
  title: string[];
  company: string[];
}

export interface State {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  selected?: Job | null;
  filterCategory: FilterCategory;
  filter: JobsFilter;
}

const initialState: State = {
  jobs: [],
  loading: false,
  error: null,
  selected: null,
  filterCategory: { title: ["All"], company: ["All"] },
  filter: {
    title: "All",
    company: "All",
    jobType: "-1",
    search: '',
  },
};

// @ts-ignore
const jobsReducer = createReducer<State>(
  initialState,
  on(jobsActions.getJobsMeta, (state) => ({
    ...state,
    loading: true,
    selected: null,
    error: null,
  })),
  on(jobsActions.getJobsSuccess, (state, { jobs }) => {
    let filterCategory: FilterCategory = { title: ["All"], company: ["All"] };
    jobs.forEach((item) => {
      if (item.title && item.company) {
        if (filterCategory.title.indexOf(item.title) == -1) {
          filterCategory.title.push(item.title);
        }
        if (filterCategory.company.indexOf(item.company) == -1) {
          filterCategory.company.push(item.company);
        }
      }
    });
    return {
      ...state,
      filterCategory: filterCategory,
      loading: false,
      error: null,
    };
  }),
  on(jobsActions.getJobsError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(jobsActions.addJob, (state, { job }) => ({
    ...state,
    loading: true,
    selected: job,
  })),
  on(jobsActions.addJobSuccess, (state, { job }) => ({
    ...state,
    loading: false,
    jobs: [...state.jobs, job],
  })),
  on(jobsActions.addJobError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(jobsActions.deleteJob, (state, { job }) => ({
    ...state,
    loading: true,
    selected: job,
  })),
  on(jobsActions.deleteJobSuccess, (state, { job }) => {
    const data = state.jobs.filter((item) => item.id !== job.id);
    return { ...state, jobs: data, loading: false, selected: null };
  }),
  on(jobsActions.deleteJobError, (state, { error }) => {
    return { ...state, loading: false, error: error };
  }),
  on(jobsActions.updateJob, (state, { job }) => {
    return {
      ...state,
      loading: true,
      selected: job,
    };
  }),
  on(jobsActions.updateJobSuccess, (state, { job }) => {
    const index = state.jobs.findIndex((item) => {
      return item.id === job.id;
    });
    if (index >= 0) {
      const data = [
        ...state.jobs.slice(0, index),
        job,
        ...state.jobs.slice(index + 1),
      ];
      return { ...state, jobs: data, error: null, loading: false };
    }
    return { ...state, error: null, loading: false };
  }),
  on(jobsActions.updateJobError, (state, { error }) => {
    return { ...state, loading: false, error: error };
  }),
  on(jobsActions.getJobById, (state, { id }) => {
    return { ...state, selected: null, loading: false };
  }),
  on(jobsActions.getJobByIdSuccess, (state, { job }) => {
    return { ...state, selected: job };
  }),
  on(jobsActions.getJobByIdFail, (state, { error }) => {
    return { ...state, loading: false, error: error };
  }),
  on(jobsActions.searchSuccess, (state, { jobs }) => {
    return {
      ...state,
      jobs,
    };
  }),
  on(jobsActions.filterJob, (state, filter) => {
    return {
      ...state,
      jobs: [],
      loading: true,
      filter
    }
  }),
  on(jobsActions.filterSuccess, (state, { jobs }) => {
    return {
      ...state,
      loading: false,
      jobs,
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return jobsReducer(state, action);
}

export const selectJobsState = createFeatureSelector<State>("jobsFeature");
export const selectJobs = createSelector(
  selectJobsState,
  (state) => state.jobs
);
export const selectJobsFilter = createSelector(
  selectJobsState,
  (state) => state.filter
);
export const selectedJobSelector = createSelector(
  selectJobsState,
  (state) => state.selected
);
export const filterCategory = createSelector(
  selectJobsState,
  (state) => state.filterCategory
);
export const selectLoading = createSelector(
  selectJobsState,
  (state) => state.loading
);
export const selectEmpty = createSelector(
  selectJobsState,
  (state) => !state.loading && state.jobs.length == 0
);