import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {
  apiKey = '4cb4db6a34ec40acb4f99ba26c9ff2d2'

  constructor(private http: HttpClient) { }

  getResources(){
    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.apiKey)
  }

  getNewsById(id: string){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + id + '&apiKey=' + this.apiKey)
  }

  initArticles() {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + this.apiKey);
  }
}
