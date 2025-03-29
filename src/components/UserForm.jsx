const UserForm = ({
    formData,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit,
    editingId,
    designationOptions,
    favoriteOptions,
    onCancel
}) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {editingId !== null ? 'Edit User' : 'Add User'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">User ID:</label>
                    <input
                        type="text"
                        value={editingId !== null ? editingId : 'Auto-generated'}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Name*:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Gender*:</label>
                    <div className="flex space-x-4">
                        {['Male', 'Female'].map(gender => (
                            <label key={gender} className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={formData.gender === gender}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600"
                                    required
                                />
                                <span className="ml-2 text-gray-700">{gender}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Designation*:</label>
                    <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    >
                        <option value="">Select Designation</option>
                        {designationOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Favorites*:</label>
                    <div className="grid grid-cols-2 gap-2">
                        {favoriteOptions.map(option => (
                            <label key={option} className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={formData.favorites.includes(option)}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2 text-gray-700">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex space-x-3 pt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        {editingId !== null ? 'Update User' : 'Add User'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;