export default function TableHeader() {
  return (
    <thead>
      <tr className="bg-slate-100">
        <th className="border border-slate-300 p-2 text-sm text-black">Name</th>
        <th className="border border-slate-300 p-2 text-sm text-black">Role</th>
        <th className="border border-slate-300 p-2 text-sm text-black">City</th>
        <th className="border border-slate-300 p-2 text-sm text-black text-center">Action</th>
      </tr>
    </thead>
  );
}