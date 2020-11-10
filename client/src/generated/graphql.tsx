/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type Query = {
    __typename?: 'Query';
    me?: Maybe<User>;
    books: PaginatedBooks;
    book?: Maybe<Book>;
    reviews: AllReviews;
    review?: Maybe<Review>;
};

export type QueryBooksArgs = {
    options: PaginatedBooksInput;
};

export type QueryBookArgs = {
    id: Scalars['Int'];
};

export type QueryReviewArgs = {
    id: Scalars['Int'];
};

export type User = {
    __typename?: 'User';
    id: Scalars['Float'];
    email: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    nationality?: Maybe<Scalars['String']>;
    reviews: Array<Review>;
    updatedAt: Scalars['String'];
    createdAt: Scalars['String'];
};

export type Review = {
    __typename?: 'Review';
    reviewItemId: Scalars['Float'];
    reviewItem: Book;
    reviewedById: Scalars['Float'];
    reviewedBy: User;
    rating: Scalars['Float'];
    text?: Maybe<Scalars['String']>;
    updatedAt: Scalars['String'];
    createdAt: Scalars['String'];
};

export type Book = {
    __typename?: 'Book';
    id: Scalars['Float'];
    title: Scalars['String'];
    bookCoverUrl?: Maybe<Scalars['String']>;
    isbn: Scalars['String'];
    isbn13: Scalars['String'];
    languageCode: Scalars['String'];
    numPages: Scalars['Float'];
    publicationDate: Scalars['String'];
    publisher: Scalars['String'];
    goodreadsRatings: Scalars['Float'];
    categoryId?: Maybe<Scalars['Float']>;
    reviews: Array<Review>;
    authors: Array<Author>;
    updatedAt: Scalars['String'];
    createdAt: Scalars['String'];
    yourReview?: Maybe<Review>;
    averageRating?: Maybe<Scalars['Float']>;
};

export type Author = {
    __typename?: 'Author';
    id: Scalars['Float'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    books: Array<Book>;
    updatedAt: Scalars['String'];
    createdAt: Scalars['String'];
};

export type PaginatedBooks = {
    __typename?: 'PaginatedBooks';
    books: Array<Book>;
    totalCount: Scalars['Float'];
};

export type PaginatedBooksInput = {
    limit: Scalars['Float'];
    offset?: Maybe<Scalars['Float']>;
    sort: Array<SortInput>;
    searchQuery?: Maybe<Scalars['String']>;
    filter: Array<FilterInput>;
};

/** Possible array of sort options for books */
export type SortInput = {
    /** Fields to sort on, must be fields on Book */
    sortField: Scalars['String'];
    sortValue: Scalars['String'];
};

/** Filter options to filter on books */
export type FilterInput = {
    /**
     * Fields to sort on, must be either "id",
     *                 "numPages", "languageCode" or "publicationDate"
     */
    filterField: Scalars['String'];
    /** Predicates, e.g. "moreThan", "equal", "lessThanOrEqual" */
    filterPredicate: Scalars['String'];
    filterValue: Scalars['String'];
};

export type AllReviews = {
    __typename?: 'AllReviews';
    reviews: Array<Review>;
    totalCount: Scalars['Float'];
};

export type Mutation = {
    __typename?: 'Mutation';
    register: UserResponse;
    login: UserResponse;
    logout: Scalars['Boolean'];
    createReview: Review;
    /**
     * Updates a review. Returns null if the user has not
     *             reviewed the book previously or authentication error
     */
    updateReview?: Maybe<Review>;
    deleteReview: Scalars['Boolean'];
};

export type MutationRegisterArgs = {
    options: RegisterOptions;
};

export type MutationLoginArgs = {
    password: Scalars['String'];
    email: Scalars['String'];
};

export type MutationCreateReviewArgs = {
    input: ReviewInput;
    bookId: Scalars['Int'];
};

export type MutationUpdateReviewArgs = {
    input: ReviewInput;
    bookId: Scalars['Int'];
};

export type MutationDeleteReviewArgs = {
    bookId: Scalars['Int'];
};

export type UserResponse = {
    __typename?: 'UserResponse';
    errors?: Maybe<Array<FieldError>>;
    user?: Maybe<User>;
};

export type FieldError = {
    __typename?: 'FieldError';
    field: Scalars['String'];
    message: Scalars['String'];
};

export type RegisterOptions = {
    email: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    password: Scalars['String'];
    nationality?: Maybe<Scalars['String']>;
};

export type ReviewInput = {
    rating: Scalars['Float'];
    text?: Maybe<Scalars['String']>;
};

export type RegularErrorFragment = { __typename?: 'FieldError' } & Pick<
    FieldError,
    'field' | 'message'
>;

export type RegularReviewFragment = { __typename?: 'Review' } & Pick<
    Review,
    'reviewItemId' | 'reviewedById' | 'rating' | 'text' | 'updatedAt' | 'createdAt'
> & { reviewedBy: { __typename?: 'User' } & Pick<User, 'firstName' | 'lastName'> };

export type RegularUserFragment = { __typename?: 'User' } & Pick<
    User,
    'id' | 'email' | 'firstName' | 'lastName' | 'nationality'
>;

export type RegularUserResponseFragment = { __typename?: 'UserResponse' } & {
    errors?: Maybe<Array<{ __typename?: 'FieldError' } & RegularErrorFragment>>;
    user?: Maybe<{ __typename?: 'User' } & RegularUserFragment>;
};

export type CreateReviewMutationVariables = Exact<{
    bookId: Scalars['Int'];
    rating: Scalars['Float'];
    text?: Maybe<Scalars['String']>;
}>;

export type CreateReviewMutation = { __typename?: 'Mutation' } & {
    createReview: { __typename?: 'Review' } & RegularReviewFragment;
};

export type DeleteReviewMutationVariables = Exact<{
    bookId: Scalars['Int'];
}>;

export type DeleteReviewMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteReview'>;

export type LoginMutationVariables = Exact<{
    email: Scalars['String'];
    password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
    login: { __typename?: 'UserResponse' } & RegularUserResponseFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'logout'>;

export type RegisterMutationVariables = Exact<{
    email: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    password: Scalars['String'];
    nationality?: Maybe<Scalars['String']>;
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
    register: { __typename?: 'UserResponse' } & RegularUserResponseFragment;
};

export type UpdateReviewMutationVariables = Exact<{
    bookId: Scalars['Int'];
    rating: Scalars['Float'];
    text?: Maybe<Scalars['String']>;
}>;

export type UpdateReviewMutation = { __typename?: 'Mutation' } & {
    updateReview?: Maybe<{ __typename?: 'Review' } & RegularReviewFragment>;
};

export type BookQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type BookQuery = { __typename?: 'Query' } & {
    book?: Maybe<
        { __typename?: 'Book' } & Pick<
            Book,
            | 'id'
            | 'title'
            | 'publicationDate'
            | 'bookCoverUrl'
            | 'publisher'
            | 'isbn'
            | 'isbn13'
            | 'averageRating'
        > & {
                authors: Array<{ __typename?: 'Author' } & Pick<Author, 'firstName' | 'lastName'>>;
                reviews: Array<{ __typename?: 'Review' } & RegularReviewFragment>;
            }
    >;
};

export type BooksQueryVariables = Exact<{
    options: PaginatedBooksInput;
}>;

export type BooksQuery = { __typename?: 'Query' } & {
    books: { __typename?: 'PaginatedBooks' } & Pick<PaginatedBooks, 'totalCount'> & {
            books: Array<
                { __typename?: 'Book' } & Pick<
                    Book,
                    'id' | 'title' | 'publicationDate' | 'bookCoverUrl' | 'publisher' | 'isbn'
                > & {
                        authors: Array<
                            { __typename?: 'Author' } & Pick<Author, 'firstName' | 'lastName'>
                        >;
                    }
            >;
        };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
    me?: Maybe<{ __typename?: 'User' } & RegularUserFragment>;
};

export type MyProfileQueryVariables = Exact<{ [key: string]: never }>;

export type MyProfileQuery = { __typename?: 'Query' } & {
    me?: Maybe<
        { __typename?: 'User' } & {
            reviews: Array<
                { __typename?: 'Review' } & {
                    reviewItem: { __typename?: 'Book' } & Pick<
                        Book,
                        'id' | 'title' | 'bookCoverUrl'
                    >;
                } & RegularReviewFragment
            >;
        } & RegularUserFragment
    >;
};

export type YourReviewQueryVariables = Exact<{
    bookId: Scalars['Int'];
}>;

export type YourReviewQuery = { __typename?: 'Query' } & {
    book?: Maybe<
        { __typename?: 'Book' } & {
            yourReview?: Maybe<{ __typename?: 'Review' } & RegularReviewFragment>;
        }
    >;
};

export const RegularReviewFragmentDoc = gql`
    fragment RegularReview on Review {
        reviewItemId
        reviewedById
        rating
        text
        updatedAt
        createdAt
        reviewedBy {
            firstName
            lastName
        }
    }
`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
        field
        message
    }
`;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
        id
        email
        firstName
        lastName
        nationality
    }
`;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
        errors {
            ...RegularError
        }
        user {
            ...RegularUser
        }
    }
    ${RegularErrorFragmentDoc}
    ${RegularUserFragmentDoc}
`;
export const CreateReviewDocument = gql`
    mutation CreateReview($bookId: Int!, $rating: Float!, $text: String) {
        createReview(bookId: $bookId, input: { rating: $rating, text: $text }) {
            ...RegularReview
        }
    }
    ${RegularReviewFragmentDoc}
`;
export type CreateReviewMutationFn = Apollo.MutationFunction<
    CreateReviewMutation,
    CreateReviewMutationVariables
>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      rating: // value for 'rating'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateReviewMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>
) {
    return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(
        CreateReviewDocument,
        baseOptions
    );
}
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<
    CreateReviewMutation,
    CreateReviewMutationVariables
>;
export const DeleteReviewDocument = gql`
    mutation DeleteReview($bookId: Int!) {
        deleteReview(bookId: $bookId)
    }
`;
export type DeleteReviewMutationFn = Apollo.MutationFunction<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
>;

/**
 * __useDeleteReviewMutation__
 *
 * To run a mutation, you first call `useDeleteReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewMutation, { data, loading, error }] = useDeleteReviewMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useDeleteReviewMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteReviewMutation, DeleteReviewMutationVariables>
) {
    return Apollo.useMutation<DeleteReviewMutation, DeleteReviewMutationVariables>(
        DeleteReviewDocument,
        baseOptions
    );
}
export type DeleteReviewMutationHookResult = ReturnType<typeof useDeleteReviewMutation>;
export type DeleteReviewMutationResult = Apollo.MutationResult<DeleteReviewMutation>;
export type DeleteReviewMutationOptions = Apollo.BaseMutationOptions<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ...RegularUserResponse
        }
    }
    ${RegularUserResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
    baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
    LoginMutation,
    LoginMutationVariables
>;
export const LogoutDocument = gql`
    mutation Logout {
        logout
    }
`;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
    baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>
) {
    return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
    LogoutMutation,
    LogoutMutationVariables
>;
export const RegisterDocument = gql`
    mutation Register(
        $email: String!
        $firstName: String!
        $lastName: String!
        $password: String!
        $nationality: String
    ) {
        register(
            options: {
                email: $email
                firstName: $firstName
                lastName: $lastName
                password: $password
                nationality: $nationality
            }
        ) {
            ...RegularUserResponse
        }
    }
    ${RegularUserResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
    RegisterMutation,
    RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      password: // value for 'password'
 *      nationality: // value for 'nationality'
 *   },
 * });
 */
export function useRegisterMutation(
    baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>
) {
    return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        baseOptions
    );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
    RegisterMutation,
    RegisterMutationVariables
>;
export const UpdateReviewDocument = gql`
    mutation UpdateReview($bookId: Int!, $rating: Float!, $text: String) {
        updateReview(bookId: $bookId, input: { rating: $rating, text: $text }) {
            ...RegularReview
        }
    }
    ${RegularReviewFragmentDoc}
`;
export type UpdateReviewMutationFn = Apollo.MutationFunction<
    UpdateReviewMutation,
    UpdateReviewMutationVariables
>;

/**
 * __useUpdateReviewMutation__
 *
 * To run a mutation, you first call `useUpdateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReviewMutation, { data, loading, error }] = useUpdateReviewMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      rating: // value for 'rating'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdateReviewMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateReviewMutation, UpdateReviewMutationVariables>
) {
    return Apollo.useMutation<UpdateReviewMutation, UpdateReviewMutationVariables>(
        UpdateReviewDocument,
        baseOptions
    );
}
export type UpdateReviewMutationHookResult = ReturnType<typeof useUpdateReviewMutation>;
export type UpdateReviewMutationResult = Apollo.MutationResult<UpdateReviewMutation>;
export type UpdateReviewMutationOptions = Apollo.BaseMutationOptions<
    UpdateReviewMutation,
    UpdateReviewMutationVariables
>;
export const BookDocument = gql`
    query Book($id: Int!) {
        book(id: $id) {
            id
            title
            publicationDate
            bookCoverUrl
            publisher
            isbn
            isbn13
            authors {
                firstName
                lastName
            }
            averageRating
            reviews {
                ...RegularReview
            }
        }
    }
    ${RegularReviewFragmentDoc}
`;

/**
 * __useBookQuery__
 *
 * To run a query within a React component, call `useBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookQuery(baseOptions?: Apollo.QueryHookOptions<BookQuery, BookQueryVariables>) {
    return Apollo.useQuery<BookQuery, BookQueryVariables>(BookDocument, baseOptions);
}
export function useBookLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<BookQuery, BookQueryVariables>
) {
    return Apollo.useLazyQuery<BookQuery, BookQueryVariables>(BookDocument, baseOptions);
}
export type BookQueryHookResult = ReturnType<typeof useBookQuery>;
export type BookLazyQueryHookResult = ReturnType<typeof useBookLazyQuery>;
export type BookQueryResult = Apollo.QueryResult<BookQuery, BookQueryVariables>;
export const BooksDocument = gql`
    query Books($options: PaginatedBooksInput!) {
        books(options: $options) {
            totalCount
            books {
                id
                title
                publicationDate
                bookCoverUrl
                publisher
                isbn
                authors {
                    firstName
                    lastName
                }
            }
        }
    }
`;

/**
 * __useBooksQuery__
 *
 * To run a query within a React component, call `useBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useBooksQuery(
    baseOptions?: Apollo.QueryHookOptions<BooksQuery, BooksQueryVariables>
) {
    return Apollo.useQuery<BooksQuery, BooksQueryVariables>(BooksDocument, baseOptions);
}
export function useBooksLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<BooksQuery, BooksQueryVariables>
) {
    return Apollo.useLazyQuery<BooksQuery, BooksQueryVariables>(BooksDocument, baseOptions);
}
export type BooksQueryHookResult = ReturnType<typeof useBooksQuery>;
export type BooksLazyQueryHookResult = ReturnType<typeof useBooksLazyQuery>;
export type BooksQueryResult = Apollo.QueryResult<BooksQuery, BooksQueryVariables>;
export const MeDocument = gql`
    query Me {
        me {
            ...RegularUser
        }
    }
    ${RegularUserFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
    return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
    return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyProfileDocument = gql`
    query MyProfile {
        me {
            ...RegularUser
            reviews {
                ...RegularReview
                reviewItem {
                    id
                    title
                    bookCoverUrl
                }
            }
        }
    }
    ${RegularUserFragmentDoc}
    ${RegularReviewFragmentDoc}
`;

/**
 * __useMyProfileQuery__
 *
 * To run a query within a React component, call `useMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileQuery(
    baseOptions?: Apollo.QueryHookOptions<MyProfileQuery, MyProfileQueryVariables>
) {
    return Apollo.useQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, baseOptions);
}
export function useMyProfileLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>
) {
    return Apollo.useLazyQuery<MyProfileQuery, MyProfileQueryVariables>(
        MyProfileDocument,
        baseOptions
    );
}
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>;
export type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>;
export type MyProfileQueryResult = Apollo.QueryResult<MyProfileQuery, MyProfileQueryVariables>;
export const YourReviewDocument = gql`
    query YourReview($bookId: Int!) {
        book(id: $bookId) {
            yourReview {
                ...RegularReview
            }
        }
    }
    ${RegularReviewFragmentDoc}
`;

/**
 * __useYourReviewQuery__
 *
 * To run a query within a React component, call `useYourReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useYourReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useYourReviewQuery({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useYourReviewQuery(
    baseOptions?: Apollo.QueryHookOptions<YourReviewQuery, YourReviewQueryVariables>
) {
    return Apollo.useQuery<YourReviewQuery, YourReviewQueryVariables>(
        YourReviewDocument,
        baseOptions
    );
}
export function useYourReviewLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<YourReviewQuery, YourReviewQueryVariables>
) {
    return Apollo.useLazyQuery<YourReviewQuery, YourReviewQueryVariables>(
        YourReviewDocument,
        baseOptions
    );
}
export type YourReviewQueryHookResult = ReturnType<typeof useYourReviewQuery>;
export type YourReviewLazyQueryHookResult = ReturnType<typeof useYourReviewLazyQuery>;
export type YourReviewQueryResult = Apollo.QueryResult<YourReviewQuery, YourReviewQueryVariables>;
