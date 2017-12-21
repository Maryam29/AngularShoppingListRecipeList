import { Directive, HostListener, HostBinding  } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.open') openDropdown: boolean = false;
  
  @HostListener('click') toggleOpen(eventData: Event) {
    this.openDropdown = !this.openDropdown;
  }
  constructor() { }

}
