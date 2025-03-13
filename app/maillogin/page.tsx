'use client';
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState, FormEvent, ChangeEvent } from "react";
import { useFirebase } from "@/contexts/firebase";

// Define interface for form data
interface FormData {
  email: string;
  password: string;
}

export default function MailLoginPage() {
  const firebaseContext = useFirebase();
  const LoginMail = firebaseContext?.LoginMail;

  // State for storing form data
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  });
  
  // State for error handling
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing again
    if (error) setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault(); // Prevent default form submission
    setError(null);
    
    if ((formData?.email) && (formData?.password) && (LoginMail)) {
      setIsLoading(true);
      
      try {
        await LoginMail(formData.email, formData.password);
        // If successful, no error will be set
      } catch (err: any) {
        console.log(err)
        // Handle different Firebase error codes
        const errorCode = err.code;
        let errorMessage = "An unknown error occurred. Please try again.";
        
        switch (errorCode) {
          case 'auth/invalid-email':
            errorMessage = "Invalid email address format.";
            break;
          case 'auth/user-disabled':
            errorMessage = "This account has been disabled.";
            break;
          case 'auth/user-not-found':
            errorMessage = "No account found with this email.";
            break;
          case 'auth/wrong-password':
            errorMessage = "Incorrect password.";
            break;
          case 'auth/too-many-requests':
            errorMessage = "Too many failed login attempts. Please try again later.";
            break;
          case 'auth/network-request-failed':
            errorMessage = "Network error. Please check your connection.";
            break;
          default:
            // Use the error message from Firebase if available
            errorMessage = err.message || errorMessage;
        }
        
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center gap-6 w-full px-6 lg:px-16 pt-28 lg:pt-22 py-8 min-h-[100vh]"
    >
      <div
        className="flex flex-col items-center py-8 p-6 gap-3 w-[60%] bg-white rounded-3xl"
      >
        <span
          className="font-semibold text-3xl"
        >
          Mail Login
        </span>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <Input 
            label="Email" 
            placeholder="Enter your email" 
            type="email" 
            size="lg" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <Input 
            label="Password" 
            placeholder="Enter your password" 
            type="password" 
            size="lg" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          {error && (
            <div className="text-red-500 text-sm mt-1 mb-2">
              {error}
            </div>
          )}
          
          <Button
            size="lg"
            type="submit"
            className="bg-purpleAccent text-white rounded-[12px] text-xl w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}