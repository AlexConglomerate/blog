import React from 'react';
import _ from "lodash";

const Pagination = ({itemsCount, pageSize, onPageChange, currentPage}) => {
    const pageCount = Math.ceil(itemsCount / pageSize)
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (

        <>
            <nav>
                <ul className="flex flex-row">
                    {pages.map((page) => (
                        <li
                            key={"page_" + page}
                            className={(page === currentPage ? " bg-blue-500 " : "")}
                        >
                            <button
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 -hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Pagination;