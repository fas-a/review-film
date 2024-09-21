import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Pagination from "./components/Pagination.jsx";

const CmsComments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "user123",
      rate: 4,
      drama: "Lovely Runner",
      comment: "Great drama!",
      status: "Approved",
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
      status: "Unapproved",
    },
  ]);

  const [editableId, setEditableId] = useState(null);
  const [editComment, setEditComment] = useState({
    username: "",
    rate: 0,
    drama: "",
    comment: "",
    status: "",
  });

  const editCommentEntry = (id, updatedComment) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, ...updatedComment } : comment
      )
    );
  };

  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleEditClick = (comment) => {
    setEditableId(comment.id);
    setEditComment({
      username: comment.username,
      rate: comment.rate,
      drama: comment.drama,
      comment: comment.comment,
      status: comment.status,
    });
  };

  const handleSaveClick = (id) => {
    editCommentEntry(id, editComment);
    setEditableId(null);
    setEditComment({
      username: "",
      rate: 0,
      drama: "",
      comment: "",
      status: "",
    });
  };

  const renderStars = (rate) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rate ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <div className="mt-10 flex-1 flex flex-col">
          <main className="flex-1 pb-16 overflow-y-auto">
            <div className="container grid px-6 mx-auto">
              <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Comments Management
              </h2>
              <div className="w-full overflow-hidden rounded-lg shadow-xs mt-8">
                <div className="w-full overflow-x-auto">
                  <table className="w-full whitespace-no-wrap">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Username</th>
                        <th className="px-4 py-3">Rate</th>
                        <th className="px-4 py-3">Drama</th>
                        <th className="px-4 py-3">Comments</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {comments.map((comment, index) => (
                        <tr
                          key={comment.id}
                          className="text-gray-700 dark:text-gray-400"
                        >
                          <td className="px-4 py-3 text-sm">{index + 1}</td>

                          {/* Username Input */}
                          <td className="px-4 py-3 text-sm">
                            {editableId === comment.id ? (
                              <input
                                type="text"
                                value={editComment.username}
                                onChange={(e) =>
                                  setEditComment({
                                    ...editComment,
                                    username: e.target.value,
                                  })
                                }
                                className="w-[100px] px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                              />
                            ) : (
                              <span
                                onDoubleClick={() => handleEditClick(comment)}
                                className="w-[100px] inline-block"
                              >
                                {comment.username}
                              </span>
                            )}
                          </td>

                          {/* Rate Stars */}
                          <td className="px-4 py-3 text-sm">
                            {editableId === comment.id ? (
                              <input
                                type="number"
                                min="1"
                                max="5"
                                value={editComment.rate}
                                onChange={(e) =>
                                  setEditComment({
                                    ...editComment,
                                    rate: e.target.value,
                                  })
                                }
                                className="w-[50px] px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                              />
                            ) : (
                              <span
                                onDoubleClick={() => handleEditClick(comment)}
                                className="w-[100px] inline-block"
                              >
                                {renderStars(comment.rate)}
                              </span>
                            )}
                          </td>

                          {/* Drama Input */}
                          <td className="px-4 py-3 text-sm">
                            {editableId === comment.id ? (
                              <input
                                type="text"
                                value={editComment.drama}
                                onChange={(e) =>
                                  setEditComment({
                                    ...editComment,
                                    drama: e.target.value,
                                  })
                                }
                                className="w-[100px] px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                              />
                            ) : (
                              <span
                                onDoubleClick={() => handleEditClick(comment)}
                                className="w-[100px] inline-block"
                              >
                                {comment.drama}
                              </span>
                            )}
                          </td>

                          {/* Comments Input */}
                          <td className="px-4 py-3 text-sm">
                            {editableId === comment.id ? (
                              <input
                                type="text"
                                value={editComment.comment}
                                onChange={(e) =>
                                  setEditComment({
                                    ...editComment,
                                    comment: e.target.value,
                                  })
                                }
                                className="w-[150px] px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                              />
                            ) : (
                              <span
                                onDoubleClick={() => handleEditClick(comment)}
                                className="w-[150px] inline-block"
                              >
                                {comment.comment}
                              </span>
                            )}
                          </td>

                          {/* Status Input */}
                          <td className="px-4 py-3 text-sm">
                            {editableId === comment.id ? (
                              <select
                                value={editComment.status}
                                onChange={(e) =>
                                  setEditComment({
                                    ...editComment,
                                    status: e.target.value,
                                  })
                                }
                                className="w-[100px] px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                              >
                                <option value="Approved">Approved</option>
                                <option value="Pending">Pending</option>
                                <option value="Unapproved">Unapproved</option>
                              </select>
                            ) : (
                              <span
                                onDoubleClick={() => handleEditClick(comment)}
                                className="w-[100px] inline-block"
                              >
                                {comment.status}
                              </span>
                            )}
                          </td>

                          {/* Save & Delete Buttons */}
                          <td className="px-4 py-3 text-sm">
                            <div className="flex gap-4">
                              {editableId === comment.id ? (
                                <button
                                  className="save-btn flex items-center justify-between w-[100px] px-4 py-2 text-sm font-medium leading-5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                                  aria-label="Save"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Are you sure you want to save changes?"
                                      )
                                    ) {
                                      handleSaveClick(comment.id);
                                    }
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 512 512"
                                  >
                                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                                  </svg>
                                  <span className="ml-2">Save</span>
                                </button>
                              ) : (
                                <button
                                  className="edit-btn flex items-center justify-between w-[100px] px-4 py-2 text-sm font-medium leading-5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                                  aria-label="Edit"
                                  onClick={() => handleEditClick(comment)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 512 512"
                                  >
                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32L64 160c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                                  </svg>
                                  <span className="ml-2">Edit</span>
                                </button>
                              )}

                              <button
                                className="delete-btn flex items-center justify-between w-[100px] px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                                aria-label="Delete"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this comment?"
                                    )
                                  ) {
                                    deleteComment(comment.id);
                                  }
                                }}
                              >
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                <span className="ml-2">Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
