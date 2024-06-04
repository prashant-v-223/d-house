import React, { useState } from 'react';

const Boxs = ({box, tableData}) => {
 
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const blueElements50 = Array.from({ length: box }).map((_, index) => (
    <h3
      key={index}
      className={
        index < box ? "forsage_detail_box" : "forsage_blue other_box"
      }
    >
      {index < tableData.length ? tableData[index].user_id : null}
    </h3>
  ));

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedElements = blueElements50.slice(startIndex, endIndex);

  const totalPages = Math.ceil(blueElements50.length / pageSize);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="levels_card_chain">
        <div className="card_chain2">{displayedElements}</div>
      </div>
      <div className="pagination pagination_box">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active button_page' : 'button_page'}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Boxs;
