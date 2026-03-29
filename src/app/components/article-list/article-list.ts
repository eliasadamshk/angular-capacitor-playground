import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticlesStore } from '../../store/articles.store';

@Component({
  selector: 'app-article-list',
  imports: [RouterLink],
  templateUrl: './article-list.html',
})
export class ArticleListComponent {
  readonly store = inject(ArticlesStore);

  onFilterChange({ target }: Event): void {
    this.store.setFilter({ user: +(target as HTMLSelectElement).value || null });
  }
}
