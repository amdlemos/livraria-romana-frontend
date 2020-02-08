import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export class BookFormGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}