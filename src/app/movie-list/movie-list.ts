import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/model';
import { GenreNamePipe } from '../genre.pipe';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule, GenreNamePipe],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movieService.getKidsMovies().subscribe({
      next: (data) => (this.movies = data.results),
      error: (err) => console.error(err)
    });
  }

  openDetails(movie: Movie) {
    this.router.navigate(['/movie', movie.id]);
  }
}
