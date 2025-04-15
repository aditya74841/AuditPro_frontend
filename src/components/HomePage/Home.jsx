// "use client"
// import { useState } from "react";
// import Link from "next/link";

// export default function HomePage() {
//   const [isLoginModalOpen, setLoginModalOpen] = useState(false);
//   const [isSignupModalOpen, setSignupModalOpen] = useState(false);

//   const openLoginModal = () => setLoginModalOpen(true);
//   const closeLoginModal = () => setLoginModalOpen(false);

//   const openSignupModal = () => setSignupModalOpen(true);
//   const closeSignupModal = () => setSignupModalOpen(false);

//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-800">
//       {/* Hero Section */}
//       <section className="text-center py-24 px-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
//         <h1 className="text-4xl md:text-6xl font-bold mb-4">
//           Simplify Audits. Empower Your Teams.
//         </h1>
//         <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
//           AuditPro helps you track store performance, assign dynamic questionnaires, and manage media-rich responses with ease.
//         </p>
//         <Link
//           href="/dashboard"
//           className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition"
//         >
//           Go to Dashboard
//         </Link>

//         {/* Login & Signup Buttons */}
//         <div className="mt-8 space-x-4">
//           <button
//             onClick={openLoginModal}
//             className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
//           >
//             Login
//           </button>
//           <button
//             onClick={openSignupModal}
//             className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700"
//           >
//             Signup
//           </button>
//         </div>
//       </section>

//       {/* Login Modal */}
//       {isLoginModalOpen && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg w-96">
//             <h2 className="text-2xl font-semibold mb-4">Login</h2>
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-2 mb-4 border border-gray-300 rounded"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full p-2 mb-4 border border-gray-300 rounded"
//             />
//             <div className="text-center">
//               <button
//                 onClick={closeLoginModal}
//                 className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
//               >
//                 Login
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Signup Modal */}
//       {isSignupModalOpen && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg w-96">
//             <h2 className="text-2xl font-semibold mb-4">Signup</h2>
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full p-2 mb-4 border border-gray-300 rounded"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-2 mb-4 border border-gray-300 rounded"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full p-2 mb-4 border border-gray-300 rounded"
//             />
//             <div className="text-center">
//               <button
//                 onClick={closeSignupModal}
//                 className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
//               >
//                 Signup
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Features Section */}
//       <section className="py-16 px-6 bg-white">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-8">Key Features</h2>
//           <div className="grid md:grid-cols-3 gap-8 text-left">
//             {[
//               {
//                 title: "Role-based Dashboard",
//                 desc: "Admins, auditors, and staff see what matters most.",
//               },
//               {
//                 title: "Dynamic Audit Forms",
//                 desc: "Customizable questions with media, scoring, and more.",
//               },
//               {
//                 title: "File & Media Uploads",
//                 desc: "Easily attach photos, videos, and documents to responses.",
//               },
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition"
//               >
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
//         <p>© {new Date().getFullYear()} AuditPro. Made by Aditya Ranjan</p>
//         <div className="mt-2 space-x-4">
//           <a href="https://github.com/aditya74841" target="_blank" className="hover:text-blue-600">
//             GitHub
//           </a>
//           <a href="https://iamadityaranjan.com" target="_blank" className="hover:text-blue-600">
//             Portfolio
//           </a>
//           <a href="mailto:aditya74810@gmail.com" className="hover:text-blue-600">
//             Contact
//           </a>
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Assuming this is your custom Sheet component
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { showMessage } from "@/app/utils/showMessage";
import { userLogin, userProfile } from "./store";

export default function HomePage() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Launch your website in hours, not days"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          With AI, you can launch your website in hours, not days. Try our best
          in class, state of the art, cutting edge AI tools to get your website
          up.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Explore Now
          </button>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            {/* <Image
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000} /> */}
          </div>
        </motion.div>
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
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showMessage("Please provide both email and password", "error");
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    dispatch(userLogin(userData))
      .then((response) => {
        showMessage(response.message);
        console.log("Login Successful:", response);
        // You can redirect the user here after a successful login if needed
      })
      .catch((error) => {
        showMessage(error.response.data.message, "error");
        console.error("Login Error:", error);
      });
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
      setEmail(value); // Default to email if it doesn't match phone pattern
      setPhone("");
    }
  };

  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">Aceternity UI</h1>
      </div>
      <div>
        {/* Login Button with Sheet */}
        <Sheet open={isLoginDrawerOpen} onOpenChange={setLoginDrawerOpen}>
          <SheetTrigger asChild>
            <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200 mr-2">
              Login
            </button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[640px]">
            <SheetHeader>
              <SheetTitle>Login</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                className="mt-2"
                onChange={handleInputChange}
              />
              <Label htmlFor="login-password" className="mt-4">
                Password
              </Label>
              <Input
                id="login-password"
                type="password"
                className="mt-2"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handleLogin}>
                  Login
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* SignUp Button with Sheet */}
        <Sheet open={isSignUpDrawerOpen} onOpenChange={setSignUpDrawerOpen}>
          <SheetTrigger asChild>
            <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              SignUp
            </button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[640px]">
            <SheetHeader>
              <SheetTitle>Sign Up</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" className="mt-2" />
              <Label htmlFor="signup-password" className="mt-4">
                Password
              </Label>
              <Input id="signup-password" type="password" className="mt-2" />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Sign Up</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
