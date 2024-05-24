import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const setPaginationHandler = (pagenum) => {
    setCurrentPage(pagenum);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    data.length && (
      <div>
        <ul className="listContent">
          {currentPosts.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
        <div className="pagination">
          <button
            className="prevBtn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {pageNumbers.map((pagenumber) => (
            <span
              key={pagenumber}
              className={
                currentPage === pagenumber
                  ? "activepagination"
                  : "paginationnumber"
              }
              onClick={() => setPaginationHandler(pagenumber)}
            >
              {pagenumber}
            </span>
          ))}
          <button
            className="nextBtn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    )
  );
}
