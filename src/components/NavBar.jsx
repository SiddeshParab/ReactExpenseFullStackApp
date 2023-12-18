import { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { navigation } from '../constents/index';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isProfileUpdatePage = pathname === '/profile';

  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/login');
  };

  return (
    <div className='container inset-x-0 top-0 z-50'>
      <nav
        className='flex items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1 '>
          <Link
            to='/'
            className='-m-1.5 p-2 relative ring-2 ring-slate-900/80 hover:ring-blue-500 rounded-md py-[2px]'
          >
            <h1 className='font-bold uppercase text-md md:text-xl'>
              Expense Tracker.
            </h1>
          </Link>
        </div>

        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>

        <div className='hidden lg:flex lg:gap-x-12'>
          {navigation.map((item) => {
            if (item.protectedRoute)
              return (
                authCtx.isLoggedIn && (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className='text-md uppercase font-bold leading-6 text-gray-900'
                  >
                    {item.name}
                  </NavLink>
                )
              );

            return (
              <NavLink
                key={item.name}
                to={item.href}
                className='text-md uppercase font-bold leading-6 text-gray-900'
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>

        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          {!authCtx.isLoggedIn ? (
            <NavLink
              to='/login'
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              Log in <span aria-hidden='true'>&rarr;</span>
            </NavLink>
          ) : !authCtx.isProfileCompleted ? (
            <div className='px-4 py-1 rounded-xl italic bg-[#E8DBDB] w-fit'>
              {isProfileUpdatePage ? (
                <p className='mb-0 inline me-1'>
                  Your Profile is{' '}
                  <span className='inline-block font-bold'>64%</span> complete.
                  A complete profile has <br /> higher chance of landing a job.
                </p>
              ) : (
                <p className='mb-0 inline me-1'>Your Profile is Incomplete</p>
              )}
              <Link
                to={'/profile'}
                className='text-blue-600 font-bold transition-all'
              >
                Complete now
              </Link>
            </div>
          ) : (
            <button
              className='ring-1 ring-black hover:ring-red-500 hover:bg-red-500 hover:text-white transition-all px-3 py-1 rounded-sm'
              type='button'
              onClick={logoutHandler}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link
              to='/'
              className='-m-1.5 p-2 relative ring-2 ring-slate-900/80 hover:ring-blue-500 rounded-md py-[2px]'
            >
              <h1 className='font-bold uppercase text-md md:text-xl'>
                Expense Tracker.
              </h1>
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>

          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => {
                  if (item.protectedRoute)
                    return (
                      authCtx.isLoggedIn && (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className='-mx-3 block rounded-lg px-3 py-2 text-base uppercase font-bold leading-7 text-gray-900 hover:bg-gray-50'
                        >
                          {item.name}
                        </NavLink>
                      )
                    );

                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base uppercase font-bold leading-7 text-gray-900 hover:bg-gray-50'
                    >
                      {item.name}
                    </NavLink>
                  );
                })}
              </div>
              <div className='py-6'>
                {!authCtx.isLoggedIn ? (
                  <NavLink
                    to='/login'
                    onClick={() => setMobileMenuOpen(false)}
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                  >
                    Log in <span aria-hidden='true'>&rarr;</span>
                  </NavLink>
                ) : !authCtx.isProfileCompleted ? (
                  <div className='px-4 py-1 rounded-xl italic bg-[#E8DBDB] w-fit'>
                    {isProfileUpdatePage ? (
                      <p className='mb-0 inline me-1'>
                        Your Profile is{' '}
                        <span className='inline-block font-bold'>64%</span>{' '}
                        complete. A complete profile has <br /> higher chance of
                        landing a job.
                      </p>
                    ) : (
                      <p className='mb-0 inline me-1'>
                        Your Profile is Incomplete
                      </p>
                    )}
                    <Link
                      to={'/profile'}
                      className='text-blue-600 font-bold transition-all'
                    >
                      Complete now
                    </Link>
                  </div>
                ) : (
                  <button
                    className='ring-1 ring-black hover:ring-red-500 hover:bg-red-500 hover:text-white transition-all px-3 py-1 rounded-sm'
                    type='button'
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default NavBar;
