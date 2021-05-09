import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  movies: any;
  searchQuery: string = '';

  constructor(private router: Router, private movieService: MoviesService) { }

  getMovies(){
    this.movieService.getMovies().subscribe(data =>{
      this.movies = data;
    })
  }

  ngOnInit(): void {
    if (!localStorage.getItem('id_token')){
      this.router.navigateByUrl('login')
    }
    this.getMovies();
  }

}
