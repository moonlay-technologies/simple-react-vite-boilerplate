import { useState } from 'react';
import RowSelect from "@/codebooks/roles";
import { toast } from 'sonner';

interface UserFormProps {
  onAddUser: (name: string, role: string, city: string) => void;
  onCancel: () => void;
}

export default function UserForm({ onAddUser, onCancel }: UserFormProps) {
    const [newName, setNewName] = useState('');
    const [newRole, setNewRole] = useState('');
    const [newCity, setNewCity] = useState('');
    const [nameError, setNameError] = useState('');
    const [cityError, setCityError] = useState('');
    const [roleError, setRoleError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

  const clearForm = () => {
      setNewName('');
      setNewRole('');
      setNewCity('');
      setNameError('');
      setCityError('');
      setRoleError(false);
      setSuccessMessage('');
  };
    const handleCancel = () =>{
      clearForm();
       if(onCancel){
        onCancel();
       }
     };

    const handleAddUser = (e: React.FormEvent) => {
       e.preventDefault();
       let hasError = false;

    const trimmedName=newName.trim();   
    const hasNumbersInName = /\d/.test(trimmedName);
    if (!trimmedName) {
         setNameError('The name field must not be empty.');
         hasError = true;
       } else if (trimmedName.length < 3) {
         setNameError('The name must have at least 3 characters.');
         hasError = true;
       } else if (hasNumbersInName) {
         setNameError('The name must not contain numbers.');
         hasError = true;
       } else {
         setNameError('');
       }

    const trimmedCity = newCity.trim();
    if(!trimmedCity){
        setCityError('The city field must not be empty.');
        hasError=true;
    }   
    else{
        setCityError('');
    }    
    if(!newRole || newRole == 'Select Role'){
      setRoleError(true);
      hasError=true;
    }
    else{
      setRoleError(false);
    }
    if(hasError)return;

    onAddUser(newName, newRole, newCity);

    setSuccessMessage('The user has been successfully added.');
    setTimeout(() =>{
        setSuccessMessage('');
    }, 3000);
       toast.success('User added successfully!');     
       clearForm();
     };
return (
   <form onSubmit={handleAddUser} className="flex flex-col gap-4 mb-4">
    {successMessage && (<div className="text-green-500 text-sm">{successMessage}</div>)}
    <div>
      <input
        type="text"
        placeholder="Name"
        value={newName}
        onChange={(e) => {setNewName(e.target.value);
            if(nameError) setNameError('');
        }}
        className={nameError ? "border border-red-500 p2 rounded w-full py-2 rounded  "
        : "border-red-300 bg-white p-2 rounded w-full border border-slate-800 py-2 rounded"
        }
        />
        {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
    </div>
    <RowSelect value={newRole} onChange={(e) => {setNewRole(e.target.value);
        if (roleError) setRoleError(false);
      }}
      hasError={roleError}
      />
      {roleError && <p className="text-red-500 text-xs mt-1">Please select a role</p>}
        <div>
    <input
      type="text"
      placeholder="City"
      value={newCity}
      onChange={(e) =>{ setNewCity(e.target.value);
      if(cityError) setCityError('');
      }}
      className={cityError ? "border border-red-500 p-2 rounded w-full py-2 rounded padding-left:5px"
        : "border-slate-300 bg-white p-2 rounded w-full o border border-slate-700text slate-800 py-2 rounded"
        }
        />
        {cityError && <p className="text-red-500 text-xs mt-1">{cityError}</p>}
    </div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded transition">
      Add User
    </button>
     <button
      type="button"
      onClick={handleCancel}
      className="bg-red-500 hover:bg-blue-600 text-white px-2 py-2 rounded transition">
      Cancel
    </button>
  </form>
)
}