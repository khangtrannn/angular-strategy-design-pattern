import { bootstrapApplication, platformBrowser } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));