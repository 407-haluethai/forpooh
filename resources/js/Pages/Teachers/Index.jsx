import { route } from 'ziggy-js';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

console.log(route('teachers')); // ตรวจสอบว่า Route ทำงานหรือไม่

export default function Index() {
    const { teachers } = usePage().props; // รับ props ของ "teachers" จาก Backend
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // เรียงลำดับข้อมูลอาจารย์
    const sortedTeachers = [...teachers.data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // กรองข้อมูลอาจารย์
    const filteredTeachers = sortedTeachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
    const displayedTeachers = filteredTeachers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // ฟังก์ชันจัดการการเรียงลำดับ
    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    // ฟังก์ชันจัดการเปลี่ยนหน้า
    const handlePageChange = (page) => setCurrentPage(page);

    // ฟังก์ชันแสดงปุ่ม Pagination
    const renderPageButtons = () => {
        const buttons = [];
        const lastPage = totalPages;

        if (currentPage > 4) {
            buttons.push(
                <button key={1} className="mx-1 px-3 py-1 border rounded bg-white text-gray-700" onClick={() => handlePageChange(1)}>1</button>
            );
            buttons.push(<span key="dots1" className="mx-1">...</span>);
        }

        for (let i = Math.max(1, currentPage - 2); i <= Math.min(lastPage, currentPage + 2); i++) {
            buttons.push(
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
            buttons.push(<span key="dots2" className="mx-1">...</span>);
            buttons.push(
                <button key={lastPage} className="mx-1 px-3 py-1 border rounded bg-white text-gray-700" onClick={() => handlePageChange(lastPage)}>{lastPage}</button>
            );
        }

        return buttons;
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">รายชื่ออาจารย์</h1>

                {/* ช่องค้นหา */}
                <input
                    type="text"
                    placeholder="ค้นหาชื่อหรืออีเมล"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border rounded w-full"
                />

                {/* ตารางข้อมูล */}
                <div className="overflow-x-auto">
                    {displayedTeachers.length > 0 ? (
                        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-300">
                                    <th className="border p-4 text-gray-700 cursor-pointer" onClick={() => handleSort('name')}>
                                        ชื่อ {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="border p-4 text-gray-700 cursor-pointer" onClick={() => handleSort('email')}>
                                        อีเมล {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedTeachers.map((teacher) => (
                                    <tr key={teacher.id} className="text-center even:bg-gray-100 odd:bg-white">
                                        <td className="border p-4">{teacher.name}</td>
                                        <td className="border p-4">{teacher.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        // กรณีไม่พบข้อมูล
                        <div className="text-center mt-6">
                            <p className="text-gray-700">ไม่พบข้อมูล</p>
                            <button
                                className="mt-4 p-2 bg-blue-500 text-white rounded"
                                onClick={() => window.location.href = route('dashboard')} // ใช้ Route ของ Ziggy
                            >
                                กลับไปยังหน้าแรก
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {displayedTeachers.length > 0 && (
                    <div className="flex justify-center mt-6">
                        {renderPageButtons()}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
