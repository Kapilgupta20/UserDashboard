import React, { useState, useEffect, useCallback } from "react";
import { ChevronDown, Edit2, Trash2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

// Component for displaying the list of users
export const UserTable = ({ users, sortField, sortDirection, onSort, onEdit, onDelete }) => {
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    // Load initial users
    useEffect(() => {
        setDisplayedUsers(users.slice(0, 10));
        setHasMore(users.length > 10);
    }, [users]);

    // Sort the users list based on the sort field and direction
    useEffect(() => {
        if (sortField) {
            setDisplayedUsers((prevUsers) =>
                [...prevUsers].sort((a, b) =>
                    sortDirection === "asc" ? (a[sortField] > b[sortField] ? 1 : -1) : (a[sortField] < b[sortField] ? 1 : -1)
                )
            );
        }
    }, [sortField, sortDirection]);

    // Function to load more users with a small delay
    const fetchMoreData = useCallback(() => {
        setTimeout(() => {
            const nextUsers = users.slice(displayedUsers.length, displayedUsers.length + 10);
            setDisplayedUsers((prevUsers) => [...prevUsers, ...nextUsers]);
            setHasMore(displayedUsers.length + nextUsers.length < users.length);
        }, 300); // Simulate a delay
    }, [users, displayedUsers.length]);

    // Handle case where there are no users
    if (users.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <h4 className="text-center py-4 text-gray-500">No user record available or Some error occured</h4>
            </div>
        );
    }

    return (
        <InfiniteScroll
            dataLength={displayedUsers.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 className="text-center py-4">Loading...</h4>}
            endMessage={<h4 className="text-center py-4 text-gray-500">No more users to load</h4>}
        >
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => onSort("id")}
                                >
                                    <div className="flex items-center">
                                        ID
                                        <ChevronDown className={`w-4 h-4 ml-1 transform ${sortField === "id" && sortDirection === "desc" ? "rotate-180" : ""}`} />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => onSort("department")}
                                >
                                    <div className="flex items-center">
                                        Department
                                        <ChevronDown className={`w-4 h-4 ml-1 transform ${sortField === "department" && sortDirection === "desc" ? "rotate-180" : ""}`} />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {displayedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {user.firstName} {user.lastName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => onEdit(user)} className="text-indigo-600 hover:text-indigo-900 mr-4 cursor-pointer">
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => onDelete(user.id)} className="text-red-600 hover:text-red-900 cursor-pointer">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </InfiniteScroll>
    );
};
