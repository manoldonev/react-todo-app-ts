import type { IntersectionObserverHookRefCallback } from 'react-intersection-observer-hook';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import type { InfiniteData } from 'react-query';
import { useAtom } from 'jotai';
import type { TodosQuery } from '../../../../generated';
import { useInfiniteTodosQuery } from '../../../../generated';
import { convertRemToPixels } from '../../../../utils';
import { queryAtom } from '../../../layout/Header';

const enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

const pageIndex = 1;
const pageSize = 10;
const sortField = 'id';
const sortDirection = SortDirection.Descending;

const useTodos = (): {
  data: InfiniteData<TodosQuery> | undefined;
  isFetching: boolean;
  sentryRef: IntersectionObserverHookRefCallback;
} => {
  const [query] = useAtom(queryAtom);
  let input = null;
  if (query !== '') {
    // TODO: case-insensitive search
    input = { task_contains: query };
  }

  const queryVariables = {
    page: pageIndex,
    limit: pageSize,
    input,
    sort: sortField,
    direction: sortDirection,
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isError } = useInfiniteTodosQuery(
    'page',
    queryVariables,
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.todos == null || lastPage.todos.length < pageSize) {
          return null;
        }

        return { page: allPages.length + 1 };
      },
    },
  );

  const [sentryRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: hasNextPage ?? false,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: `0px 0px ${convertRemToPixels(6.25)}px 0px`,
  });

  const isFetching = isFetchingNextPage || (hasNextPage ?? false);

  return { data, isFetching, sentryRef };
};

export { useTodos };
