import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from "../../services/movies.service";

import { Movie } from "../../interfaces/movie";

@Component({
  selector: 'edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent implements OnInit {

  @Input() movie: Movie;
  @Output() closeEvent = new EventEmitter();
  @Output() refreshEvent = new EventEmitter();
  movieForm: FormGroup;
  current_date = new Date();

  constructor(private moviesService: MoviesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.movieForm = this.fb.group({
      Title: [this.movie.Title, [Validators.required]],
      Year: [this.movie.Year, [Validators.required, Validators.min(1850),Validators.max(this.current_date.getFullYear())]],
      Runtime: [this.movie.Runtime, [Validators.required]],
      Genre: [this.movie.Genre, [Validators.required]],
      Director: [this.movie.Director, [Validators.required]]
    });
  }

  closePopUp() {
    this.closeEvent.emit();
  }

  edit_movie(e: Event) {
    e.preventDefault();
    let successe = this.moviesService.edit_movie(this.movie.imdbID, this.movieForm);
    if (successe) {
      this.refreshEvent.emit();
    }

    this.closePopUp();
  }


}