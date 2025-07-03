import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import './App.css';
import { LOGIN_CREATE } from './constants';
import { request } from './api/Request';
import { toast } from 'react-toastify';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [dataList, setDataList] = useState([]); 
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      const updatedList = [...dataList];
      updatedList[editingIndex] = data;
      setDataList(updatedList);
      setEditingIndex(null);
    } else {
      setDataList([...dataList, data]);
    }
    toast.success('yaxshi')
    reset();
  };

  const handleEdit = (index) => {
    const item = dataList[index];
    setValue('firstName', item.firstName);
    setValue('lastName', item.lastName);
    setValue('email', item.email);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newList = dataList.filter((_, i) => i !== index);
    setDataList(newList);
    if (editingIndex === index) {
      reset();
      setEditingIndex(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get(LOGIN_CREATE);
      } catch (error) {
        toast.error('oxshamadi')
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <form className="flex flex-col gap-3 w-[500px]" onSubmit={handleSubmit(onSubmit)} noValidate>
        <input type="text" className="border-2 p-2" placeholder="First Name" {...register('firstName', { required: 'First name hato' })}/>
        {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

        <input type="text" className="border-2 p-2" placeholder="Last Name" {...register('lastName', { required: 'Last name hato' })} />
        {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

        <input type="email" className="border-2 p-2" placeholder="Email"
          {...register('email', {
            required: 'Email hato',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: '@ qopketi',
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingIndex !== null ? 'Update' : 'Submit'}
        </button>
      </form>

      <div className="mt-6 grid gap-4 grid-cols-4 ">
        {dataList.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg shadow bg-gray-100" >
            <h2 className="text-lg font-bold mb-2">Ma'lumot #{index + 1}</h2>
            <p><strong>First Name:</strong> {item.firstName}</p>
            <p><strong>Last Name:</strong> {item.lastName}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <div className="flex gap-3 mt-3">
              <button onClick={() => handleEdit(index)} className="bg-yellow-400 text-white px-4 py-1 rounded hover:bg-yellow-500" >
                Edit
              </button>
              <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
