'use client'
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";

// Define validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Define your theme colors directly here
  const themeColors = {
    primary: '#007bff', // Blue from logo
    secondary: '#28a745', // Green from logo
    tertiary: '#fd7e14', // Orange from logo
    neutral: '#4A5568', // Dark gray for text
    backgroundStart: '#E0F2F7', // Light blue background
    backgroundMiddle: '#E8F6F8',
    backgroundEnd: '#F0F8F9',
  };


  const initialValues = {
    email: '',
    password: '',
  };
  const router = useRouter()
  const handleSubmit = async(values: typeof initialValues, { setSubmitting }: any) => {
    const {data}= await  axios.post('http://localhost:8080/login', values)
    if(data?.isLoggedIn) router.back();
    toast(data?.message)
    // Simulate API call
    setTimeout(() => {

      setSubmitting(false);
    }, 1000);
  };




  // const handleSubmit = async (values: any) => {
  //   setIsLoading(true);
  //   // Simulate API call for login
  //   setTimeout(() => {
  //     console.log("Login data:", values);
  //     if (values.email === "test@example.com" && values.password === "password123") {
  //       toast.success("Login Successful!");
  //     } else {
  //       toast.error("Invalid email or password.");
  //     }
  //     setIsLoading(false);
  //   }, 2000);
  // };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(to bottom right, ${themeColors.backgroundStart}, ${themeColors.backgroundMiddle}, ${themeColors.backgroundEnd})`
      }}
    >
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center justify-center gap-3 mb-4">
            {/* Removed the inline style for background from this div */}
            <div className="relative p-3 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
              <Image
                className="object-contain"
                src="/ShopEase_Logo.png"
                alt="ShopEase Logo"
                width={120}
                height={120}
                priority
              />
            </div>
            <h1
              className="text-3xl font-bold bg-clip-text text-transparent mt-4"
              style={{
                backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
              }}
            >
              ShopEase
            </h1>
          </div>
          <p className="text-lg" style={{ color: themeColors.neutral }}>
            Welcome back to your account
          </p>
        </div>

        {/* Login Card */}
        <Card className="shop-card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center" style={{ color: themeColors.primary }}>
              Sign In
            </CardTitle>
            <CardDescription className="text-center" style={{ color: themeColors.neutral }}>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium" style={{ color: themeColors.neutral }}>
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: themeColors.neutral }} />
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-11 h-12 border-border/50 transition-colors"
                        style={{ borderColor: 'var(--border)', '--tw-focus-ring-color': themeColors.primary }}
                      />
                    </div>
                    <ErrorMessage name="email" component="p" className="text-destructive text-sm font-medium" />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-medium" style={{ color: themeColors.neutral }}>
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: themeColors.neutral }} />
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-11 pr-11 h-12 border-border/50 transition-colors"
                        style={{ borderColor: 'var(--border)', '--tw-focus-ring-color': themeColors.primary }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors"
                        style={{ color: themeColors.neutral, '--tw-text-hover-color': themeColors.primary }}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="p" className="text-destructive text-sm font-medium" />
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium hover:underline"
                      style={{ color: themeColors.primary }}
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="w-full h-12 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                    style={{
                      background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
                    }}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Logging In...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  {/* Register Link */}
                  <div className="text-center pt-4">
                    <p style={{ color: themeColors.neutral }}>
                      Don't have an account?{" "}
                      <Link
                        href="/register"
                        className="font-semibold transition-colors"
                        style={{ color: themeColors.primary, '--tw-text-hover-color': themeColors.secondary }}
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;