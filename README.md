# 🚗 CampusPark_RU  
*A smart parking app for Raffles University students and staff.*

---

## 🏫 Overview  
**CampusPark_RU** is a smart parking management system developed for **Raffles University** to help students and staff locate available parking spaces in real-time, manage their bookings, and minimize campus traffic congestion.  

This app connects to **Firebase Firestore** for real-time parking lot management and uses **local caching** for offline access and faster data loading.

---

## ✨ Features  

- 🔐 **Login / Signup** with user role (Normal or OKU)  
- 🧭 **Guided introduction page** explaining the app purpose  
- 🏠 **Home Dashboard** displaying available parking zones  
- 🗺️ **Interactive Zone Map** with color-coded parking lots  
  - 🟩 Available  
  - 🟥 Occupied  
  - 🟦 OKU Reserved  
- 🧾 **Booking Form** with auto-filled user details  
- ✅ **Booking Confirmation** with edit/delete options  
- 📅 **Session Management** (Active and History tabs)  
- 🔁 **Firebase CRUD integration**  
- ⚡ **Local caching for offline data**  

---

## 🧩 App Flow  

### 1️⃣ Splash / Logo Page  
Displays the app logo with smooth transition into the login page.  

### 2️⃣ Login / Signup  
- New users register with name, student ID, email, password, and parking type (Normal or OKU).  
- OKU users must provide their OKU ID.  
- Returning users can log in using their credentials.  

### 3️⃣ Guidance Page  
Introduces the app’s purpose and rules for parking usage on campus.  

### 4️⃣ Home Page  
- Displays parking zones (e.g., Zone A, Zone B).  
- Shows available and reserved lots.  
- Allows access to user profile and campus parking rules.  

### 5️⃣ Zone Page (Parking Layout)  
- Visual map of parking lots.  
- Color-coded statuses:  
  🟩 Available | 🟥 Occupied | 🟦 OKU Only  
- If a normal user selects an OKU slot → warning pop-up.  
- Clicking a green lot opens the **Booking Form**.

### 6️⃣ Booking Form Page  
- Auto-filled fields: Name, Student ID, Zone, Lot Number.  
- User inputs: Car plate number, Time In, Time Out.  
- Data saved directly to **Firebase Firestore**.

### 7️⃣ Confirmation Page  
- Displays booking details for review.  
- Options to ✏️ **Edit**, 🗑️ **Delete**, or 🔙 **Return Home**.  

### 8️⃣ Sessions Page  
- **Current Tab**: Active bookings (editable).  
- **History Tab**: Past bookings (view-only or deletable).  

---

## 🔧 Technical Setup  

### 🧱 Prerequisites  
- Node.js ≥ 18  
- Ionic CLI installed (`npm install -g @ionic/cli`)  
- Firebase account  

### ⚙️ Installation  

```bash
# 1. Clone the repository
git clone https://github.com/YourUsername/CampusPark_RU.git

# 2. Navigate into the project folder
cd CampusPark_RU

# 3. Install dependencies
npm install

# 4. Run the app in development
ionic serve
