const Footer = () => {
  return (
    <footer className={`wrapper bg-slate-900`}>
      <div className='flex items-center justify-center container p-6'>
        <p className='text-md md:text-lg text-center mb-0 text-white'>
          {`Expense Tracker App | Copyright © ${new Date(
            Date.now()
          ).getFullYear()} | All Rights Reserved`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
