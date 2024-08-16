import { Component, ViewChild, AfterViewInit, NgZone, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout'
import { ChangeDetectionStrategy } from '@angular/compiler';
import { NewsServiceService } from './services/news-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'newsApp';
  @ViewChild(MatSidenav) sideNav!: MatSidenav;  
  articles: any;
  sources: any;
  selectedNewsChannel: string="Top 10 Trending News!";
  isLoading: boolean = false;

  ngOnInit(): void{
    this.getNewsArticles()
  }

  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef, private newsService: NewsServiceService){

  }


  ngAfterViewInit(): void {
      this.observer.observe(['(max-width: 787px)']).subscribe((res) => {
        if (res?.matches) {
          this.sideNav.mode = 'over';
          this.sideNav.close();
        } else {
          this.sideNav.mode = 'side';
          this.sideNav.open();
        }
      });
      this.cdr.detectChanges()
  }

  getNewsArticles(){
    this.isLoading = true;
    this.newsService.initArticles().subscribe((res: any) =>{
      this.isLoading = false;
      console.log("resuuu", res)
      this.articles = res.articles
    })

    this.newsService.getResources().subscribe((res: any) =>{
      this.isLoading = false;
      console.log("resuuu", res)
      this.sources = res.sources
    })
  }

  searchSource(src: any){
    this.isLoading = true;
    console.log("id", src)
    this.newsService.getNewsById(src.id).subscribe((data: any) =>{
      this.isLoading = false;
      this.articles = data.articles
    })
  }
}
