import { Component } from '@angular/core';
import { PortalHostDirective } from '@angular2-material/core/portal/portal-directives';
import { TemplatePortalDirective } from '@angular2-material/core/portal/portal-directives';
import { Portal } from '@angular2-material/core/portal/portal';
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { ComponentPortal } from '@angular2-material/core/portal/portal';

@Component({
  selector: 'portal-demo',
  template: require('./portal-demo.html'),
  styles: [require('./portal-demo.scss')],
  directives: [TemplatePortalDirective, PortalHostDirective]
})
export class PortalDemo {
  @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<Portal<any>>;

  selectedPortal: Portal<any>;

  get programmingJoke() {
    return this.templatePortals.first;
  }

  get mathJoke() {
    return this.templatePortals.last;
  }

  get scienceJoke() {
    return new ComponentPortal(ScienceJoke);
  }
}


@Component({
  selector: 'science-joke',
  template: `<p> 100 kilopascals go into a bar. </p>`
})
class ScienceJoke { }
