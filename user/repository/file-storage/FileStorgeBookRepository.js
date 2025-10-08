import { writeFile, readFile } from "fs/promises";
import currentConfig from "./Config.js";
import BookRepository from "../BookRepository.js";
import BookNotFoundError from "../../error/BookNotFoundError.js";
import Book from "../../entity/Book.js";
import path from "path";

const CURRENT_FILE = path.basename(import.meta.url);


export class FileStorageBookRepository extends BookRepository {
    #filePath;

    constructor() {
        super();
        this.#filePath = `${currentConfig.filePath}/books.json`;
    }

    async #getBooks() {
        try {
            console.log(this.#filePath)
            const data = await readFile(this.#filePath, "utf-8");
            return data ? JSON.parse(data) : [];
        } catch (err) {
            if (err.code === "ENOENT") throw err; // return empty if file not found
            throw err;
        }
    }

    async save(book) {

        if (!(book instanceof Book)) {
            throw new Error("Invalid book object");
        }

        console.log(`[${CURRENT_FILE}] Creating new book: ${book}`);

        const books = await this.#getBooks();
        books.push(book.toJSON());

        await writeFile(this.#filePath, JSON.stringify(books, null, 2), "utf8");

        console.log(`[${CURRENT_FILE}] Book created successfully ${book}`);
        return book;
    }

    async findById(id) {
        console.log(`[${CURRENT_FILE}] Fetching book with Id: ${id}`);
        const books = await this.#getBooks();
        return books.find(u => u.id === id);
    }

    async findByIsbn(isbn) {
        console.log(`[${CURRENT_FILE}] Fetching book with Isbn: ${isbn}`);
        const books = await this.#getBooks();
        return books.find(u => u.isbn === isbn);
    }

    async findAll() {
        console.log(`[${CURRENT_FILE}] Fetching all books`);
        const books = await this.#getBooks();
        return books;
    }

    async update(id, book) {

        if (!(book instanceof Book)) {
            throw new Error("Invalid book object");
        }

        const books = await this.#getBooks();

        const index = books.findIndex(u => u.id === id);

        if (index === -1) throw new BookNotFoundError(`Book with Id ${id} not found`);

        books[index].title = book.title;
        books[index].author = book.author;

        await writeFile(this.#filePath, JSON.stringify(books, null, 2), "utf8");

        return books[index];
    }

    async delete(id) {
        let books = await this.#getBooks();

        const book = books.find(u => u.id === id);

        if (!book) throw new BookNotFoundError(`Book with Id ${id} not found`);

        books = books.filter(u => u.id !== id);

        await writeFile(this.#filePath, JSON.stringify(books, null, 2), "utf8");

        return book;
    }
}