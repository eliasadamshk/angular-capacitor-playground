import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiPost } from '../models/api-response';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  getAll(): Promise<ApiPost[]> {
    return firstValueFrom(this.http.get<ApiPost[]>(`${this.baseUrl}/posts`));
  }
}
