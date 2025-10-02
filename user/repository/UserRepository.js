/**
 * Repository interface for User domain
 * Defines the contract for data access operations
 */
export default class UserRepository {
  async save(user) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async update(id, user) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async approve(id) {
    throw new Error('Method not implemented');
  }

  async borrowBook(id, book) {
    throw new Error('Method not implemented');
  }
  async returnBook(id, book) {
    throw new Error('Method not implemented');
  }
  async getUsersWithMinBorrowCount() {
    throw new Error('Method not implemented');
  }

  async getUsersWithMaxBorrowCount() {
    throw new Error('Method not implemented');
  }
}

