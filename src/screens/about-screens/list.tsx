import { useState } from 'react';
import UserRow, { User } from "@/codebooks/userRow";
import TableHeader from "@/components/tableHeader";
import UserForm from "@/codebooks/userForm";
  const initialData: User[] = [
    { id: 1, name: 'Anja Milijasevic', role: 'Frontend Developer', city: 'Belgrade' },
    { id: 2, name: 'Marko Markovic', role: 'Backend Developer', city: 'Novi Sad' },
    { id: 3, name: 'Jovana Petrovic', role: 'UI/UX Designer', city: 'Nis' },
    { id: 4, name: 'Petar Jovanovic', role: 'Fullstack Developer', city: 'Kragujevac' },
    { id: 5, name: 'Maja Stojanovic', role: 'Project Manager', city: 'Subotica' }
  ];
  
  function UserTable() {
      const [editingId, setEditingId] = useState<number | null>(null);
      const [tempName, setTempName] = useState('');
      
      const [users, setUsers] = useState<User[]>(() => {
      const saved = localStorage.getItem('users');
      return saved ? JSON.parse(saved) : initialData;
    });
    
    const [showForm, setShowForm] = useState(false);
    const handleAddUser = (name: string, role: string, city: string) => {  
    const newUser: User = {
      id: Date.now(), 
      name,
      role,
      city
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setShowForm(false);
  };
  const handleCancel = () =>{
      setShowForm(false);
    };
  const handleStartEdit= (user: {id: number, name: string}) => { 
    setEditingId(user.id);
    setTempName(user.name);
  };

  const handleSave = (id: number) => {
    const updatedUsers = users.map((user) => 
      user.id === id ? { ...user, name: tempName } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingId(null);
  }

  const handleUpdateRole = (id: number, newRole: string) => {
    const updatedUsers = users.map((user) => 
      user.id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    setEditingId(null);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleDelete = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };
  
  return ( 
    <div className="min-h-screen max-w-6xl mx-auto bg-slate-50 px-4 sm:px-8 md:py-8 md:pr-8">   
      <h2 className="text-xl font-bold mb-4 text-slate-800">List of Users (JSON table)</h2>
      <table className="w-full border-collapse border border-slate-300 text-left">
        <TableHeader />
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <UserRow key={user.id} user={user} onDelete={handleDelete} onUpdateRole={handleUpdateRole} editingId={editingId} tempName={tempName} setTempName={setTempName} handleSave={handleSave} handleStartEdit={handleStartEdit} />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-4 text-slate-500 text-sm">
                No more data in the table.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 text-sm text-slate-600">
        <button onClick={() => setShowForm(!showForm)} className="text-blue-500 hover:underline">
          {showForm ? 'Hide Form' : 'Add New User'}
        </button>
        
        {showForm && (
          <div className="mt-2">
            <UserForm onAddUser={handleAddUser} onCancel={handleCancel} />
          </div>
        )}
        </div>
    </div>    
  );
}
export default UserTable;