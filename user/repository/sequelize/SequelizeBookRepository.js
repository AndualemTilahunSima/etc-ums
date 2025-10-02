import Book from "../../entity/Book.js";
import BookModel from "./db/models/Book.js";
import BookRepository from "../BookRepository.js";
import BookNotFoundError from "../../Error/BookNotFoundError.js";
import path from "path";

export class SequelizeBookRepository extends BookRepository {

    async save(book) {

        let bookInstance = await BookModel.create({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
        });

        return bookInstance;

    }

    async findById(id) {
        let bookInstance = await BookModel.findByPk(id);
        return bookInstance;
    }

    async findByIsbn(isbn) {
        let bookInstance = await BookModel.findOne({ where: { isbn: isbn } });
        return bookInstance;
    }

    async findAll() {
        let bookInstances = await BookModel.findAll();
        return bookInstances;
    }

    async update(id, book) {
        
        let bookInstance=await BookModel.findByPk(id);

        if(!bookInstance){
            BookNotFoundError(`Book with Id ${id} not found`);
        }
        bookInstance.title=book.title;
        bookInstance.author=book.author;
        bookInstance = await BookModel.update(
            bookInstance.toJSON(),
            { where: { id: id } }
        );
        
        return bookInstance;
    }

    async delete(id) {
        let result = await BookModel.destroy({ where: { id: id } });
        return result;
    }

}