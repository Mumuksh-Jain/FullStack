import React, { useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' },
  ]);

  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const addBook = () => {
    if (title && author) {
      setBooks([...books, { id: Date.now(), title, author }]);
      setTitle('');
      setAuthor('');
    }
  };

  const removeBook = (id) => {
    setBooks(books.filter(b => b.id !== id));
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-5 flex justify-center">
      <div className="w-full max-w-3xl">
        
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-2">
            📚 Library Management
          </h1>
          <p className="text-center text-gray-600 text-lg">
            Manage your book collection with ease
          </p>
        </div>

        {/* Search and Add Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-6 backdrop-blur-sm border border-white/50">
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">🔍 Search Books</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or author..."
              className="w-full p-3 text-base border-2 border-gray-200 rounded-xl mb-4 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            />
          </div>

          <div className="border-t pt-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">➕ Add New Book</label>
            <div className="flex gap-3 flex-wrap">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book Title"
                className="flex-1 min-w-[150px] p-3 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author Name"
                className="flex-1 min-w-[150px] p-3 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
              <button
                onClick={addBook}
                className="px-8 py-3 text-base bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Book Stats */}
        <div className="text-center mb-6">
          <span className="text-sm font-semibold text-gray-600">
            {filteredBooks.length} of {books.length} books
          </span>
        </div>

        {/* Book List */}
        {filteredBooks.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-lg text-center border-2 border-dashed border-gray-300">
            <p className="text-2xl text-gray-400 mb-2">📭 No books found</p>
            <p className="text-gray-500">Add your first book to get started!</p>
          </div>
        ) : (
          filteredBooks.map(book => (
            <div
              key={book.id}
              className="bg-white p-6 rounded-xl shadow-md mb-4 border-l-4 border-indigo-500 hover:shadow-lg transition-shadow duration-200 flex justify-between items-start"
            >
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {book.title}
                </h2>
                <p className="text-base text-gray-500">
                  ✍️ {book.author}
                </p>
              </div>
              <button
                onClick={() => removeBook(book.id)}
                className="ml-4 px-5 py-2 text-sm bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200"
              >
                ✕ Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;