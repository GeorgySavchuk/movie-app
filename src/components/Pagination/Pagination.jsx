import React, {useState} from 'react';
import "./Pagination.css"
import ReactPaginate from "react-paginate";
const Pagination = ({pages, currentPage, handlePageChange}) => {
    return (
        <ReactPaginate
            pageCount={pages}
            breakLabel={"..."}
            onPageChange={handlePageChange}
            initialPage={currentPage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            nextLabel={"❯"}
            previousLabel={"❮"}
            containerClassName={"pagination"}
            pageLinkClassName={"page-num"}
            previousLinkClassName={"page-num"}
            nextLinkClassName={"page-num"}
            activeLinkClassName={"active"}
            breakLinkClassName={"break"}
            renderOnZeroPageCount={false}
        />
    );
};

export default Pagination;