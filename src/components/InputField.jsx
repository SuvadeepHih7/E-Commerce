export default function InputField({ label, register, name, type = "text", errors, validation={} }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        {...register(name, validation)}
        type={type}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-300"
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
    </div>
  );
}
