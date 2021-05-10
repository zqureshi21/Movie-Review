import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieDetailsService } from 'src/app/services/movie-details.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  @Input()comment: any;
  commentForm:FormGroup
  selected = ""

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private movieDetailService:MovieDetailsService) {
    this.commentForm = this.formBuilder.group({
      comment: '',
      rating: ''
    });
  }

  // @ts-ignore
  rating(e){
    this.selected = e.target.getAttribute("data-line");
  }

  submit() {
    this.movieDetailService.editComment(this.commentForm.value, this.comment.id).subscribe(data => console.log(data), (err: any) => console.log(err))
    this.activeModal.close(this.commentForm.value);
    window.location.reload();
  }

  ngOnInit(): void {
  }

}
