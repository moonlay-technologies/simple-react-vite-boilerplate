//import { useState } from "react";
import { toast } from 'sonner';
 export interface User {
  id: number;
  name: string;
  role: string;
  city: string;
}
interface UserRowProps {
  user: User;
  onDelete: (id: number) => void;
  onUpdateRole: (id: number, newRole: string) => void;
    editingId: number | null;
    tempName: string;
    setTempName: React.Dispatch<React.SetStateAction<string>>;
    handleSave: (id: number) => void;
    handleStartEdit: (user: {id: number, name: string}) => void;   
}
const ROLES = ['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'Fullstack Developer', 'Project Manager','Project Director'];

 function UserRow({user, onDelete, onUpdateRole, editingId, tempName, setTempName, handleSave, handleStartEdit }: UserRowProps) {

  return (
    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
      <td className="border border-border p-2 text-sm text-foreground">
        {editingId === user.id ? (
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={() => handleSave(user.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave(user.id);}}
              autoFocus
            className="border border-border p-1 rounded w-full bg-background text-foreground focus:outline-none focus:border-ring"
          />
        ) : (
          <span onClick={() => handleStartEdit(user)} className="cursor-pointer hover:text-primary transition-colors">
            {user.name}
          </span>
        )}
      </td>
      <td className="border border-border p-2 text-sm text-foreground">
        <select
          value={user.role}
          onChange={(e) => onUpdateRole(user.id, e.target.value)}
          className="border border-border p-2 rounded bg-background text-foreground focus:outline-none focus:border-ring text-center"
        >
          <option value="">Select Role</option>

          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </td>
      <td className="border border-border p-2 text-sm text-foreground">{user.city}</td>
      <td className="border border-border p-2 text-center">
        <button
          onClick={() => {
            onDelete(user.id);
            toast.success('User deleted successfully!');
          }}
          className=" text-centre bg-destructive text-destructive-foreground hover:opacity-90 px-3 py-1 rounded text-xs font-semibold transition cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;