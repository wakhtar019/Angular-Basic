import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  getAuthors(){
    return ["Author1", "author2","Author1", "author2"];
  }
}
