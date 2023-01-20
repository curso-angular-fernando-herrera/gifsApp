import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey: string='dW1qtES8uZsjwjOsKRQBDcbuxrE4Cl4v';
  private _historial: string[]=[];

  public resultados: Gif[]=[];

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient) { }

  buscarGifs(query:string){
    query=query.trim().toLowerCase();
  
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
    }


    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=dW1qtES8uZsjwjOsKRQBDcbuxrE4Cl4v&q=${query}`)
    .subscribe((resp) =>{
        this.resultados=resp.data;
    });
    
  }



  
}
