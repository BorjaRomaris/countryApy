import { Idd } from './../../interfaces/country';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { count, switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: '' // Agrega aquí la ruta a tu archivo CSS si tienes estilos
})
export class CountryPageComponent implements OnInit {

  public country?:Country ;
  constructor(
    private activatedRoute: ActivatedRoute,
    private servicio: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
     switchMap(({id})  => this.servicio.searchCountryByAlphaCode(id))
    )
    .subscribe(country => {
    if(!country){
      return this.router.navigateByUrl('');

    }
    this.country=country;
    return  console.log("existe el pais");

    })

    }


  searchCountry(code:string){

    this.servicio.searchCountryByAlphaCode(code).subscribe(country=>{
      console.log({country});
  });
}
}
