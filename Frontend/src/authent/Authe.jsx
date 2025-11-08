import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Auth = () => {
      const {
        isLoading, // Loading state, the SDK needs to reach Auth0 on load
        isAuthenticated,
        error,
        loginWithRedirect: login, // Starts the login flow
        logout: auth0Logout, // Starts the logout flow
        user, // User profile
    } = useAuth0();

    // const signup = () =>
    //     login({ authorizationParams: { screen_hint: "signup" } });

    const logout = () =>
        auth0Logout({ logoutParams: { returnTo: window.location.origin } });

    if (isLoading) return "Loading...";

    return isAuthenticated ? (
    <>
      <p className='text-xs text-gray-600'>Logged in as <span className='text-gray-500'>{user.email}</span></p>

      {/* <h1 className='text-center'>User Profile</h1> */}

      <div className='flex flex-col justify-center items-center'>
        <img className='rounded-full size-10' src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        {/* <p>{user.email}</p> */}
        <button className='px-4 py-2 my-3 text-md border-1 border-white bg-gray-800 text-white rounded-xl cursor-pointer hover:bg-gray-700' onClick={logout}>Logout</button>
      </div>

      
    </>
  ) : (
    <>
      {error && <p>Error: {error.message}</p>}

      {/* <button className='px-4 py-2 m-5 cursor-pointer border-1 border-white bg-gray-800 text-white rounded-xl hover:bg-gray-700' onClick={signup}>Signup</button> */}

      <button className='px-5 py-2 m-5 cursor-pointer border-1 border-white bg-gray-800 text-white rounded-xl hover:bg-gray-700' onClick={login}>Login</button>
    </>
  );
}

export default Auth