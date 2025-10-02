export default class Borrow {
    #id;
    #userId;
    #bookId;
    #borrowDate;
    #returnDate;
    #createdAt;
    #updatedAt;

    constructor(userId, bookId) {
        this.#userId = userId;
        this.#bookId = bookId;
        this.#borrowDate = new Date();
        this.#createdAt = new Date();
        this.#updatedAt = new Date();
    }

    get id() { return this.#id; }
    get userId() { return this.#userId; }
    get bookId() { return this.#bookId; }
    get borrowDate() { return this.#borrowDate; }
    get returnDate() { return this.#returnDate; }
    get createdAt() { return this.#createdAt; }
    get updatedAt() { return this.#updatedAt; }

    set id(value) { this.#id = value }

    // Static factory method
    static toBorrow(borrowRequest) {
        return new Borrow(
            borrowRequest.userId,
            borrowRequest.bookId
        );
    }

    toJSON() {
        return {
            id: this.#id,
            userId: this.#userId,
            bookId: this.#bookId,
            borrowDate: this.#borrowDate,
            returnDate: this.#returnDate,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt
        }
    }
}/**
 * Borrow Domain Entity
 */