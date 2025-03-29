const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">User Management System</h1>
                <div className="space-x-4">
                    <button className="px-4 py-2 bg-blue-700 rounded-md hover:bg-blue-800">
                        Home
                    </button>
                    <button className="px-4 py-2 bg-blue-700 rounded-md hover:bg-blue-800">
                        Users
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;