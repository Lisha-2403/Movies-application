import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MovieListComponent } from './app/movie-list/movie-list';
import { MovieDetailComponent } from './app/movie-detail/movie-detail';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterOutlet],
  template: `
  <h1 class="app-title">Morviees</h1>
  <router-outlet></router-outlet>
`,
styles: [`
  .app-title {
    text-align: left;
  padding: 20px 20px 10px 20px;
  font-size: 3rem;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;

  /* Lighter Gradient Text */
  background: linear-gradient(90deg,rgb(255, 61, 158) 0%,rgb(250, 70, 196) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow: 2px 2px 5px rgba(0,0,0,0.4);
  }
`]
    
})
class AppRoot {}

bootstrapApplication(AppRoot, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: MovieListComponent },
      { path: 'movie/:id', component: MovieDetailComponent }
    ])
  ]
}).catch(err => console.error(err));
