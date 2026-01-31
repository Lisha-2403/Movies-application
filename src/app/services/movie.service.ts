import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Movie } from '../models/model';
import { secret } from '../../environments/environment.secret'; // <-- import secret

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = secret.movieApiKey;  
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Fetch kids movies
  getKidsMovies(): Observable<{ results: Movie[] }> {
    const page1$ = this.http.get<{ results: Movie[] }>(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=10751&language=en-US&page=1`
    );

    const page2$ = this.http.get<{ results: Movie[] }>(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=10751&language=en-US&page=2`
    );

    return forkJoin([page1$, page2$]).pipe(
      map(([page1, page2]) => ({ results: [...page1.results, ...page2.results] }))
    );
  }

  // Fetch single movie details
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`
    );
  }

  // Fetch credits (cast + crew)
  getMovieCredits(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}&language=en-US`
    );
  }

  // Fetch movie with director + cast
  getMovieWithCredits(id: number): Observable<Movie> {
    return this.getMovieById(id).pipe(
      switchMap((movie) =>
        this.getMovieCredits(id).pipe(
          map((credits) => {
            const director = credits.crew.find((c: any) => c.job === 'Director');
            movie.director = director ? director.name : 'Unknown';
            movie.cast = credits.cast.slice(0, 5).map((c: any) => c.name);
            return movie;
          })
        )
      )
    );
  }
}
