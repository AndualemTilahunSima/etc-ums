/**
 * Book Response
 */
export default class BookResponse {
    #id;
    #title;
    #author;
    #isbn;
    #createdAt;
    #updatedAt;

    constructor(id, title, author, isbn, createdAt, updatedAt) {
        this.#id = id;
        this.#title = title;
        this.#author = author;
        this.#isbn = isbn;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    get id() { return this.#id; }
    get title() { return this.#title; }
    get author() { return this.#author; }
    get isbn() { return this.#isbn; }
    get createdAt() { return this.#createdAt; }
    get updatedAt() { return this.#updatedAt; }

    // Static factory method
    static toBookResponse(book) {
        return new BookResponse(
            book.id,
            book.title,
            book.author,
            book.isbn,
            book.createdAt,
            book.updatedAt
        );
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            author: this.#author,
            isbn: this.#isbn,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt
        }
    }
}
