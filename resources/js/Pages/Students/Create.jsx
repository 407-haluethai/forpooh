import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const { data, setData, post, errors } = useForm({
        name: '',
        student_id: '',
        photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/students');
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">เพิ่มนักศึกษา</h1>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700">ชื่อ</label>
                        <input type="text" className="w-full p-2 border rounded" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">รหัสนักศึกษา</label>
                        <input type="text" className="w-full p-2 border rounded" value={data.student_id} onChange={(e) => setData('student_id', e.target.value)} />
                        {errors.student_id && <p className="text-red-500">{errors.student_id}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">รูป</label>
                        <input type="file" className="w-full p-2 border rounded" onChange={(e) => setData('photo', e.target.files[0])} />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">บันทึก</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
