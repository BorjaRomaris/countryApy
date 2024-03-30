import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscribable, Subscription, debounceTime, pipe } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit,OnDestroy {

  private  dbouncer:Subject<string>=new Subject<string>();

  private debouncerSuscripcion?:Subscription;


  ngOnDestroy(): void {
    this.debouncerSuscripcion?.unsubscribe();
  }



  ngOnInit(): void {
    this.debouncerSuscripcion=this.dbouncer.subscribe(value=>{
      pipe(debounceTime(300))
     this.OnDebounce.emit(value)
     this.initialValue=value;

    })
  }

  @Output()
  public OnDebounce = new EventEmitter<string>();


@Input()
public initialValue:string='';

@Output()
 public onValue = new EventEmitter<string>();


emitValue(value:string){
this.onValue.emit(value);
}
onKeyPress(searchTerm:string){
  this.dbouncer.next(searchTerm);
  console.log(searchTerm)

}

  @Input()
  public placeholder:string ='';

}
