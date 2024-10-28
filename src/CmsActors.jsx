import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Pagination from "./components/Pagination.jsx";
import Alert from "./components/Alert";

const CmsActors = () => {
  const [actors, setActors] = useState([]);
  const [actorName, setActorName] = useState("");
  const [actorBirthDate, setActorBirthDate] = useState("");
  const [actorPhoto, setActorPhoto] = useState("");
  const [countryId, setCountryId] = useState("");
  const [countries, setCountries] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editBirthDate, setEditBirthDate] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [editCountryId, setEditCountryId] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [newActor, setNewActor] = useState({
    countries: "",
    actorName: "",
    birthDate: "",
    photos: "",
  });

  // Fungsi untuk mengambil data actors
  const fetchActors = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/actors");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Actors data:", data);
      setActors(data); // Assuming the response data is an array of objects
    } catch (error) {
      console.error("Error fetching actors:", error);
      showAlert("Failed to fetch actors data", "error");
    }
  };

  // Fungsi untuk mengambil data countries
  const fetchCountries = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/countries");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Countries data:", data); // Debugging
      setCountries(data.countries || data); // Handle both {countries: [...]} or direct array response
    } catch (error) {
      console.error("Error fetching countries:", error);
      showAlert("Failed to fetch countries data", "error");
    }
  };

  useEffect(() => {
    fetchActors();
    fetchCountries();
  }, []);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000);
  };

  const addActor = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/actors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: actorName,
          birth_date: actorBirthDate,
          photo: actorPhoto,
          country_id: countryId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newActor = await response.json();
      setActors([...actors, newActor]);
      // Reset form
      setActorName("");
      setActorBirthDate("");
      setActorPhoto("");
      setCountryId("");
      showAlert("Actor added successfully!", "success");
      // Refresh actors list
      fetchActors();
    } catch (error) {
      console.error("Error adding actor:", error);
      showAlert("Failed to add actor", "error");
    }
  };

  const editActor = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/actors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          birth_date: editBirthDate,
          photo: editPhoto,
          country_id: editCountryId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedActor = await response.json();
      setActors(
        actors.map((actor) => (actor.id === id ? updatedActor : actor))
      );
      setEditableId(null);
      showAlert("Actor updated successfully!", "success");
      // Refresh actors list
      fetchActors();
    } catch (error) {
      console.error("Error updating actor:", error);
      showAlert("Failed to update actor", "error");
    }
  };

  const deleteActor = (id) => {
    fetch(`http://localhost:3001/api/actors/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setActors(actors.filter((actor) => actor.id !== id));
        showAlert("Actor deleted successfully.", "error");
      })
      .catch((error) => console.error("Error deleting actor:", error));
  };

  const handleEditClick = (id, name, birth_date, photo, country_id) => {
    setEditableId(id);
    setEditName(name);
    setEditBirthDate(birth_date);
    setEditPhoto(photo);
    setEditCountryId(country_id);
  };

  const handleSaveClick = (id) => {
    if (window.confirm("Are you sure you want to save changes?")) {
      editActor(id);
    }
  };

  // Modifikasi bagian form countries menjadi select dropdown
  const CountrySelect = ({ value, onChange, className }) => (
    <select value={value} onChange={onChange} className={className} required>
      <option value="">Select a country</option>
      {countries.map((country) => (
        <option key={country.id} value={country.id}>
          {country.name}
        </option>
      ))}
    </select>
  );

  // Render country name berdasarkan country_id
  const getCountryName = (countryId) => {
    const country = countries.find((c) => c.id === countryId);
    return country ? country.name : "Unknown";
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <div className="mt-10 flex-1 flex flex-col">
          <main className="flex-1 pb-16 overflow-y-auto">
            <div className="container grid px-6 mx-auto">
              <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Actors Table
              </h2>

              {alert.message && (
                <Alert
                  message={alert.message}
                  type={alert.type}
                  onClose={() => setAlert({ message: "", type: "" })}
                />
              )}

              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (
                        newActor.countries &&
                        newActor.actorName &&
                        newActor.birthDate &&
                        newActor.photos
                      ) {
                        addActor();
                      }
                    }}
                    className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 grid grid-cols-2 gap-6"
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="countries"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="countries"
                        name="countries"
                        required
                        value={newActor.countries}
                        onChange={(e) =>
                          setNewActor({
                            ...newActor,
                            countries: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="actorName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2"
                      >
                        Actor Name
                      </label>
                      <input
                        type="text"
                        id="actorName"
                        name="actorName"
                        required
                        value={newActor.actorName}
                        onChange={(e) =>
                          setNewActor({
                            ...newActor,
                            actorName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="birthDate"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2"
                      >
                        Birth Date
                      </label>
                      <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        required
                        value={newActor.birthDate}
                        onChange={(e) =>
                          setNewActor({
                            ...newActor,
                            birthDate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="photos"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2"
                      >
                        Upload Picture
                      </label>
                      <input
                        type="file"
                        id="photos"
                        name="photos"
                        required
                        onChange={(e) =>
                          setNewActor({
                            ...newActor,
                            photos: e.target.files[0],
                          })
                        }
                        className="w-full px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 mx-auto mt-2 col-span-2 text-sm text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>

              {/* Table */}
              <div className="w-full overflow-hidden rounded-lg shadow-xs mt-8">
                <div className="w-full overflow-x-auto">
                  <table className="w-full whitespace-no-wrap">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Country</th>
                        <th className="px-4 py-3">Actor Name</th>
                        <th className="px-4 py-3">Birth Date</th>
                        <th className="px-4 py-3">Photo</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {actors.map((actor, index) => (
                        <tr
                          key={actor?.id}
                          className="text-gray-700 dark:text-gray-400"
                        >
                          <td className="px-4 py-3 text-sm">{index + 1}</td>
                          <td className="px-4 py-3 text-sm">
                            {getCountryName(actor.country_id)}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {editableId === actor?.id ? (
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-[100px] px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                              />
                            ) : (
                              actor.name
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {editableId === actor?.id ? (
                              <input
                                type="date"
                                value={editBirthDate}
                                onChange={(e) =>
                                  setEditBirthDate(e.target.value)
                                }
                                className="w-[130px] px-3 py-2 text-sm leading-5 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                              />
                            ) : (
                              actor.birth_date
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {actor.photo ? (
                              <img
                                src={actor.photo}
                                alt={`${actor.name}'s photo`}
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <span className="text-gray-500">No photo</span>
                            )}
                          </td>

                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-4 text-sm">
                              {editableId === actor.id ? (
                                <button
                                  className="save-btn flex items-center justify-between w-[100px] px-4 py-2 text-sm font-medium leading-5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                                  aria-label="Save"
                                  onClick={() => handleSaveClick(actor.id)}
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  className="edit-btn flex items-center justify-between w-[100px] px-4 py-2 text-sm font-medium leading-5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                                  aria-label="Edit"
                                  onClick={() =>
                                    handleEditClick(
                                      actor.id,
                                      actor.name,
                                      actor.birthDate,
                                      actor.photo
                                    )
                                  }
                                >
                                  Edit
                                </button>
                              )}

                              <button
                                className="delete-btn flex items-center justify-between w-[100px] px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                                aria-label="Delete"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this actor?"
                                    )
                                  ) {
                                    deleteActor(actor.id);
                                  }
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CmsActors;
