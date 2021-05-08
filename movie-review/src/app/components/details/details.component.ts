import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MovieDetailsService } from 'src/app/services/movie-details.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  movieId: number=0;
  movie: any={};
  cast: string[]=[];
  comments: any[]=[];
  values: any[]=[];
  rating: number=0;
  user: any={};

  @Input()comment: any;
  @Input()userInput: any = {};
  @Input()movieInput: any = {};
  commentForm: FormGroup;
  selected = "";
  rate: number = 0;

  constructor(private route: ActivatedRoute, private movieDetailService:MovieDetailsService,private movieService: MoviesService, private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      comment: '',
      rating: ''
    })
  }

  abilityToDelete(comment: { username: any; }){
    if (comment.username == this.user.username){
      return true
    } else{
      return false
    }
  }

  deleteComment(id: any){
    this.movieDetailService.deleteComment(id).subscribe((data: any) => console.log(data))
    window.location.reload();
  }

  showRating(rating: number){
    let res = ''
    if (rating > 0 && rating <= 1) {
      res = "Very Bad";
    } else if (rating > 1 && rating <= 2){
      res = "Bad";
    } else if(rating > 2 && rating <= 3){
      res = "Mediocre";
    } else if (rating > 3 && rating <= 4){
      res = "Good";
    } else if(rating > 4 && rating <= 5){
      res = "Great";
    }
    return res
  }

  getRating(ratings: number[]): number{
    return ratings.reduce((a, b) => a + b) / ratings.length;
  }

  // @ts-ignore
  ratingInput(e){
    this.selected = e.target.getAttribute("data-line");
  }

  submitForm() {
    console.log(this.commentForm.value, this.movie.id, this.user.id, this.user.username);
    this.movieDetailService.addComment(this.commentForm.value, this.movie.id, this.user.id, this.user.username).subscribe(data => console.log(data), (err: any) => console.log(err))
    // window.location.reload();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = +params['id']
    })

    this.movieDetailService.getMovie(this.movieId).subscribe((data)=>{
      this.movie=data
      this.cast=data.cast.split(',')
    })

    this.movieDetailService.getComments(this.movieId).subscribe((data)=>{
      this.comments=data
      if (data !== []){
        data.forEach((c: { rating: any; }) => this.values.push(c.rating))
        this.rating = this.values.reduce((a,b)=>a+b)/this.values.length
      }
    }, (err: any) => console.log(err))
    this.movieService.getUser().subscribe((data) => {
      console.log(data)
      this.user = data
    })
  }

}
