// src/contexts/authContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase"; // Import auth here
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);  // Track error state

  // Set up listener for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  // Define the login function
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      // Handle specific error cases
      if (err.code === 'auth/user-not-found') {
        setError('No account found with that email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid credentials or user doesn\'t exist. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
      throw new Error(err.message);  // Rethrow for the login page to handle
    }
  };

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      // Message handled in RegisterPage
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null); // Clear user state
    } catch (err) {
      console.error("Error signing out:", err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}