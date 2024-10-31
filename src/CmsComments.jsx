import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import FilterAndSearch from "./components/FilterAndSearch";

const CmsComments = () => {
  // Data statis untuk ditampilkan (bisa diganti dengan data dari database)
  const [comments, setComments] = useState([]);

  // State untuk filter, show, search, dan checkbox yang dipilih
  const [filterValue, setFilterValue] = useState("none");
  const [showValue, setShowValue] = useState("10");
  const [searchValue, setSearchValue] = useState("");
  const [selectedComments, setSelectedComments] = useState(new Set());

  // Filtering safely with a fallback in case comments are undefined
const filteredComments = (comments || []).filter((comment) => {
  if (filterValue === "none") return true;
  return comment.status.toLowerCase() === filterValue.toLowerCase();
});

// Search safely with a fallback in case filteredComments are undefined
const searchedComments = (filteredComments || []).filter(
  (comment) =>
    comment.User.username.toLowerCase().includes(searchValue.toLowerCase()) ||
    comment.Drama.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    comment.content.toLowerCase().includes(searchValue.toLowerCase())
);

  // Limit the number of displayed comments based on showValue
  const displayedComments = searchedComments.slice(0, parseInt(showValue));

  // Fungsi untuk mengubah status komentar
  // const updateStatus = (newStatus) => {
  //   setComments((prevComments) =>
  //     prevComments.map((comment) =>
  //       selectedComments.has(comment.id)
  //         ? { ...comment, status: newStatus }
  //         : comment
  //     )
  //   );
  //   setSelectedComments(new Set()); // Reset selected comments after updating
  // };

  const updateStatus = async (selectedCommentIds, newStatus) => {
    try {
      const response = await fetch('http://localhost:3001/api/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentIds: Array.from(selectedCommentIds),
          newStatus: newStatus,
        }),
      });
  
      if (!response.ok) throw new Error('Failed to update status.');
  
      const data = await response.json();
      console.log(data.message); // "Status updated successfully."
      setComments((prevComments) =>
            prevComments.map((comment) =>
              selectedComments.has(comment.id)
                ? { ...comment, status: newStatus }
                : comment
            )
          );
    } catch (error) {
      console.error('Error updating comment status:', error);
    }
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
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/comments");
        if (!response.ok) throw new Error("Failed to fetch comments");
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments(); 
  }
  , []);

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
                      {comments && displayedComments.map((comment) => (
                        <tr key={comment.id} className="text-gray-700 dark:text-gray-400">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-indigo-600"
                              onChange={() => handleCheckboxChange(comment.id)}
                              checked={selectedComments.has(comment.id)}
                            />
                          </td>
                          <td className="px-4 py-3">{comment.User.username}</td>
                          <td className="px-4 py-3">{comment.rate}</td>
                          <td className="px-4 py-3">{comment.Drama.title}</td>
                          <td className="px-4 py-3">{comment.content}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 font-semibold leading-tight rounded-full ${
                                comment.status === "Approved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {comment.status}
                            </span>
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
                        onClick={() => updateStatus(selectedComments, "Approved")}
                      >
                        Approved
                      </button>

                      {/* Unapproved Button */}
                      <button
                        id="unapproveBtn"
                        type="button"
                        className="px-3 py-1 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                        style={{ width: "auto" }}
                        onClick={() => updateStatus(selectedComments, "Unapproved")}
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
