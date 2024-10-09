import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editUserId, setEditUserId] = useState(null);

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name,
      email,
    };
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleUpdateUser = () => {
    setUsers(
      users.map((user) =>
        user.id === editUserId ? { ...user, name, email } : user
      )
    );
    setEditUserId(null);
    setName("");
    setEmail("");
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">User Management</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 mr-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mr-2 border rounded"
        />
        {editUserId ? (
          <button
            onClick={handleUpdateUser}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Update User
          </button>
        ) : (
          <button
            onClick={handleAddUser}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add User
          </button>
        )}
      </div>

      <ul className="text-white">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center mb-2">
            <span>
              {user.name} ({user.email})
            </span>
            <div>
              <button
                onClick={() => handleEditUser(user)}
                className="bg-yellow-500 text-white p-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
