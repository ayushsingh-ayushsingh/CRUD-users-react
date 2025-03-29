import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import DisplayUsers from './components/DisplayUsers';
import './App.css';

function App() {
  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem('crud-users');
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (error) {
      console.error('Failed to load users:', error);
      return [];
    }
  });

  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    gender: '',
    designation: '',
    favorites: []
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const designationOptions = ['Developer', 'Designer', 'Manager', 'Tester', 'HR'];
  const favoriteOptions = ['Reading', 'Gaming', 'Sports', 'Music', 'Traveling', 'Web-Surfing'];

  useEffect(() => {
    try {
      localStorage.setItem('crud-users', JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save users:', error);
    }
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      favorites: checked
        ? [...prev.favorites, value]
        : prev.favorites.filter(item => item !== value)
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert('Name is required');
      return false;
    }
    if (!formData.gender) {
      alert('Please select a gender');
      return false;
    }
    if (!formData.designation) {
      alert('Please select a designation');
      return false;
    }
    if (formData.favorites.length === 0) {
      alert('Please select at least one favorite');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingId !== null) {
      setUsers(users.map(user => 
        user.id === editingId ? { ...formData, id: editingId } : user
      ));
    } else {
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      setUsers([...users, { ...formData, id: newId }]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      name: '',
      gender: '',
      designation: '',
      favorites: []
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      if (editingId === id) resetForm();
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {showForm ? 'Hide Form' : 'Add New User'}
        </button>

        {showForm && (
          <UserForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmit={handleSubmit}
            editingId={editingId}
            designationOptions={designationOptions}
            favoriteOptions={favoriteOptions}
            onCancel={resetForm}
          />
        )}

        <DisplayUsers
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  );
}

export default App;