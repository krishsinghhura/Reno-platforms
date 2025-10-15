'use client';

import Navbar from "../../components/NavBar";
import { MapPin, Phone, Mail, Star } from "lucide-react";
import { useState } from "react";

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  image: string;
  rating?: number; 
  badge?: string; 
}

const sampleSchools: School[] = [
  {
    id: 1,
    name: "La Martiniere College",
    address: "Hazratganj",
    city: "Lucknow",
    state: "Uttar Pradesh",
    image: "https://uniformapp.in/admin_area/school_images/La_Martiniere_College_Lucknow_image1_7.jpeg",
    rating: 4,
  },
  {
    id: 2,
    name: "Jagran Public School",
    address: "Gomti Nagar",
    city: "Lucknow",
    state: "Uttar Pradesh",
    image: "https://uniformapp.in/admin_area/school_images/Jagran_Public_School_Lucknow_image1_13.jpeg",
    rating: 4,
    badge: ""
  },
  {
    id: 3,
    name: "Seth Anandram Jaipuria",
    address: "Gomti Nagar",
    city: "Lucknow",
    state: "Uttar Pradesh",
    image: "https://uniformapp.in/admin_area/school_images/Seth_Anandram_Jaipuria_Lucknow_image1_18.jpeg",
    rating: 3,
    badge: "Review Now!"
  },
  {
    id: 4,
    name: "Lucknow Public School Vinamra Khand",
    address: "Gomti Nagar",
    city: "Lucknow",
    state: "Uttar Pradesh",
    image: "https://uniformapp.in/admin_area/school_images/Lucknow_Public_School_Vinamra_Khand_Lucknow_image1_43.jpeg",
    rating: 4,
    badge: ""
  },
  {
    id: 5,
    name: "Fortune World School",
    address: "Sector-105",
    city: "Noida",
    state: "Uttar Pradesh",
    image: "https://uniformapp.in/admin_area/school_images/Fortune_World_School_Noida_image1_159.jpeg",
    rating: 4,
    badge: ""
  },
  {
    id: 6,
    name: "Sapphire International School Noida",
    address: "Sector 70",
    city: "Noida",
    state: "Uttar Pradesh",
    image: "https://uniformapp.in/admin_area/school_images/Sapphire_International_School_Noida_Noida_image1_193.jpeg",
    rating: 5,
    badge: "Review Now!"
  },
  {
    id: 7,
    name: "The Paras World School",
    address: "Sector 50",
    city: "Gurgaon",
    state: "Haryana",
    image: "https://uniformapp.in/admin_area/school_images/The_Paras_World_School_Gurgaon_image1_316.jpeg",
    rating: 3,
    badge: "Review Now!"
  },
  {
    id: 8,
    name: "Pathways World School Aravali",
    address: "Sohna Road",
    city: "Gurgaon",
    state: "Haryana",
    image: "https://uniformapp.in/admin_area/school_images/Pathways_World_School_Aravali_Gurgaon_image1_1206.jpeg",
    rating: 4,
    badge: ""
  }
];


const ShowSchools = () => {
  const [search, setSearch] = useState("");

  const filteredSchools = sampleSchools.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header & Search */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">School Search</h1>
          <p className="text-muted-foreground mb-4">Find the right school for your child.</p>
          
          <div className="flex justify-center gap-2 mb-4">
            <input
              type="text"
              placeholder="School Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-border rounded-l-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-green-500 text-primary-foreground px-4 py-2 rounded-r-lg hover:opacity-90 transition">Search</button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {["Choose City", "Choose Board", "Choose Type", "Hostel Facility"].map((f) => (
              <button
                key={f}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                {f} ▾
              </button>
            ))}
          </div>
        </div>

        {/* School Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSchools.map((school) => (
            <div
              key={school.id}
              className="group bg-card rounded-xl overflow-hidden border border-border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={school.image}
                  alt={school.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {school.badge && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-semibold">
                    {school.badge}
                  </span>
                )}
                <button className="absolute top-2 right-2 bg-white text-pink-500 w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:bg-pink-50 transition">
                  +
                </button>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < (school.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-primary">{school.city}</span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {school.name}
                </h3>
                <p className="text-muted-foreground text-sm">{school.address}, {school.state}</p>

                <div className="flex flex-col gap-1 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary" /> <span>{school.city}, {school.state}</span>
                  </div>
                </div>

                <button className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-semibold shadow-md hover:shadow-lg">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShowSchools;
