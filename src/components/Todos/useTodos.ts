import type { IntersectionObserverHookRefCallback } from 'react-intersection-observer-hook';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import type { InfiniteData } from 'react-query';
import type { TodosQuery } from '../../generated';
import { useInfiniteTodosQuery } from '../../generated';
import { convertRemToPixels } from '../../utils';

const defaultPage = 1;
const pageSize = 10;

const useTodos = (): {
  data: InfiniteData<TodosQuery> | undefined;
  isFetching: boolean;
  sentryRef: IntersectionObserverHookRefCallback;
} => {
  const queryVariables = {
    page: defaultPage,
    limit: pageSize,
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isError } = useInfiniteTodosQuery(
    'page',
    queryVariables,
    {
      getNextPageParam: (_lastPage, allPages) => {
        // TODO: switch fakeQL implementation to generalize condition
        if (allPages.length < 5) {
          return { page: allPages.length + 1 };
        }

        return null;
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
