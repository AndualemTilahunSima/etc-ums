
/**
 * Book Domain Entity
 */
export default class Book {
    #id;
    #title;
    #author;
    #isbn;
    #createdAt;
    #updatedAt;

    constructor(title, author, isbn) {
        this.#title = title;
        this.#author = author;
        this.#isbn = isbn;
        this.#createdAt = new Date();
        this.#updatedAt = new Date();
    }

    get id() { return this.#id; }
    get title() { return this.#title; }
    get author() { return this.#author; }
    get isbn() { return this.#isbn; }
    get createdAt() { return this.#createdAt; }
    get updatedAt() { return this.#updatedAt; }

    set id(value) { this.#id = value }

    // Static factory method
    static toBook(bookRequest) {
        return new Book(
            bookRequest.title,
            bookRequest.author,
            bookRequest.isbn
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