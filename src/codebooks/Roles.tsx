interface RoleSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  hasError?: boolean;
}

const ROLES = [
  {value:0, label: 'Select Role'},
  { value: '1', label: 'Frontend Developer' },
  { value: '2', label: 'Backend Developer' },
  { value: '3', label: 'UI/UX Designer' },
  { value: '4', label: 'Fullstack Developer' },
  { value: '5', label: 'Project Manager' },
  { value: '6', label: 'Project Director' }
];

export default function RoleSelect({ value, onChange, hasError }: RoleSelectProps) {
    return (
    <select
        value={value}
        onChange={onChange}
        className={`border py-2 pl-2 rounded roundeds transition-colors  focus:outline-none ${
            hasError 
                ? 'border-red-500 bg-red-50' 
                : 'border-slate-300 focus:border-slate-500'
        }`}
        >
        {ROLES.map((role) => (
            <option key={role.value} value={role.label}>
                {role.label}
            </option>
        ))}
    </select> 
    )}