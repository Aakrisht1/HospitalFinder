"use client";
import Link from "next/link"
import React, {useEffect, useState} from 'react'
import { UserAuth } from './context/AuthContext'
import Spinner from './components/Spinner';
import { ArrowRight, Search, MapPin, Clock } from "lucide-react"

export default function Home() {

  const { user, googleSignIn } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
          const checkAuthentication = async () => {
              await new Promise((resolve) => setTimeout(resolve, 400));
              setLoading(false);
          }
          checkAuthentication();
      }, [user])

      const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="w-full h-full">
      {loading ? <Spinner /> : (
        <div className="flex flex-col min-h-screen">

        <main className="flex-grow">
          <section className="bg-gradient-to-r from-black to-white text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Find the Right Hospital, Fast</h1>
              <p className="text-xl mb-8">Simplifying your search for quality healthcare</p>
              {user ? (
                <Link
                href="/getLocation"
                className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition-colors"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              ) : (
                <div
                onClick={handleSignIn}
                className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </div>
              )}
            </div>
          </section>
  
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {[
                  { icon: Search, title: "Search", description: "Search nearby hospitals" },
                  { icon: MapPin, title: "Compare", description: "View and compare nearby hospitals" },
                  { icon: Clock, title: "Choose", description: "Select the best option for your care" },
                ].map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <step.icon className="h-12 w-12 text-black mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
  
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Hospital?</h2>
              <p className="text-xl mb-8">Join thousands of people who trust HospitalFinder for their healthcare needs</p>
              {user ? (
                <Link
                href="/getLocation"
                className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
              >
                Start Your Search
              </Link>
              ) : (
                <div
                onClick={handleSignIn}
                className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Start Your Search
              </div>
              )}
            </div>
          </section>
        </main>
  
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">&copy; 2025 HospitalFinder. All rights reserved.</p>
            <div className="mt-4">
              <Link href="#" className="text-sm hover:underline mr-4">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm hover:underline mr-4">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </footer>
      </div>
      )}
    </div>
  )
}

