import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticlesStore } from '../../store/articles.store';

@Component({
  selector: 'app-article-detail',
  imports: [RouterLink],
  templateUrl: './article-detail.html',
})
export class ArticleDetailComponent implements OnInit {
  readonly store = inject(ArticlesStore);
  readonly id = input.required<string>();

  ngOnInit() {
    this.store.selectPost(Number(this.id()));
  }
}
