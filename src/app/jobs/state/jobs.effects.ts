import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError, switchMap, tap } from "rxjs/operators";

import { JobsService } from "../../core/api/services/jobs.service";
import * as fromJobs from "./jobs.actions";
import { Router } from "@angular/router";

@Injectable()
export class JobsEffects {
  getJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.getJobsMeta),
      mergeMap((action) =>
        this.jobsService.getJobs().pipe(
          map((jobs) => fromJobs.getJobsSuccess({ jobs })),
          catchError((error) => of(fromJobs.getJobsError({ error })))
        )
      )
    )
  );
  addJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.addJob),
      switchMap((action) => {
        return this.jobsService.addJob(action.job).pipe(
          map((job) => fromJobs.addJobSuccess({ job })),
          tap(() => {
            this.router.navigate(["jobs"]).then();
          }),
          catchError((e) => {
            return of(fromJobs.addJobError({ error: e }));
          })
        );
      })
    )
  );
  getJobById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.getJobById),
      switchMap((action) =>
        this.jobsService.getJobById(action.id).pipe(
          map((job) => fromJobs.getJobByIdSuccess({ job })),
          catchError((error) => of(fromJobs.getJobByIdFail({ error })))
        )
      )
    )
  );
  deleteJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.deleteJob),
      switchMap((action) =>
        this.jobsService.deleteJob(action.job.id!).pipe(
          map(() => fromJobs.deleteJobSuccess({ job: action.job })),
          catchError((error) => of(fromJobs.deleteJobError({ error })))
        )
      )
    )
  );
  updateJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.updateJob),
      switchMap((action) =>
        this.jobsService.updateJob(action.job).pipe(
          map(() => fromJobs.updateJobSuccess({ job: action.job })),
          tap(() => {
            this.router.navigate(["jobs"]).then();
          }),
          catchError((error) => of(fromJobs.updateJobError({ error })))
        )
      )
    )
  );
  filterJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.filterJob),
      switchMap((action) => {
        return this.jobsService.filterJobs(action).pipe(
          map((jobs) => {
            return fromJobs.filterSuccess({ jobs });
          })
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private jobsService: JobsService,
    private router: Router
  ) {}
}
