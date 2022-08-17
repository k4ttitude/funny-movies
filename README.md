# create-t3-app

For more information about this stack, please refer from [T3.README.md](./T3.README.md)

# Features that would be implemented with extra timeline

- Pagination / Infinite loading for movies list
- Optimistic updates (adding movie, voting)
- Jobs queue to crawl Youtube video metadata (title, description)

# Lack of tests
There is only 1 test, run it with:
```sh
pnpm test
```

Despite having written 100%-code-coverage e2e tests for a backend system in the past, I don't often write test (especially unit-test) now. The main reason is that writing test-cases blocks the everyone in a rapid-growing product.
I'd like to talk more in person about this opinion.
