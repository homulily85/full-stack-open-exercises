import { gql } from '@apollo/client'

export const GET_ALL_AUTHORS = gql`
    query {
        allAuthors {
            name,
            born,
            bookCount,
            id
        }
    }
`

export const GET_ALL_BOOKS = gql`
    query {
        allBooks {
            title,
            author,
            published,
            id
        }
    }
`

export const ADD_NEW_BOOK = gql `
    mutation addNewBook($title:String!,$author:String!, $published:Int!, $genres: [String!]! ){
        addBook(title: $title, author: $author, published: $published, genres: $genres){
            title,
            author,
            published,
            id
        }
    }
`

export const UPDATE_AUTHOR_BIRTHYEAR = gql`
    mutation updateAuthorBirthyear($name:String!, $setBornTo:Int!){
        editAuthor(name: $name, setBornTo: $setBornTo){
            name,
            born,
            bookCount,
            id
        }
    }
`