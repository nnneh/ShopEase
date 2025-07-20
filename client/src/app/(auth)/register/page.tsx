'use client'
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner"
import { Eye, EyeOff, Mail, Phone, Lock, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[\d\s\-()]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
});

const Register = () => {
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

  const router = useRouter()

  const initialValues = {
    email: '',
    phoneNumber: '',
    password: '',
  };

  const handleSubmit = async(values: typeof initialValues, { setSubmitting }: any) => {
    const {data}= await  axios.post('http://localhost:8080/register', values)
    toast(data)
    // Simulate API call
    setTimeout(() => {

      setSubmitting(false);
    }, 1000);
  };



  // const handleSubmit = async (values: any) => {
  //   setIsLoading(true);
  //   try {
  //     console.log("Sending registration data to backend:", values);
  //     const response = await axios.post('http://localhost:8080/register', values);
  //     alert(response)
  //     if(data?.isLoggedIn) router.push('/')

  //     console.log("Registration successful:", response.data);
  //     toast({
  //       title: "Registration Successful!",
  //       description: "Welcome to ShopEase! Your account has been created.",
  //     });
  //   } catch (error) {
  //     console.error("Registration failed:", error);
  //     toast({
  //       title: "Registration Failed",
  //       description: "There was an error creating your account. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
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
            Join the ultimate shopping experience
          </p>
        </div>

        {/* Registration Card */}
        <Card className="shop-card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center" style={{ color: themeColors.primary }}>
              Create Account
            </CardTitle>
            <CardDescription className="text-center" style={{ color: themeColors.neutral }}>
              Enter your details to get started with ShopEase
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Formik
              initialValues={{
                email: "",
                password: "",
                phoneNumber: "",
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
                        placeholder="Create a strong password"
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

                  {/* Phone Number Field */}
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="font-medium" style={{ color: themeColors.neutral }}>
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: themeColors.neutral }} />
                      <Field
                        as={Input}
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="pl-11 h-12 border-border/50 transition-colors"
                        style={{ borderColor: 'var(--border)', '--tw-focus-ring-color': themeColors.primary }}
                      />
                    </div>
                    <ErrorMessage name="phoneNumber" component="p" className="text-destructive text-sm font-medium" />
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
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  {/* Login Link */}
                  <div className="text-center pt-4">
                    <p style={{ color: themeColors.neutral }}>
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="font-semibold transition-colors"
                        style={{ color: themeColors.primary, '--tw-text-hover-color': themeColors.secondary }}
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>

        {/* Terms and Privacy */}
        <p className="text-center text-sm mt-6" style={{ color: themeColors.neutral }}>
          By creating an account, you agree to our{" "}
          <a href="#" className="hover:underline" style={{ color: themeColors.primary }}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="hover:underline" style={{ color: themeColors.primary }}>
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;