import {Component, ElementRef, ViewChildren, QueryList, ViewEncapsulation} from 'angular2/core';
import {
  Overlay,
  OverlayState} from '@angular2-material/core/overlay/overlay';
import {ComponentPortal, Portal} from '@angular2-material/core/portal/portal';
import {TemplatePortalDirective} from '@angular2-material/core/portal/portal-directives';


@Component({
  selector: 'overlay-demo',
  template: require('./overlay-demo.html'),
  styles: [ require('./overlay-demo.scss')],
  directives: [TemplatePortalDirective],
  providers: [Overlay],
  encapsulation: ViewEncapsulation.None,
})
export class OverlayDemo {
  nextPosition: number = 0;

  @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<Portal<any>>;

  constructor(public overlay: Overlay, public elementRef: ElementRef) { }

  openRotiniPanel() {
    let config = new OverlayState();

    config.positionStrategy = this.overlay.position()
        .global()
        .left(`${this.nextPosition}px`)
        .top(`${this.nextPosition}px`);

    this.nextPosition += 30;

    this.overlay.create(config).then(ref => {
      ref.attach(new ComponentPortal(PastaPanel, this.elementRef));
    });
  }

  openFusilliPanel() {
    let config = new OverlayState();

    config.positionStrategy = this.overlay.position()
        .global()
        .centerHorizontally()
        .top(`${this.nextPosition}px`);

    this.nextPosition += 30;

    this.overlay.create(config).then(ref => {
      ref.attach(this.templatePortals.first);
    });
  }
}

/** Simple component to load into an overlay */
@Component({
  selector: 'pasta-panel',
  template: '<p class="demo-rotini">Rotini {{value}}</p>'
})
class PastaPanel {
  value: number = 9000;
}
