import React, { useEffect, useState } from "react";

import { API_GET_BOOK } from "../../global/constants";
import CardOne from "./components/CardOne";

async function fetchData(setBooks) {
  const res = await fetch(API_GET_BOOK);
  const data = await res.json();
  setBooks(data);
}

export default function Catalog() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchData(setBooks);
  }, []);

  const cardList = books.map((book) => (
    <CardOne
      imageUrl={book.cover_url}
      title={book.title}
      genre={book.genre}
      price={book.price}
      readingCount={book.reading_count}
      author={book.author}
    />
  ));

  return <div className="grid gap-5 grid-cols-3">{cardList}</div>;
}
