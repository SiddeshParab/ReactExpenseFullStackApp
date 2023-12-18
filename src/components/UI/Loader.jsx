const Loader = (props) => {
  return (
    <div className='flex items-center justify-center gap-2'>
      <div
        className={`h-fit w-fit rounded-full animate-spin border-solid border-t-transparent ${props.className}`}
      />
      {props.label && <span>{props.label}</span>}
    </div>
  );
};

export default Loader;
