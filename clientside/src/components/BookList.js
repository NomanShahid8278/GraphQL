import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";
import { useState } from "react";

function BookList({ data }) {
  const { books, loading } = data;
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <ul id="book-list">
        {loading ? (
          <div>Loading Books...</div>
        ) : (
          books.map(({ name, id }) => {
            return (
              <li
                key={id}
                onClick={() => {
                  setSelected(id);
                }}
              >
                {name}
              </li>
            );
          })
        )}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
