import { BadInput } from './../common/bad-input';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = "https://jsonplaceholder.typicode.com/posts";
  constructor(private http: Http) { }

  getPost() {
    return this.http.get(this.url);
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post)).pipe(
      map(data => {
        return data;
      }),
      catchError((error: Response) => {
        if (error.status === 400) {
          return throwError(new BadInput(error.json()));
        }
        return throwError(new AppError(error.json()));
      })
    )
  }

  updatePost(post) {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))
  }

  deletePost(id) {
    return this.http.delete(this.url + '/' + id).pipe(
      map(data => {
        return data;
      }),
      catchError((error: Response) => {
        if (error.status === 404) {
          return throwError(new NotFoundError());
        }
        return Observable.throw(new AppError(error));
      })
    )
  }
}
