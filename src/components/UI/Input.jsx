const Input = ({ input, className, label }) => {
  return (
    <div className='mb-6'>
      <label
        htmlFor={input.id}
        className='block text-sm font-semibold w-fit leading-6 text-gray-900 cursor-pointer'
      >
        {label}
      </label>
      <input
        ref={input.ref}
        {...input}
        className={`mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200 ${className}`}
      />
    </div>
  );
};

export default Input;
