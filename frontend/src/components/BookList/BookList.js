import { useDispatch, useSelector } from "react-redux";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import "./BookList.css";
import {
  deleteBook,
  selectBooks,
  toggleFavorite,
} from "../../redux/slices/bookSlice";
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";

export const BookList = () => {
  const books = useSelector(selectBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
  const dispatch = useDispatch();

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const filteredBooks = books.filter((el) => {
    const matchesTitle = el.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = el.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavorite = onlyFavoriteFilter ? el.isFavorite : true;
    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };
  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((el, i) => (
            <li key={el.id}>
              <div className="book-info">
                {++i}. {highlightMatch(el.title, titleFilter)} by{" "}
                <strong>{highlightMatch(el.author, authorFilter)}</strong>(
                {el.source})
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(el.id)}>
                  {el.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button onClick={() => handleDeleteBook(el.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
