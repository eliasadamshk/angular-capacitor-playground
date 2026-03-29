import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, withHooks, patchState } from '@ngrx/signals';
import { Post } from '../models/post';
import { ArticlesService } from '../services/articles.service';

type PostFilters = {
  user: number | null;
};

type ArticlesState = {
  posts: Post[];
  loading: boolean;
  filters: PostFilters;
};

const initialState: ArticlesState = {
  posts: [],
  loading: false,
  filters: { user: null },
};

export const ArticlesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    selectedPost: computed(() => store.posts().find((p) => p.current) ?? null),
    filteredPosts: computed(() => {
      const { user } = store.filters();
      return user === null ? store.posts() : store.posts().filter((p) => p.user === user);
    }),
    availableUserIds: computed(() =>
      [...new Set(store.posts().map((p) => p.user))].sort((a, b) => a - b)
    ),
  })),
  withMethods((store, articlesService = inject(ArticlesService)) => ({
    async loadPosts(): Promise<void> {
      patchState(store, { loading: true });
      const raw = await articlesService.getAll();
      const posts = raw.map((p) => ({
        user: p.userId,
        id: p.id,
        title: p.title,
        body: p.body,
        current: false,
      }));
      patchState(store, { posts, loading: false });
    },
    selectPost(id: number): void {
      patchState(store, (state) => ({
        posts: state.posts.map((p) => ({ ...p, current: p.id === id })),
      }));
    },
    setFilter(filters: Partial<PostFilters>): void {
      patchState(store, (state) => ({
        filters: { ...state.filters, ...filters },
      }));
    },
  })),
  withHooks({
    onInit(store) {
      store.loadPosts();
    },
  })
);
