import { ApolloClient, NormalizedCacheObject, InMemoryCache, makeVar } from '@apollo/client';
import { ValidLimits } from './components/types';
import { Author, FilterInput, PaginatedBooks, SortInput } from './generated/graphql';

/**
 * Reactive variable for the pagination
 */
export const offsetVar = makeVar<number>(0);

/**
 * Reactive variable for the pagination
 */
export const limitVar = makeVar<ValidLimits>(10);

/**
 * Reactive variable for sorting
 */
export const sortVar = makeVar<SortInput[]>([{ sortField: 'goodreadsRatings', sortValue: 'DESC' }]);

export const filterVar = makeVar<FilterInput[] | []>([]);

export const searchValueVar = makeVar<string>('');

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: process.env.REACT_APP_API_ENDPOINT,
    credentials: 'include',
    cache: new InMemoryCache({
        typePolicies: {
            Book: {
                fields: {
                    authors: {
                        // Custom method to evaluate if it's a new author or
                        // if it is already in the cache
                        merge(
                            existing: Author[] | undefined,
                            incoming: Author[],
                            { readField, mergeObjects }
                        ) {
                            const merged: Author[] = existing ? [...existing] : [];
                            const authorNameToIndex: Record<string, number> = {};

                            if (existing) {
                                existing.forEach((author, index) => {
                                    const lastName = readField<string>('lastName', author);
                                    if (lastName != null) {
                                        authorNameToIndex[lastName] = index;
                                    }
                                });
                            }
                            incoming.forEach((author) => {
                                const lastName = readField<string>('lastName', author);
                                const index = lastName ? authorNameToIndex[lastName] : NaN;
                                if (typeof index === 'number') {
                                    // Merge the new author data with the existing author data.
                                    const newAuthor = mergeObjects(merged[index], author);
                                    if (newAuthor) {
                                        merged[index] = newAuthor;
                                    }
                                } else {
                                    // First time we've seen this author in this array.
                                    if (lastName != null) {
                                        authorNameToIndex[lastName] = merged.length;
                                        merged.push(author);
                                    }
                                }
                            });
                            return merged;
                        }
                    }
                }
            },
            Query: {
                fields: {
                    // Query for fetching all books
                    books: {
                        read(existing: PaginatedBooks | []) {
                            if (existing) return existing;
                            return [];
                        }
                    },
                    // Reactive variables
                    offset: {
                        read() {
                            return offsetVar();
                        }
                    },
                    limit: {
                        read() {
                            return limitVar();
                        }
                    },
                    searchValue: {
                        read() {
                            return searchValueVar();
                        }
                    },
                    sort: {
                        read() {
                            return limitVar();
                        },
                        // Skip whatever is in the cache
                        merge: true
                    },
                    filter: {
                        read() {
                            return filterVar();
                        },
                        merge: true
                    }
                }
            }
        }
    })
});
