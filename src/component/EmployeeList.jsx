import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (employee) => {
    setEditingEmployee({
      ...employee,
      f_Createdate: new Date(employee.f_Createdate).toISOString().split("T")[0], // Format date for input
    });
  };

  const handleCancel = () => {
    setEditingEmployee(null);
    setIsCreating(false);
  };

  const handleSave = async () => {
    try {
      if (isCreating) {
        // Create new employee
        const response = await axios.post(
          `${process.env.SERVER_URL}/api/employee`,
          {
            f_Image: editingEmployee.f_Image,
            f_Name: editingEmployee.f_Name,
            f_Email: editingEmployee.f_Email,
            f_Mobile: editingEmployee.f_Mobile,
            f_Designation: editingEmployee.f_Designation,
            f_gender: editingEmployee.f_gender,
            f_Course: editingEmployee.f_Course,
            f_Createdate: editingEmployee.f_Createdate,
          }
        );

        if (response?.data?.success) {
          setEmployees([...employees, response.data.data]);
          setEditingEmployee(null);
          setIsCreating(false);
        } else {
          throw new Error("Failed to create employee");
        }
      } else {
        // Update existing employee
        const response = await axios.put(
          `http://localhost:8080/api/employee/${editingEmployee.f_Id}`,
          {
            f_Id: parseInt(editingEmployee.f_Id),
            f_Image: editingEmployee.f_Image,
            f_Name: editingEmployee.f_Name,
            f_Email: editingEmployee.f_Email,
            f_Mobile: editingEmployee.f_Mobile,
            f_Designation: editingEmployee.f_Designation,
            f_gender: editingEmployee.f_gender,
            f_Course: editingEmployee.f_Course,
            f_Createdate: editingEmployee.f_Createdate,
          }
        );

        if (response?.data?.success) {
          setEmployees(
            employees.map((emp) =>
              emp.f_Id === editingEmployee.f_Id ? response.data.data : emp
            )
          );
          setEditingEmployee(null);
        } else {
          throw new Error("Failed to update employee");
        }
      }
    } catch (err) {
      console.error("Error while saving employee:", err);
      setError(
        `Failed to ${
          isCreating ? "create" : "update"
        } employee. Please try again.`
      );
    }
  };

  const handleCreate = () => {
    setEditingEmployee({
      f_Id: 0, // Placeholder, assigned by backend
      f_Image: "",
      f_Name: "",
      f_Email: "",
      f_Mobile: "",
      f_Designation: "",
      f_gender: "Male",
      f_Course: "",
      f_Createdate: new Date().toISOString().split("T")[0],
    });
    setIsCreating(true);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/employee/list"
        );
        if (response?.data?.success) {
          setEmployees(response.data.data);
          setLoading(false);
        } else {
          throw new Error("Failed to fetch employees");
        }
      } catch (err) {
        console.error("Error while fetching employees:", err);
        setError("Unable to load employees. Please try again later.");
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/employee/${id}`
      );
      if (response?.data?.success) {
        setEmployees(employees.filter((emp) => emp.f_Id !== id));
        setError(null);
      } else {
        throw new Error("Failed to delete employee");
      }
    } catch (err) {
      console.error("Error while deleting employee:", err);
      setError("Failed to delete employee. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-12">
      <h1 className="text-2xl font-bold mb-4 ">Employee List</h1>
      <button
        onClick={handleCreate}
        className="bg-green-500  text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Create a new Employee
      </button>
      {(editingEmployee || isCreating) && (
        <div className="mb-6 p-4 accent rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">ID</label>
              <input
                type="number"
                name="f_Id"
                value={editingEmployee.f_Id}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Image URL</label>
              <input
                type="text"
                name="f_Image"
                value={editingEmployee.f_Image || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="f_Name"
                value={editingEmployee.f_Name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="f_Email"
                value={editingEmployee.f_Email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Mobile No</label>
              <input
                type="text"
                name="f_Mobile"
                value={editingEmployee.f_Mobile}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Designation</label>
              <input
                type="text"
                name="f_Designation"
                value={editingEmployee.f_Designation}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="f_gender"
                value={editingEmployee.f_gender}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded accent"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Course</label>
              <input
                type="text"
                name="f_Course"
                value={editingEmployee.f_Course || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Create Date</label>
              <input
                type="date"
                name="f_Createdate"
                value={editingEmployee.f_Createdate}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {employees.length === 0 ? (
        <p className="text-center">No employees found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full accent border border-gray-300">
            <thead>
              <tr className="accent-dark">
                <th className="py-2 px-4 border-b text-left">Id</th>
                <th className="py-2 px-4 border-b text-left">Image</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Mobile No</th>
                <th className="py-2 px-4 border-b text-left">Designation</th>
                <th className="py-2 px-4 border-b text-left">Gender</th>
                <th className="py-2 px-4 border-b text-left">Course</th>
                <th className="py-2 px-4 border-b text-left">Create date</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.f_Id}>
                  <td className="py-2 px-4 border-b">{employee.f_Id}</td>
                  <td className="py-2 px-4 border-b">
                    {employee.f_Image ? (
                      <img
                        src={employee.f_Image}
                        alt={employee.f_Name}
                        className="w-12 h-12 object-cover rounded-full"
                        onError={(e) =>
                          (e.target.src =
                            "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg")
                        }
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{employee.f_Name}</td>
                  <td className="py-2 px-4 border-b">{employee.f_Email}</td>
                  <td className="py-2 px-4 border-b">{employee.f_Mobile}</td>
                  <td className="py-2 px-4 border-b">
                    {employee.f_Designation}
                  </td>
                  <td className="py-2 px-4 border-b">{employee.f_gender}</td>
                  <td className="py-2 px-4 border-b">
                    {employee.f_Course || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(employee.f_Createdate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex gap-2">
                      <svg
                        onClick={() => handleEdit(employee)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-pencil-icon lucide-pencil cursor-pointer"
                      >
                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                        <path d="m15 5 4 4" />
                      </svg>

                      <svg
                        onClick={() => handleDelete(employee.f_Id)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-trash2-icon lucide-trash-2 cursor-pointer"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
