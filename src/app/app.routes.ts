import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  {
    path: 'articles',
    loadComponent: () =>
      import('./components/article-list/article-list').then((m) => m.ArticleListComponent),
  },
  {
    path: 'articles/:id',
    loadComponent: () =>
      import('./components/article-detail/article-detail').then((m) => m.ArticleDetailComponent),
  },
];
