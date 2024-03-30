import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Observable } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  constructor(private servicio:CountriesService){}
  public Countries:Country[]=[];
  public InitialValue:string=''

  ngOnInit(): void {
    this.Countries=this.servicio.cacheStore.byCountries.countries
    this.InitialValue=this.servicio.cacheStore.byCountries.term;
  }


  public filtrarCountry(country:string):void{
   this.servicio.searchForCountry(country).subscribe(countries=>{
    this.Countries=countries;
  });
  }
}
