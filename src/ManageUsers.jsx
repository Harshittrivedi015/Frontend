import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`);
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };

  const updateRole = async (id, newRole) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}/role`, { role: newRole });
      setUsers(users.map(user => user._id === id ? { ...user, role: newRole } : user));
    } catch (err) {
      setError('Failed to update user role');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold">Username</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Email</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Mobile</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Role</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="py-3 px-6">{user.username}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.mobile}</td>
                  <td className="py-3 px-6">
                    <select
                      value={user.role}
                      onChange={(e) => updateRole(user._id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 bg-white"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option  value="agent">Agent</option>
                    </select>
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
