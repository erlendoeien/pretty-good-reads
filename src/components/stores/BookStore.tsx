import { makeAutoObservable } from 'mobx';
import React from 'react';
import { Book, FilterInput, PaginatedBooksInput, SortInput } from '../../generated/graphql';

export const BookStoreContext = React.createContext<BookStore>({} as BookStore);

type PartiallyBook = { __typename?: 'Book' | undefined } & Pick<
    Book,
    'title' | 'id' | 'publicationDate' | 'bookCoverUrl' | 'publisher' | 'isbn'
> & { authors: { __typename?: 'Author' | undefined }[] };

type StoredBooks = Record<string, PartiallyBook[]>;

export default class BookStore {
    private _books: StoredBooks = {};

    isLoading = true;

    private _ttl = 10000;

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Compute hash using variables
     * @param variables Query variables
     */
    private calculateHash(variables: PaginatedBooksInput) {
        const hash: string[] = [];
        Object.entries(variables)
            .sort()
            .forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    return [
                        ...hash,
                        ...(value as any).map((item: SortInput | FilterInput) =>
                            Object.entries(item)
                                .map((entry) => entry.join(''))
                                .join()
                        )
                    ];
                }
                return hash.push(`${key}${value}`);
            });
        return hash.join('');
    }

    /**
     * Returns possibly stored book query
     * @param variables query variables
     */
    fetchBooks(variables: PaginatedBooksInput) {
        const hash = this.calculateHash(variables);
        const booksQuery = this._books[hash];
        if (booksQuery != null) return Object.values(booksQuery);
        return undefined;
    }

    /**
     * Add new books to store, indexed by computed hash of
     * query variables
     * */
    addNewBooks(books: PartiallyBook[], variables: PaginatedBooksInput) {
        if (!books) return undefined;
        const variableHash = this.calculateHash(variables);
        if (this._books[variableHash] == null) {
            this._books[variableHash] = books;

            // Shold have other store to save ID for clean up
            // Might not work with SSR
            return window.setTimeout(() => this.deleteBook(variableHash), this._ttl);
        }
        return undefined;
    }

    /**
     * Remove book from store
     * @param variableHash Index on hash
     */
    deleteBook(variableHash: string) {
        if (this._books[variableHash]) delete this._books[variableHash];
        return true;
    }

    get ttl() {
        return this._ttl;
    }

    set ttl(ms: number) {
        if (ms < 1000) console.log('too short ttl');
        this._ttl = ms;
    }
}
