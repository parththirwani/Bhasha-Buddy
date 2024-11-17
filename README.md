Bhasha Buddy
Bhasha Buddy is a web application designed to support individuals with speech disabilities, such as stuttering and blocking. Leveraging cutting-edge deep learning models, it identifies speech impediments and recommends personalized exercises to help users improve their speaking abilities. Additionally, the platform provides contact information for local speech therapists and doctors, enabling users to seek professional consultation for further development.

https://github.com/user-attachments/assets/1c055265-4de6-4a84-a039-11da3d6ce31a

Features
Speech Disability Detection: Deep learning models analyze speech patterns and identify specific disabilities.
Personalized Worksheets: Based on the analysis, users receive tailored exercises designed to improve their speech fluency.
Doctor Recommendations: Users can access contact details of nearby professionals for consultations and therapy.
Tech Stack
Next.js – Fast and modern React-based framework for web applications
TypeScript – Type-safe JavaScript for scalable and maintainable code
Tailwind CSS – Utility-first CSS framework for rapid UI development
Neon – Serverless, scalable PostgreSQL database
Clerk – User authentication and management system
Getting Started
To run Bhasha Buddy locally, follow these steps:

Prerequisites
Make sure you have Node.js installed. You can install it from here.

Installation
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/bhasha-buddy.git
Navigate to the project directory:
bash
Copy code
cd bhasha-buddy
Install the dependencies:
bash
Copy code
npm install
# or
yarn install
Running the Application
To start the application, run:

bash
Copy code
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
The app will be available at http://localhost:3000.

Environment Variables
To configure the project, create a .env file in the root directory and add the following environment variables:

bash
Copy code
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_URL_WHISPER=
NEXT_PUBLIC_URL_MODEL=
NEXT_PUBLIC_URL_DIFFUSION=
DATABASE_URL=
Ensure you replace these with the actual values required by the app.

Contributing
We welcome contributions to improve Bhasha Buddy! Feel free to submit pull requests or open issues for any bugs or new features.

License
This project is licensed under the MIT License – see the LICENSE file for details.
