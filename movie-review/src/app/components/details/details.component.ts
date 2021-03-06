import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder} from '@angular/forms';
import { MovieDetailsService } from 'src/app/services/movie-details.service';
import { MoviesService } from 'src/app/services/movies.service';
import {EditCommentComponent} from "../edit-comment/edit-comment.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  isOpen = false;

  constructor(private route: ActivatedRoute, private movieDetailService:MovieDetailsService,private movieService: MoviesService, private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.commentForm = this.formBuilder.group({
      comment: '',
      rating: ''
    })
  }

  abilityToEdit(comment: { users_id: any; }){
    if (comment.users_id == this.user.id){
      return true
    } else{
      return false
    }
  }

  openEditModal(comment: any){
    const modal = this.modalService.open(EditCommentComponent);
    modal.componentInstance.comment = comment
    modal.result.then((result: any) => {
      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }

  abilityToDelete(comment: { users_id: any; }){
    if (comment.users_id == this.user.id){
      return true
    } else{
      return false
    }
  }

  deleteComment(id: any){
    this.movieDetailService.deleteComment(id).subscribe((data: any) => console.log(data))
    window.location.reload();
  }

  getRating(ratings: number[]): number{
    return ratings.reduce((a, b) => a + b) / ratings.length;
  }

  // @ts-ignore
  ratingInput(e){
    this.isOpen = this.modalService.hasOpenModals();
    if(!this.isOpen) {
      this.selected = e.target.getAttribute("data-line");
    }
  }

  submit() {
    this.movieDetailService.addComment(this.commentForm.value, this.movie.id, this.user.id, this.user.username).subscribe(data => console.log(data), (err: any) => console.log(err))
    window.location.reload();
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
      this.user = data
    })
  }

}
