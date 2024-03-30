import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';




@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  constructor( private servicio:CountriesService){

  }
  ngOnInit(): void {
    this.selectedRegion=this.servicio.cacheStore.byRegion.region;
    this.countries=this.servicio.cacheStore.byRegion.countries;
  }
  public regions:Region[]=['Africa','America','Asia','Europe','Oceania'];
  public countries:Country[]=[];
  public selectedRegion?:Region;

  public buscarporregion(region:Region ){
    this.servicio.searchForRegion(region).subscribe(listadoregion=>{
      this.selectedRegion=region
      this.countries=listadoregion;
    })
  }


}
