import { BadInput } from './../common/bad-input';
import { AppError } from './../common/app-error';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  constructor(private service: PostService) {
  }
  ngOnInit() {
    this.service.getPost()
      .subscribe(response => {
        this.posts = response.json().splice(0, 4);
      });
  }
  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    input.value = '';
    this.service.createPost(post)
      .subscribe(response => {
        //console.log(response);
        post.id = response.json().id;
        this.posts.splice(0, 0, post);
      },
        (error: AppError) => {
          if (error instanceof BadInput) {
            //this.form.setErrors(error.originalError);
          }

          else {
            alert('an expected error occured.');
            console.log(error);
          }
        });
  }
  updatePost(post) {
    this.service.updatePost(post)
      .subscribe(response => {
        console.log(response.json());
      },
        error => {
          alert('An unexpected error occured.');
          console.log(error);
        });
  }
  deletePost(post) {
    this.service.deletePost(399)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
        (error: AppError) => {
          if (error instanceof NotFoundError)
            alert('This post already deleted.');
          else {
            alert('an unexpected error occured.');
            console.log(error);
          }
        });
  }
}
