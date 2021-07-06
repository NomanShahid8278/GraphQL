import { graphql } from "react-apollo";
import { getAuthorsQuery, getBooksQuery } from "../queries/queries";
import { addBookMutation } from "../mutations/mutations";
import { flowRight as compose } from "lodash";
import { useState } from "react";

function AddBook({ getAuthorsQuery, addBookMutation }) {
  const { authors, loading } = getAuthorsQuery;
  const [addBook, setAddBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddBook({ ...addBook, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const { name, genre, authorId } = addBook;
    addBookMutation({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [
        {
          query: getBooksQuery,
        },
      ],
    });
    setAddBook({
      name: "",
      genre: "",
      authorId: "",
    });
  };
  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={handleChange}
          value={addBook.name}
          name="name"
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={handleChange}
          value={addBook.genre}
          name="genre"
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={handleChange}
          value={addBook.authorId}
          name="authorId"
        >
          <option>Select author</option>
          {loading ? (
            <option disabled>Loading Authors...</option>
          ) : (
            authors.map(({ name, id }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })
          )}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
