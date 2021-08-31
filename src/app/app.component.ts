import { Component } from "@angular/core";
import * as jobsActions from "./jobs/state/jobs.actions";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "challenge";
  constructor(private store: Store) {
  }
}
