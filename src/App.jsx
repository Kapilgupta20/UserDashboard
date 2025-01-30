import React, { useState, useEffect } from 'react';
import { Header } from './components/header.jsx';
import { SearchBar } from './components/SearchBar.jsx';
import { UserTable } from './components/usertable.jsx';
import { UserModal } from './components/UserModal.jsx';
import { getUsers, addUser, updateUser, deleteUser } from "./utils/api.js";

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Initial form state for adding a user
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users data from the API
  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  // Sort users based on the sort field and direction
  const sortedUsers = [...users].sort((a, b) => {
    const compareValue = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'id') {
      return (a.id - b.id) * compareValue;
    }
    return a[sortField].localeCompare(b[sortField]) * compareValue;
  });

  // Filter users based on the search term
  const filteredUsers = sortedUsers.filter(user =>
    user.id === parseInt(searchTerm) ||
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sorting users based on a field
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Validate the form data before submitting
  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.department) {
      setError('All fields are required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(async () => {
      if (editingUser) {
        const updatedUser = await updateUser(editingUser.id, formData);
        setUsers(users.map(user => user.id === editingUser.id ? { ...formData, id: editingUser.id } : user));
      } else {
        const newUser = await addUser(formData);
        setUsers([...users, { ...formData, id: users.length + 1 }]);
      }
      setIsLoading(false);
      setIsModalOpen(false);
      setEditingUser(null);
      setFormData(initialFormState);
      setError('');
    }, 1000);
  };

  // Handle editing a user
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };

  // Handle deleting a user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const success = await deleteUser(id);
      if (success) setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddUser={() => {
            setEditingUser(null);
            setFormData(initialFormState);
            setIsModalOpen(true);
          }}
        />

        <UserTable
          users={filteredUsers}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          isLoading={isLoading}
          error={error}
          editingUser={editingUser}
        />
      </main>
    </div>
  );
}

export default App;
