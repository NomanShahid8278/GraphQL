import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ data }) => {
  const { book } = data;
  return (
    <div id="book-details">
      {book ? (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      ) : (
        <div>No book selected...</div>
      )}
    </div>
  );
};

export default graphql(getBookQuery, {
  options: ({ bookId }) => {
    return {
      variables: {
        id: bookId,
      },
    };
  },
})(BookDetails);
