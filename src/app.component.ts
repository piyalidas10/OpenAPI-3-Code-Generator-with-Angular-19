import { Component, inject, signal } from '@angular/core';
import { PostsService } from './openapi/services/posts.service';
import { Post } from './openapi/models/post';
import { PostsComponent } from './posts/posts.component';
import { LoaderService } from './loader/loader.service';
import { takeUntil } from 'rxjs';
import { onDestroy } from './util';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [PostsComponent, LoaderComponent],
  providers: [PostsService],
})
export class AppComponent {
  postsService = inject(PostsService);
  posts = signal<Post[]>([]);
  loaderService = inject(LoaderService);

  destroy$ = onDestroy();

  constructor() {
    this.loaderService.loadingOn();
    this.postsService
      .getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Post[]) => {
          this.posts.set(data);
          this.loaderService.loadingOff();
        },
        error: (err) => {
          console.error('Error: ' + err);
          this.loaderService.loadingOff();
        },
      });
  }
}
