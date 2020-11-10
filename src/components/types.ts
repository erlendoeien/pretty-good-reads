import { Book } from '../generated/graphql';

export type ValidLimits = 10 | 20 | 25 | 50 | 100;

// Duplicate, but TS did not like importing from backend
type ValidFilterSelect =
    | keyof Pick<Book, 'numPages'>
    | keyof Pick<Book, 'publicationDate'>
    | keyof Pick<Book, 'languageCode'>;

export type ValidSortSelectField =
    | ValidFilterSelect
    | keyof Pick<Book, 'title'>
    | keyof Pick<Book, 'goodreadsRatings'>;

export type SortFieldValue = [ValidSortSelectField, 'ASC' | 'DESC'];
