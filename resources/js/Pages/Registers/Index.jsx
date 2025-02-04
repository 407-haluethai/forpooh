import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index() {
    const { registers } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const sortedRegisters = [...registers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredRegisters = sortedRegisters.filter(register =>
        register.id.toString().includes(searchTerm) ||
        register.student_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRegisters.length / itemsPerPage);
    const displayedRegisters = filteredRegisters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        const lastPage = totalPages;

        if (currentPage > 4) {
            pageButtons.push(
                <button key={1} className="mx-1 px-3 py-1 border rounded bg-white text-gray-700" onClick={() => handlePageChange(1)}>1</button>
            );
            pageButtons.push(<span key="dots1" className="mx-1">...</span>);
        }

        for (let i = Math.max(1, currentPage - 2); i <= Math.min(lastPage, currentPage + 2); i++) {
            pageButtons.push(
                <button
                    key={i}
                    className={`mx-1 px-3 py-1 border rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        if (currentPage < lastPage - 3) {
            pageButtons.push(<span key="dots2" className="mx-1">...</span>);
            pageButtons.push(
                <button key={lastPage} className="mx-1 px-3 py-1 border rounded bg-white text-gray-700" onClick={() => handlePageChange(lastPage)}>{lastPage}</button>
            );
        }

        return pageButtons;
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">รายการลงทะเบียน</h1>
                <input
                    type="text"
                    placeholder="ค้นหา"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="overflow-x-auto">
                    {displayedRegisters.length > 0 ? (
                        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-300">
                                    <th className="border p-4 text-gray-700 cursor-pointer hover:bg-gray-400" onClick={() => handleSort('id')}>
                                        รหัสลงทะเบียน {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="border p-4 text-gray-700 cursor-pointer hover:bg-gray-400" onClick={() => handleSort('student_name')}>
                                        นักศึกษา {sortConfig.key === 'student_name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedRegisters.map((register) => (
                                    <tr key={register.id} className="text-center even:bg-gray-100 odd:bg-white hover:bg-gray-200">
                                        <td className="border p-4">{register.id}</td>
                                        <td className="border p-4">{register.student_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center mt-6">
                            <p className="text-gray-700">ไม่พบข้อมูล</p>
                            <button className="mt-4 p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600" onClick={() => window.location.href = '/'}>
                                Back to Home Page
                            </button>
                        </div>
                    )}
                </div>
                {displayedRegisters.length > 0 && (
                    <div className="flex justify-center mt-6">
                        {renderPageButtons()}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
