import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/model';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.css']
})
export class MovieDetailComponent implements OnInit {
  movie?: Movie;
  loading = true;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loading = true;

        // ✅ Use the new service method that includes credits
        this.movieService.getMovieWithCredits(id).subscribe({
          next: (data) => {
            this.movie = data;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error fetching movie:', err);
            this.loading = false;
          }
        });
      }
    });
  }
}
