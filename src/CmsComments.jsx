import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import FilterAndSearch from "./components/FilterAndSearch";

const CmsComments = () => {
  // Data statis untuk ditampilkan (bisa diganti dengan data dari database)
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "user123",
      rate: 4,
      drama: "Lovely Runner",
      comment: "Great drama!",
      status: "Pending",
    },
    {
      id: 2,
      username: "user456",
      rate: 5,
      drama: "True Beauty",
      comment: "Loved it!",
      status: "Pending",
    },
    {
      id: 3,
      username: "user789",
      rate: 3,
      drama: "Sky Castle",
      comment: "It was okay.",
      status: "Pending",
    },
  ]);

  // State untuk filter, show, search, dan checkbox yang dipilih
  const [filterValue, setFilterValue] = useState("none");
  const [showValue, setShowValue] = useState("10");
  const [searchValue, setSearchValue] = useState("");
  const [selectedComments, setSelectedComments] = useState(new Set());

  const renderStars = (rate) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rate ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  // Filter comments berdasarkan status
  const filteredComments = comments.filter((comment) => {
    if (filterValue === "none") return true;
    return comment.status.toLowerCase() === filterValue.toLowerCase();
  });

  // Handle search
  const searchedComments = filteredComments.filter(
    (comment) =>
      comment.username.toLowerCase().includes(searchValue.toLowerCase()) ||
      comment.drama.toLowerCase().includes(searchValue.toLowerCase()) ||
      comment.comment.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Limit the number of displayed comments based on showValue
  const displayedComments = searchedComments.slice(0, parseInt(showValue));

  // Fungsi untuk mengubah status komentar
  const updateStatus = (newStatus) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        selectedComments.has(comment.id)
          ? { ...comment, status: newStatus }
          : comment
      )
    );
    setSelectedComments(new Set()); // Reset selected comments after updating
  };

  // Handle select all checkbox
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = new Set(displayedComments.map((comment) => comment.id));
      setSelectedComments(allIds);
    } else {
      setSelectedComments(new Set());
    }
  };

  // Handle individual checkbox
  const handleCheckboxChange = (id) => {
    setSelectedComments((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <div className="mt-10 flex-1 flex flex-col">
          <main className="flex-1 pb-16 overflow-y-auto">
            <div className="container grid px-6 mx-auto">
              <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Comments Management
              </h2>

              {/* Panggil komponen FilterAndSearch */}
              <FilterAndSearch
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                showValue={showValue}
                setShowValue={setShowValue}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />

              <div className="w-full overflow-hidden rounded-lg shadow-xs mt-8">
                <div className="w-full overflow-x-auto">
                  <table className="w-full whitespace-no-wrap">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th className="px-4 py-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-indigo-600"
                            onChange={handleSelectAll}
                            checked={
                              displayedComments.length > 0 &&
                              selectedComments.size === displayedComments.length
                            }
                          />
                        </th>
                        <th className="px-4 py-3">Username</th>
                        <th className="px-4 py-3">Rate</th>
                        <th className="px-4 py-3">Drama</th>
                        <th className="px-4 py-3">Comments</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {displayedComments.map((comment) => (
                        <tr
                          key={comment.id}
                          className="text-gray-700 dark:text-gray-400"
                        >
                          <td className="px-4 py-3 text-sm">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-indigo-600"
                              checked={selectedComments.has(comment.id)}
                              onChange={() => handleCheckboxChange(comment.id)}
                            />
                          </td>

                          <td className="px-4 py-3 text-sm">
                            <span className="w-[100px] inline-block">
                              {comment.username}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-sm">
                            <span className="w-[100px] inline-block">
                              {renderStars(comment.rate)}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-sm">
                            <span className="w-[100px] inline-block">
                              {comment.drama}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-sm">
                            <span className="w-[150px] inline-block">
                              {comment.comment}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-sm">
                            <button
                              className={`statusBtn px-4 py-2 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ${
                                comment.status === "Pending"
                                  ? "bg-blue-500"
                                  : comment.status === "Approved"
                                  ? "bg-green-600"
                                  : "bg-red-600"
                              }`}
                              style={{
                                backgroundColor:
                                  comment.status === "Pending"
                                    ? "hsl(211, 19%, 44%)"
                                    : comment.status === "Approved"
                                    ? "hsl(142, 74%, 30%)"
                                    : "hsl(0, 78%, 52%)",
                                color: "white",
                                padding: "8px 16px",
                                margin: "4px",
                              }}
                            >
                              {comment.status}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Select all & action buttons */}
                <div className="grid px-4 py-3 text-x border-t dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <div className="flex flex-col items-start space-y-2">
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-indigo-600"
                          id="selectAll"
                          onChange={handleSelectAll}
                        />
                        <span className="ml-2 text-gray-700">Select All</span>
                      </label>
                      {/* Approved Button */}
                      <button
                        id="approveBtn"
                        type="button"
                        className="px-3 py-1 text-white bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
                        style={{
                          backgroundColor: "#15803d",
                          color: "white",
                          width: "auto",
                        }}
                        onClick={() => updateStatus("Approved")}
                      >
                        Approved
                      </button>

                      {/* Unapproved Button */}
                      <button
                        id="unapproveBtn"
                        type="button"
                        className="px-3 py-1 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                        style={{ width: "auto" }}
                        onClick={() => updateStatus("Unapproved")}
                      >
                        Unapproved
                      </button>
                    </div>
                  </div>
                </div>
                <Pagination />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CmsComments;
