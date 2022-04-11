import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = "transparent";
  @Input() highlightColor: string = "blue";

  @HostBinding("style.backgroundColor") backgroundColor: string;
  @HostBinding("style.color") fontColor: string;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   "background-color",
    //   "blue"
    // );
    // this.renderer.setStyle(this.elementRef.nativeElement, "color", "white");
    this.backgroundColor = this.defaultColor;
  }

  @HostListener("mouseenter") mouseOver(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   "background-color",
    //   "blue"
    // );
    // this.renderer.setStyle(this.elementRef.nativeElement, "color", "white");
    this.backgroundColor = this.highlightColor;
    this.fontColor = "white";
  }

  @HostListener("mouseleave") mouseLeave(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   "background-color",
    //   "transparent"
    // );
    // this.renderer.setStyle(this.elementRef.nativeElement, "color", "black");
    this.backgroundColor = this.defaultColor;
    this.fontColor = "black";
  }
}
