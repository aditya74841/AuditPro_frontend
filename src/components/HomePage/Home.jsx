// "use client";

// import Image from "next/image";
// // import { motion } from "motion/react";
// import { motion } from "framer-motion";

// import { useEffect, useState } from "react";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"; // Assuming this is your custom Sheet component
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { showMessage } from "@/app/utils/showMessage";
// import { userLogin, userProfile } from "./store";
// import Link from "next/link";

// export default function HomePage() {
//   const dispatch = useDispatch();

//   const { profile, isLoggedIn } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(
//       // userProfile((error, response) => {
//       //   if (error) {
//       //     showMessage(error.response?.data?.message || error.message, "error");
//       //   }
//       // })
//       userProfile()
//     );
//   }, [dispatch]);

//   return (
//     <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
//       <Navbar />
//       <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
//         <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
//       </div>
//       <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
//         <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
//       </div>
//       <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
//         <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
//       </div>
//       <div className="px-4 py-10 md:py-20">
//         <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
//           {"Launch your website in hours, not days"
//             .split(" ")
//             .map((word, index) => (
//               <motion.span
//                 key={index}
//                 initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
//                 animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
//                 transition={{
//                   duration: 0.3,
//                   delay: index * 0.1,
//                   ease: "easeInOut",
//                 }}
//                 className="mr-2 inline-block"
//               >
//                 {word}
//               </motion.span>
//             ))}
//         </h1>
//         <motion.p
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           transition={{
//             duration: 0.3,
//             delay: 0.8,
//           }}
//           className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
//         >
//           With AI, you can launch your website in hours, not days. Try our best
//           in class, state of the art, cutting edge AI tools to get your website
//           up.
//         </motion.p>
//         <motion.div
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           transition={{
//             duration: 0.3,
//             delay: 1,
//           }}
//           className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
//         >
//           <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
//             Explore Now
//           </button>
//           <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
//             Contact Support
//           </button>
//         </motion.div>
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 10,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             duration: 0.3,
//             delay: 1.2,
//           }}
//           className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
//         >
//           <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
//             {/* <Image
//               src="https://assets.aceternity.com/pro/aceternity-landing.webp"
//               alt="Landing page preview"
//               className="aspect-[16/9] h-auto w-full object-cover"
//               height={1000}
//               width={1000} /> */}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// const Navbar = () => {
//   const dispatch = useDispatch();

//   const [isLoginDrawerOpen, setLoginDrawerOpen] = useState(false);
//   const [isSignUpDrawerOpen, setSignUpDrawerOpen] = useState(false);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const { profile, isLoggedIn } = useSelector((state) => state.auth);

//   console.log("The profile is s", profile);

//   // useEffect(() => {
//   //   // dispatch(
//   //   //   userProfile((error, response) => {
//   //   //     if (error) {
//   //   //       showMessage(error.response?.data?.message || error.message, "error");
//   //   //     }
//   //   //   })
//   //   // );
//   //   dispatch(userProfile());
//   // }, [dispatch]);


//   useEffect(() => {
//     dispatch(
//       userProfile((error, response) => {
//         if (error) {
//           if (error.response?.status === 401) {
//             // Don't show the message if unauthorized
//             return;
//           }
//           showMessage(error.response?.data?.message || error.message, "error");
//         }
//       })
//     );
//   }, [dispatch]);
  

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       showMessage("Please provide both email and password", "error");
//       return;
//     }

//     const userData = {
//       email: email,
//       password: password,
//     };
//     dispatch(
//       userLogin(userData, (err, data) => {
//         if (err) {
//           showMessage(err.response?.data?.message || err.message, "error");
//           // console.error("Login Error:", err);
//         } else {
//           showMessage(data.message);
//           setLoginDrawerOpen(false);
//           dispatch(
//             userProfile((error, response) => {
//               if (error) {
//                 showMessage(error.response.data.message, "error");
//               }
//             })
//           );
//           // console.log("Login Successful:", data);
//         }
//       })
//     );
//   };

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phonePattern = /^\d+$/;

//     if (emailPattern.test(value)) {
//       setEmail(value);
//       setPhone("");
//     } else if (phonePattern.test(value)) {
//       setPhone(value);
//       setEmail("");
//     } else {
//       setEmail(value); // Default to email if it doesn't match phone pattern
//       setPhone("");
//     }
//   };

//   return (
//     <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
//       <div className="flex items-center gap-2">
//         <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
//         <h1 className="text-base font-bold md:text-2xl">Aceternity UI</h1>
//       </div>
//       <div>
//         {/* Login Button with Sheet */}
//         {!isLoggedIn && (
//           <Sheet open={isLoginDrawerOpen} onOpenChange={setLoginDrawerOpen}>
//             <SheetTrigger asChild>
//               <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200 mr-2">
//                 Login
//               </button>
//             </SheetTrigger>
//             <SheetContent className="w-[400px] sm:w-[640px]">
//               <SheetHeader>
//                 <SheetTitle>Login</SheetTitle>
//               </SheetHeader>
//               <div className="p-4">
//                 <Label htmlFor="login-email">Email</Label>
//                 <Input
//                   id="login-email"
//                   className="mt-2"
//                   onChange={handleInputChange}
//                 />
//                 <Label htmlFor="login-password" className="mt-4">
//                   Password
//                 </Label>
//                 <Input
//                   id="login-password"
//                   type="password"
//                   className="mt-2"
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//               <SheetFooter>
//                 <Button type="submit" onClick={handleLogin}>
//                   Login
//                 </Button>
//               </SheetFooter>
//             </SheetContent>
//           </Sheet>
//         )}

//         {!isLoggedIn && (
//           <Sheet open={isSignUpDrawerOpen} onOpenChange={setSignUpDrawerOpen}>
//             <SheetTrigger asChild>
//               <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
//                 SignUp
//               </button>
//             </SheetTrigger>
//             <SheetContent className="w-[400px] sm:w-[640px]">
//               <SheetHeader>
//                 <SheetTitle>Sign Up</SheetTitle>
//               </SheetHeader>
//               <div className="p-4">
//                 <Label htmlFor="signup-email">Email</Label>
//                 <Input id="signup-email" className="mt-2" />
//                 <Label htmlFor="signup-password" className="mt-4">
//                   Password
//                 </Label>
//                 <Input id="signup-password" type="password" className="mt-2" />
//               </div>
//               <SheetFooter>
//                 <SheetClose asChild>
//                   <Button type="submit">Sign Up</Button>
//                 </SheetClose>
//               </SheetFooter>
//             </SheetContent>
//           </Sheet>
//         )}
//         {isLoggedIn && (
//           <Link href="/dashboard">
//             <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200 mr-2">
//               Dashboard
//             </button>
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

//second Part

// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { showMessage } from "@/app/utils/showMessage";
// import { userLogin, userProfile } from "./store";
// import Link from "next/link";

// // Define animation variants for reusability
// const textVariants = {
//   hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
//   }),
// };

// const buttonVariants = {
//   hover: { scale: 1.05, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" },
//   tap: { scale: 0.95 },
// };

// export default function HomePage() {
//   const dispatch = useDispatch();
//   const { profile, isLoggedIn } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(
//       userProfile((error) => {
//         if (error && error.response?.status !== 401) {
//           showMessage(error.response?.data?.message || error.message, "error");
//         }
//       })
//     );
//   }, [dispatch]);

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
//       <Navbar />
//       {/* Hero Section */}
//       <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
//         <motion.h1
//           className="mx-auto max-w-4xl text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl dark:text-white"
//           initial="hidden"
//           animate="visible"
//         >
//           {"Launch your website in hours, not days"
//             .split(" ")
//             .map((word, index) => (
//               <motion.span
//                 key={index}
//                 custom={index}
//                 variants={textVariants}
//                 className="inline-block mr-2"
//               >
//                 {word}
//               </motion.span>
//             ))}
//         </motion.h1>
//         <motion.p
//           variants={textVariants}
//           initial="hidden"
//           animate="visible"
//           custom={10}
//           className="mx-auto mt-6 max-w-xl text-center text-lg text-gray-600 dark:text-gray-300"
//         >
//           With AI, you can launch your website in hours, not days. Try our
//           best-in-class, state-of-the-art AI tools to get your website up.
//         </motion.p>
//         <motion.div
//           className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 1 }}
//         >
//           <motion.button
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             className="w-full sm:w-48 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold shadow-lg transition-all duration-300 dark:from-blue-700 dark:to-purple-700"
//           >
//             Explore Now
//           </motion.button>
//           <motion.button
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             className="w-full sm:w-48 rounded-full border-2 border-gray-300 bg-transparent px-6 py-3 text-gray-900 font-semibold dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
//           >
//             Contact Support
//           </motion.button>
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 1.2 }}
//           className="mt-16 mx-auto max-w-4xl"
//         >
//           <div className="rounded-2xl border border-gray-200 bg-white/50 p-4 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
//             <Image
//               src="/placeholder-website-mockup.jpg" // Replace with actual image
//               alt="Website preview"
//               className="rounded-xl object-cover w-full h-auto"
//               width={1200}
//               height={675}
//             />
//           </div>
//         </motion.div>
//       </div>
//       {/* Decorative Elements */}
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute top-0 left-0 h-1/2 w-1/2 bg-gradient-to-br from-blue-200/20 to-purple-200/20 dark:from-blue-900/20 dark:to-purple-900/20 blur-3xl" />
//       </div>
//     </div>
//   );
// }

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const [isLoginDrawerOpen, setLoginDrawerOpen] = useState(false);
//   const [isSignUpDrawerOpen, setSignUpDrawerOpen] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const { profile, isLoggedIn } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(
//       userProfile((error) => {
//         if (error && error.response?.status !== 401) {
//           showMessage(error.response?.data?.message || error.message, "error");
//         }
//       })
//     );
//   }, [dispatch]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       showMessage("Please provide both email and password", "error");
//       return;
//     }
//     const userData = { email, password };
//     dispatch(
//       userLogin(userData, (err, data) => {
//         if (err) {
//           showMessage(err.response?.data?.message || err.message, "error");
//         } else {
//           showMessage(data.message);
//           setLoginDrawerOpen(false);
//           dispatch(
//             userProfile((error) => {
//               if (error) {
//                 showMessage(error.response?.data?.message, "error");
//               }
//             })
//           );
//         }
//       })
//     );
//   };

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phonePattern = /^\d+$/;

//     if (emailPattern.test(value)) {
//       setEmail(value);
//       setPhone("");
//     } else if (phonePattern.test(value)) {
//       setPhone(value);
//       setEmail("");
//     } else {
//       setEmail(value);
//       setPhone("");
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <motion.div
//           className="flex items-center gap-3"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
//           <h1 className="text-xl font-bold text-gray-900 dark:text-white">
//             Aceternity UI
//           </h1>
//         </motion.div>
//         <motion.div
//           className="flex items-center gap-3"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {!isLoggedIn && (
//             <>
//               <Sheet open={isLoginDrawerOpen} onOpenChange={setLoginDrawerOpen}>
//                 <SheetTrigger asChild>
//                   <motion.button
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                     className="rounded-full bg-blue-600 px-6 py-2 text-white font-semibold shadow-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
//                     aria-label="Open login drawer"
//                   >
//                     Login
//                   </motion.button>
//                 </SheetTrigger>
//                 <SheetContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-l border-gray-200 dark:border-gray-800">
//                   <SheetHeader>
//                     <SheetTitle className="text-2xl font-bold text-gray-900 dark:text-white">
//                       Login
//                     </SheetTitle>
//                   </SheetHeader>
//                   <div className="p-6 space-y-4">
//                     <div>
//                       <Label htmlFor="login-email" className="text-gray-700 dark:text-gray-300">
//                         Email or Phone
//                       </Label>
//                       <Input
//                         id="login-email"
//                         className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                         onChange={handleInputChange}
//                         aria-required="true"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="login-password" className="text-gray-700 dark:text-gray-300">
//                         Password
//                       </Label>
//                       <Input
//                         id="login-password"
//                         type="password"
//                         className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                         onChange={(e) => setPassword(e.target.value)}
//                         aria-required="true"
//                       />
//                     </div>
//                   </div>
//                   <SheetFooter>
//                     <Button
//                       onClick={handleLogin}
//                       className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
//                     >
//                       Login
//                     </Button>
//                   </SheetFooter>
//                 </SheetContent>
//               </Sheet>
//               <Sheet open={isSignUpDrawerOpen} onOpenChange={setSignUpDrawerOpen}>
//                 <SheetTrigger asChild>
//                   <motion.button
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                     className="rounded-full bg-purple-600 px-6 py-2 text-white font-semibold shadow-md hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
//                     aria-label="Open signup drawer"
//                   >
//                     Sign Up
//                   </motion.button>
//                 </SheetTrigger>
//                 <SheetContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-l border-gray-200 dark:border-gray-800">
//                   <SheetHeader>
//                     <SheetTitle className="text-2xl font-bold text-gray-900 dark:text-white">
//                       Sign Up
//                     </SheetTitle>
//                   </SheetHeader>
//                   <div className="p-6 space-y-4">
//                     <div>
//                       <Label htmlFor="signup-email" className="text-gray-700 dark:text-gray-300">
//                         Email
//                       </Label>
//                       <Input
//                         id="signup-email"
//                         className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="signup-password" className="text-gray-700 dark:text-gray-300">
//                         Password
//                       </Label>
//                       <Input
//                         id="signup-password"
//                         type="password"
//                         className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                       />
//                     </div>
//                   </div>
//                   <SheetFooter>
//                     <SheetClose asChild>
//                       <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white">
//                         Sign Up
//                       </Button>
//                     </SheetClose>
//                   </SheetFooter>
//                 </SheetContent>
//               </Sheet>
//             </>
//           )}
//           {isLoggedIn && (
//             <Link href="/dashboard">
//               <motion.button
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//                 className="rounded-full bg-blue-600 px-6 py-2 text-white font-semibold shadow-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
//                 aria-label="Go to dashboard"
//               >
//                 Dashboard
//               </motion.button>
//             </Link>
//           )}
//         </motion.div>
//       </div>
//     </nav>
//   );
// };


"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "@/app/utils/showMessage";
import { userLogin, userProfile } from "./store"; // Added userSignup
import Link from "next/link";
import { Mail, CheckCircle, BarChart, Users } from "lucide-react"; // Added Lucide icons

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.2, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" },
  tap: { scale: 0.95 },
};

export default function HomePage() {
  const dispatch = useDispatch();
  const { profile, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      userProfile((error) => {
        if (error && error.response?.status !== 401) {
          showMessage(error.response?.data?.message || error.message, "error");
        }
      })
    );
  }, [dispatch]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <motion.h1
          className="mx-auto max-w-4xl text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl dark:text-white"
          initial="hidden"
          animate="visible"
        >
          {"Simplify Your Audits with Audit Pro"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={textVariants}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
        </motion.h1>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={10}
          className="mx-auto mt-6 max-w-xl text-center text-lg text-gray-600 dark:text-gray-300"
        >
          Streamline compliance, automate reports, and collaborate seamlessly with
          our all-in-one audit management platform.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full sm:w-48 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white font-semibold shadow-lg transition-all duration-300 dark:from-blue-700 dark:to-indigo-700"
          >
            Get Started
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full sm:w-48 rounded-full border-2 border-gray-300 bg-transparent px-6 py-3 text-gray-900 font-semibold dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            Request Demo
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-16 mx-auto max-w-4xl"
        >
          <div className="rounded-2xl border border-gray-200 bg-white/50 p-4 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
            <Image
              src="/audit-pro-dashboard.png" // Replace with actual audit dashboard image
              alt="Audit Pro dashboard preview"
              className="rounded-xl object-cover w-full h-auto"
              width={1200}
              height={675}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Why Choose Audit Pro?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <CheckCircle className="w-10 h-10 text-blue-600" />,
              title: "Automated Reports",
              description: "Generate detailed audit reports in seconds with AI-driven insights.",
            },
            {
              icon: <BarChart className="w-10 h-10 text-blue-600" />,
              title: "Compliance Tracking",
              description: "Stay compliant with real-time monitoring and alerts.",
            },
            {
              icon: <Users className="w-10 h-10 text-blue-600" />,
              title: "Team Collaboration",
              description: "Work together seamlessly with integrated task management.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-100 dark:bg-gray-900">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote: "Audit Pro transformed our compliance process, saving us hours every week.",
              author: "Jane Doe, CFO",
            },
            {
              quote: "The intuitive interface and powerful features make auditing a breeze.",
              author: "John Smith, Compliance Officer",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <p className="text-gray-600 dark:text-gray-300 italic">
                "{testimonial.quote}"
              </p>
              <p className="text-gray-900 dark:text-white font-semibold mt-4">
                {testimonial.author}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.h2
          className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Ready to Streamline Your Audits?
        </motion.h2>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-lg text-gray-600 dark:text-gray-300 mb-8"
        >
          Join thousands of businesses using Audit Pro to simplify compliance.
        </motion.p>
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button className="rounded-full bg-blue-600 px-8 py-4 text-white font-semibold shadow-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
            Sign Up Now
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2025 Audit Pro. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>

      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 h-1/2 w-1/2 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 dark:from-blue-900/20 dark:to-indigo-900/20 blur-3xl" />
      </div>
    </div>
  );
}

const Navbar = () => {
  const dispatch = useDispatch();
  const [isLoginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [isSignUpDrawerOpen, setSignUpDrawerOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const { profile, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      userProfile((error) => {
        if (error && error.response?.status !== 401) {
          showMessage(error.response?.data?.message || error.message, "error");
        }
      })
    );
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showMessage("Please provide both email and password", "error");
      return;
    }
    const userData = { email, password };
    dispatch(
      userLogin(userData, (err, data) => {
        if (err) {
          showMessage(err.response?.data?.message || err.message, "error");
        } else {
          showMessage(data.message);
          setLoginDrawerOpen(false);
          dispatch(
            userProfile((error) => {
              if (error) {
                showMessage(error.response?.data?.message, "error");
              }
            })
          );
        }
      })
    );
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!signupEmail || !signupPassword) {
      showMessage("Please provide both email and password", "error");
      return;
    }
    const userData = { email: signupEmail, password: signupPassword };
    dispatch(
      // userSignup(userData, (err, data) => {
      //   if (err) {
      //     showMessage(err.response?.data?.message || err.message, "error");
      //   } else {
      //     showMessage("Sign up successful! Please log in.");
      //     setSignUpDrawerOpen(false);
      //   }
      // })
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d+$/;

    if (emailPattern.test(value)) {
      setEmail(value);
      setPhone("");
    } else if (phonePattern.test(value)) {
      setPhone(value);
      setEmail("");
    } else {
      setEmail(value);
      setPhone("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Audit Pro
          </h1>
        </motion.div>
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {!isLoggedIn && (
            <>
              <Sheet open={isLoginDrawerOpen} onOpenChange={setLoginDrawerOpen}>
                <SheetTrigger asChild>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="rounded-full bg-blue-600 px-6 py-2 text-white font-semibold shadow-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                    aria-label="Open login drawer"
                  >
                    Login
                  </motion.button>
                </SheetTrigger>
                <SheetContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-l border-gray-200 dark:border-gray-800">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      Login to Audit Pro
                    </SheetTitle>
                  </SheetHeader>
                  <div className="p-6 space-y-4">
                    <div>
                      <Label htmlFor="login-email" className="text-gray-700 dark:text-gray-300">
                        Email or Phone
                      </Label>
                      <Input
                        id="login-email"
                        className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        onChange={handleInputChange}
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <Label htmlFor="login-password" className="text-gray-700 dark:text-gray-300">
                        Password
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        onChange={(e) => setPassword(e.target.value)}
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <Button
                      onClick={handleLogin}
                      className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                    >
                      Login
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <Sheet open={isSignUpDrawerOpen} onOpenChange={setSignUpDrawerOpen}>
                <SheetTrigger asChild>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="rounded-full bg-indigo-600 px-6 py-2 text-white font-semibold shadow-md hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                    aria-label="Open signup drawer"
                  >
                    Sign Up
                  </motion.button>
                </SheetTrigger>
                <SheetContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-l border-gray-200 dark:border-gray-800">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      Join Audit Pro
                    </SheetTitle>
                  </SheetHeader>
                  <div className="p-6 space-y-4">
                    <div>
                      <Label htmlFor="signup-email" className="text-gray-700 dark:text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="signup-email"
                        className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        onChange={(e) => setSignupEmail(e.target.value)}
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-password" className="text-gray-700 dark:text-gray-300">
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        onChange={(e) => setSignupPassword(e.target.value)}
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <Button
                      onClick={handleSignup}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white"
                    >
                      Sign Up
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </>
          )}
          {isLoggedIn && (
            <Link href="/dashboard">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="rounded-full bg-blue-600 px-6 py-2 text-white font-semibold shadow-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                aria-label="Go to dashboard"
              >
                Dashboard
              </motion.button>
            </Link>
          )}
        </motion.div>
      </div>
    </nav>
  );
};