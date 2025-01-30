import React from 'react';
import { Search, Plus } from 'lucide-react';

//Component for searching users and adding a new user
export const SearchBar = ({ searchTerm, onSearchChange, onAddUser }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <div className="relative w-full md:w-64">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)} // Handle search input change
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <button
                onClick={onAddUser} // Handle add user button click
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
                <Plus className="w-5 h-5 mr-2" />
                Add User
            </button>
        </div>
    );
};
