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

  const handleCancel = () => {
    clearForm();
    if (onCancel) {
      onCancel();
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    const trimmedName = newName.trim();   
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
    if (!trimmedCity) {
      setCityError('The city field must not be empty.');
      hasError = true;
    } else {
      setCityError('');
    }

    if (!newRole || newRole === 'Select Role') {
      setRoleError(true);
      hasError = true;
    } else {
      setRoleError(false);
    }

    if (hasError) return;

    onAddUser(newName, newRole, newCity);

    setSuccessMessage('The user has been successfully added.');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
    toast.success('User added successfully!');     
    clearForm();
  };

  return (
    <form onSubmit={handleAddUser} className="flex flex-col gap-4 mb-4 bg-card p-4 rounded-lg border border-border">
      {successMessage && (<div className="text-emerald-500 text-sm">{successMessage}</div>)}
      
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
            if (nameError) setNameError('');
          }}
          className={
            nameError 
              ? "border border-red-500 p-2 rounded w-full py-2 bg-background text-foreground focus:outline-none"
              : "p-2 rounded w-full border border-border bg-background text-foreground py-2 focus:outline-none focus:border-ring"
          }
        />
        {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
      </div>

      <RowSelect 
        value={newRole} 
        onChange={(e) => {
          setNewRole(e.target.value);
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
          onChange={(e) => { 
            setNewCity(e.target.value);
            if (cityError) setCityError('');
          }}
          className={
            cityError 
              ? "border border-red-500 p-2 rounded w-full py-2 bg-background text-foreground focus:outline-none"
              : "p-2 rounded w-full border border-border bg-background text-foreground py-2 focus:outline-none focus:border-ring"
          }
        />
        {cityError && <p className="text-red-500 text-xs mt-1">{cityError}</p>}
      </div>

      <button
        type="submit"
        className="bg-primary text-primary-foreground hover:opacity-90 px-2 py-2 rounded transition cursor-pointer font-medium">
        Add User
      </button>

      <button
        type="button"
        onClick={handleCancel}
        className="bg-secondary text-secondary-foreground hover:opacity-80 px-2 py-2 rounded transition cursor-pointer font-medium">
        Cancel
      </button>
    </form>
  );
}