import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country, } from '../interfaces/country';
import { CacheStore, RegionCountries } from '../interfaces/cache.store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl:string='https://restcountries.com/v3.1'

private saveToLocalStorage(){
  localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore))
}
private loadFromLocalStorage(){
  if(!localStorage.getItem('cacheStore') )return;
  this.cacheStore=JSON.parse(localStorage.getItem('cacheStore')!);
}

  public cacheStore:CacheStore={
    byCapital:{term:'',countries:[]},
    byCountries:{term:'',countries:[]},
    byRegion:{region:'',countries:[]}
  }
  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }


  searchCountryByAlphaCode( code: string): Observable<Country | null>{
    const url=`${this.apiUrl}/alpha/${code}`;
   return  this.http.get<Country[]>(url)
   .pipe(
    map(countries=> countries.length>0?countries[0]:null) ,
    catchError(()=>of(null))
   )


     };

private getCountrysRequest(url:string):Observable<Country[]>{
  return this.http.get<Country[]>(url).pipe(catchError(()=>of([])
  ),
  delay(2000),
  );
}
  searchCapital( term: string): Observable<Country[]>{
    const url=`${this.apiUrl}/capital/${term}`;
   return  this.getCountrysRequest(url).pipe(
    tap(countries=>this.cacheStore.byCapital ={term,countries}),tap(()=>this.saveToLocalStorage())
   )
   ;

  }
   searchForCountry(term:string):Observable<Country[]>{
    const url=`${this.apiUrl}/name/${term}`;
    return  this.getCountrysRequest(url).pipe(
      tap(countries=> this.cacheStore.byCountries={term,countries}),
      tap(()=>this.saveToLocalStorage())
    );
   };

   searchForRegion(region:Region):Observable<Country[]>{

const url=`${this.apiUrl}/region/${region}`;
    return this.getCountrysRequest(url).pipe(
       tap(countries=>this.cacheStore.byRegion={region,countries}),
       tap(()=>this.saveToLocalStorage())
    );

   };



}
