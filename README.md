# **Hospital Finder**

# 🚀 Overview

The Hospital Finder is a web application that helps users locate nearby hospitals based on user location. It uses Next.js, React-Leaflet, and Overpass API for fetching hospitals and displaying them on an interactive map.

# ✨ Features

+ Fetches and displays nearby hospitals with markers

+ Shows hospital details (name, address, and phone number) on marker click

+ Option to get directions to a hospital with a route drawn on the map

+ Automatically closes popups when clicking elsewhere

+ Fully responsive UI with Tailwind CSS

# 🛠️ Tech Stack

+ **Frontend:** Next.js, React, Tailwind CSS

+ **Map Library:** React-Leaflet, OpenStreetMap (OSM), Overpass API

+ **Auth:** Firebase Authentication

# 🔧 Setup & Installation

**Prerequisites**

+ Node.js (>= 16.x)

+ NPM or Yarn

+ API access to Overpass API (publicly available)

**Installation Steps**
1. Clone the repository

`git clone https://github.com/Aakrisht1/HospitalFinder.git`
`cd HospitalFinder`

2. Install Dependencies


`npm install`
# or
`yarn install`

3. Run the development server


`npm run dev`
# or
`yarn dev`


4. Live Website

[https://hospital-finder-dkbc.vercel.app/](https://hospital-finder-dkbc.vercel.app/)

## 📌 Usage
1. Login with Google Account
2. Click **Find Nearby Hospitals**
3. View hospitals on the map with markers
4. Click a marker to view hospital details
5. Click **Get Directions** to see the route

## ⚠️ Known Issues & Fixes
- If the map is not loading properly, try resizing the window to trigger re-rendering
- Ensure Overpass API is not rate-limited (retry after a few minutes if requests fail)

## 📜 License
This project is **open-source** under the MIT License. Feel free to contribute! 🎉