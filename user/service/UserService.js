/**
 * Service interface for User
 * Defines the contract for bussiness logic
 */
export default class UserService {
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
  
  async approve(id){
    throw new Error('Method not implemented');
  }

  async borrowBook(userId, bookId) {
    throw new Error('Method not implemented');
  }

  async returnBook(userId, bookId) {
    throw new Error('Method not implemented');
  }

  async getUsersWithMinBorrowCount() {
    throw new Error('Method not implemented');
  }

  async getUsersWithMaxBorrowCount() {
    throw new Error('Method not implemented');
  }
}

