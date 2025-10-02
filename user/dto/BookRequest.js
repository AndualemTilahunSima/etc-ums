import BookBadRequestError from "../error/BookBadRequestError.js"
/**
 * Book Request
 */
export default class BookRequest {
    #title;
    #author;
    #isbn;

    constructor(data) {

        this.#title = data.title;
        this.#author = data.author;
        this.#isbn = data.isbn;
    }


    get title() { return this.#title; }
    get author() { return this.#author; }
    get isbn() { return this.#isbn; }
    

    static fromRequest(req) {

        const { body } = req;

        if (!body || typeof body !== 'object') {
            throw new BookBadRequestError('Invalid request data');
        }

       
        this.#validateTitle(body);
        this.#validateAuthor(body);
        this.#validateIsBn(body);


        return new BookRequest(body);
    }

    static updateRequest(req) {

        const { body } = req;

         this.#validateTitle(body);
        this.#validateAuthor(body);

        return new BookRequest(body);


    }

  
    static #validateTitle(data) {
        if (!data.title) {
            throw new BookBadRequestError('Title is required');
        }
    }

    static #validateAuthor(data) {
        if (!data.author) {
            throw new BookBadRequestError('Author is required');
        }
    }

    static #validateIsBn(data) {
        if (!data.isbn) {
            throw new BookBadRequestError('IsBn is required');
        }
    }

}


