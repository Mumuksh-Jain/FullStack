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
    <div className="min-h-screen bg-gray-100 py-10 px-5 flex justify-center">
      <div className="w-full max-w-2xl">
        
        <h1 className="text-4xl font-bold text-center mb-8">
          Library Management System
        </h1>

        {/* Search and Add Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books..."
            className="w-full p-3 text-base border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          />

          <div className="flex gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
              className="flex-1 p-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
              className="flex-1 p-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={addBook}
              className="px-6 py-3 text-base bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Add Book
            </button>
          </div>
        </div>

        {/* Book List */}
        {filteredBooks.map(book => (
          <div
            key={book.id}
            className="bg-white p-5 rounded-xl shadow-md mb-3 flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-1">
                {book.title}
              </h2>
              <p className="text-base text-gray-600">
                by {book.author}
              </p>
            </div>
            <button
              onClick={() => removeBook(book.id)}
              className="px-6 py-2 text-base bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;