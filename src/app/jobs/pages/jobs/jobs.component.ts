import { FilterCategory } from "./../../state/jobs.reducer";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Job, JobsFilter } from "../../../shared/models/jobs";
import * as fromJobs from "../../state/jobs.reducer";
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators";
import { filterJob, getJobsMeta, search } from "../../state/jobs.actions";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
})
export class JobsComponent implements OnInit, OnDestroy {
  readonly jobs$: Observable<Job[]> = this.store.pipe(select(fromJobs.selectJobs)).pipe();
  readonly jobsFilter$: Observable<JobsFilter> = this.store.pipe(select(fromJobs.selectJobsFilter)).pipe();
  readonly loading$: Observable<boolean> = this.store.pipe(select(fromJobs.selectLoading)).pipe();
  readonly empty$: Observable<boolean> =this.store.pipe(select(fromJobs.selectEmpty)).pipe();
  readonly filterCategory$: Observable<FilterCategory> = this.store
    .pipe(select(fromJobs.filterCategory))
    .pipe();
  add = faPlus;
  filterForm!: FormGroup;
  subscriptions: Subscription[] = [];
  constructor(private store: Store, private fb: FormBuilder) {
    this.filterForm = fb.group({
      title: [""],
      company: [""],
      jobType: ["-1"],
      search: '',
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getJobsMeta())
    const filterSub = this.jobsFilter$.subscribe(filter => {
      this.filterForm.patchValue(filter, { emitEvent: false, onlySelf: true });
    })
    this.subscriptions.push(filterSub);

    const filterFormSub = this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) == JSON.stringify(curr)),
      debounceTime(400)
    )
      .subscribe((filter) => {
        this.store.dispatch(filterJob(filter));
      });
    this.subscriptions.push(filterFormSub);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  readonly jobType = [
    { value: '-1', label: "All" },
    { value: '0', label: "Full time" },
    { value: '1', label: "Part time" },
  ];
}
