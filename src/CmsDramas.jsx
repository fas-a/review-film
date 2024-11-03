import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import DramaPopup from "./components/DramaPopup";

const CmsDramas = () => {
  const [dramas, setDramas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDramas(currentPage);
  }, [currentPage]);

  const fetchDramas = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/dramas?page=${page}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setDramas(data.dramas);
      setTotalItems(data.totalItems || data.dramas.length);
      setTotalPages(
        Math.ceil((data.totalItems || data.dramas.length) / itemsPerPage)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const [editableId, setEditableId] = useState(null);
  const [editDrama, setEditDrama] = useState({
    drama: "",
    actor: "",
    genre: "",
    synopsis: "",
    status: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [currentDrama, setCurrentDrama] = useState(null);

  const editDramaEntry = async (id, updatedDrama) => {
    try {
      const response = await fetch(`http://localhost:3001/api/dramas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDrama),
      });

      if (response.ok) {
        setDramas(
          dramas.map((drama) =>
            drama.id === id ? { ...drama, ...updatedDrama } : drama
          )
        );
      }
    } catch (error) {
      console.error("Error updating drama:", error);
    }
  };

  const deleteDrama = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/dramas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDramas(dramas.filter((drama) => drama.id !== id));
        // Refetch current page if it's the last item on the page
        if (dramas.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchDramas(currentPage);
        }
      }
    } catch (error) {
      console.error("Error deleting drama:", error);
    }
  };

  const handleEditClick = (drama) => {
    setEditableId(drama.id);
    setEditDrama({
      drama: drama.drama,
      actor: drama.actor,
      genre: drama.genre,
      synopsis: drama.synopsis,
      status: drama.status,
    });
  };

  const handleSaveClick = (id) => {
    // Menampilkan kotak dialog konfirmasi
    if (window.confirm("Are you sure you want to save changes?")) {
      // Jika pengguna mengklik 'OK', simpan perubahan
      editDramaEntry(id, editDrama);
      setEditableId(null); // Reset editableId setelah menyimpan
      // Reset form edit setelah penyimpanan
      setEditDrama({
        drama: "",
        actor: "",
        genre: "",
        synopsis: "",
        status: "",
      });
    }
    // Jika pengguna mengklik 'Cancel', tidak ada aksi yang dilakukan
  };

  // Fungsi untuk menangani klik status dan membuka modal
  const handleStatusClick = (drama) => {
    setCurrentDrama(drama);
    setShowModal(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentDrama(null);
  };

  // Fungsi untuk memperbarui status drama
  const handleUpdateStatus = (newStatus) => {
    if (currentDrama) {
      setDramas(
        dramas.map((drama) =>
          drama.id === currentDrama.id ? { ...drama, status: newStatus } : drama
        )
      );
      closeModal(); // Tutup modal setelah status diperbarui
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <div className="mt-10 flex-1 flex flex-col">
          <main className="flex-1 pb-16 overflow-y-auto">
            <div className="container grid px-6 mx-auto">
              <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Dramas Management
              </h2>
              <div className="w-full overflow-hidden rounded-lg shadow-xs mt-8">
                <div className="w-full overflow-x-auto">
                  <table className="w-full whitespace-no-wrap">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3" style={{ width: "150px" }}>
                          Drama
                        </th>
                        <th className="px-4 py-3">Actor</th>
                        <th className="px-4 py-3">Genre</th>
                        <th className="px-4 py-3">Synopsis</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {dramas.map((drama, index) => (
                        <tr
                          key={drama.id}
                          className="text-gray-700 dark:text-gray-400"
                        >
                          <td className="px-4 py-3 text-sm">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>

                          {/* drama Input */}
                          <td
                            className="px-4 py-3 text-sm"
                            style={{ width: "150px" }}
                          >
                            {editableId === drama.id ? (
                              <input
                                type="text"
                                value={editDrama.drama}
                                onChange={(e) =>
                                  setEditDrama({
                                    ...editDrama,
                                    drama: e.target.value,
                                  })
                                }
                                style={{ width: "150px" }}
                                className="px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                              />
                            ) : (
                              <span
                                onDoubleClick={() => handleEditClick(drama)}
                                className="inline-block truncate"
                                style={{ width: "150px" }}
                                title={drama.title}
                              >
                                {drama.title}
                              </span>
                            )}
                          </td>

                          {/* Actor Input */}
                          <td className="px-4 py-3 text-sm">
                            {editableId === drama.id ? (
                              <input
                                type="text"
                                value={editDrama.actor}
                                onChange={(e) =>
                                  setEditDrama({
                                    ...editDrama,
                                    actor: e.target.value,
                                  })
                                }
                                className="w-[100px] px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                              />
                            ) : (
                              <span
                                onDoubleClick={() => handleEditClick(drama)}
                                className="w-[100px] inline-block"
                              >
                                {drama.Actors && drama.Actors.length > 0
                                  ? drama.Actors.map(
                                      (actor) => actor.name
                                    ).join(", ")
                                  : "No actors available"}
                              </span>
                            )}
                          </td>

                          {/* Genre Input */}
                          <td className="px-4 py-3 text-sm">
                            {editableId === drama.id ? (
                              <input
                                type="text"
                                value={editDrama.genre}
                                onChange={(e) =>
                                  setEditDrama({
                                    ...editDrama,
                                    genre: e.target.value,
                                  })
                                }
                                className="w-[100px] px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                              />
                            ) : (
                              <span
                                onDoubleClick={() => handleEditClick(drama)}
                                className="w-[100px] inline-block"
                              >
                                {drama.Genres && drama.Genres.length > 0
                                  ? drama.Genres.map(
                                      (genre) => genre.name
                                    ).join(", ")
                                  : "No genres available"}
                              </span>
                            )}
                          </td>

                          {/* Synopsis Year Input */}
                          <td className="px-4 py-3 text-sm">
                            {editableId === drama.id ? (
                              <input
                                type="text"
                                value={editDrama.synopsis}
                                onChange={(e) =>
                                  setEditDrama({
                                    ...editDrama,
                                    synopsis: e.target.value,
                                  })
                                }
                                className="w-[100px] px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                              />
                            ) : (
                              <span
                                onDoubleClick={() => handleEditClick(drama)}
                                className="w-[100px] inline-block"
                              >
                                {drama.synopsis}
                              </span>
                            )}
                          </td>

                          {/* Button Status */}
                          <td className="px-4 py-3 text-sm">
                            <button
                              className={`px-4 py-2 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ${
                                drama.status === "Pending"
                                  ? "bg-blue-500"
                                  : drama.status === "Approved"
                                  ? "bg-green-600"
                                  : "bg-red-600"
                              }`}
                              style={{
                                backgroundColor:
                                  drama.status === "Pending"
                                    ? "hsl(211, 19%, 44%)"
                                    : drama.status === "Approved"
                                    ? "hsl(142, 74%, 30%)"
                                    : "hsl(0, 78%, 52%)",
                                color: "white",
                                padding: "8px 16px",
                                margin: "4px",
                              }}
                              onClick={() => handleStatusClick(drama)}
                            >
                              {drama.status}
                            </button>
                          </td>

                          {/* Save & Delete Buttons */}
                          <td className="px-4 py-3 text-sm">
                            <div className="flex gap-4">
                              {editableId === drama.id ? (
                                <button
                                  className="save-btn flex items-center justify-between w-[100px] px-4 py-2 text-sm font-medium leading-5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                                  aria-label="Save"
                                  onClick={() => handleSaveClick(drama.id)}
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
                                  onClick={() => handleEditClick(drama)}
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
                                      "Are you sure you want to delete this item?"
                                    )
                                  ) {
                                    deleteDrama(drama.id);
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
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  paginate={handlePageChange}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {showModal && currentDrama && (
        <DramaPopup
          drama={currentDrama}
          onClose={closeModal}
          onUpdateStatus={handleUpdateStatus} // Kirim fungsi ini ke DramaPopup
        />
      )}
    </div>
  );
};

export default CmsDramas;
