import { Component, effect, input } from '@angular/core';
import { Post } from '../openapi/models/post';

@Component({
  selector: 'app-posts',
  imports: [],
  standalone: true,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts = input.required<Post[]>();

  constructor() {
    effect(() => {
      console.log(this.posts());
    });
  }
}
