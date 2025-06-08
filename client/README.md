<h1>🖼️ Imagify – Full-Stack AI Image Generator with Credit-Based System</h1>

  <p><strong>Imagify</strong> is a full-stack MERN application that allows users to generate high-quality AI images using natural language prompts. It features user authentication, a credit system, and Razorpay integration (demo mode).</p>

  <blockquote><strong>🚀 This project demonstrates full-stack skills including auth, API integration, payment flow, and React Context management — great for showcasing to recruiters.</strong></blockquote>

  <h2>🚀 Features</h2>
  <ul>
    <li>🔐 <strong>User Authentication:</strong> Register/login with JWT tokens.</li>
    <li>🧠 <strong>Text-to-Image:</strong> Uses ClipDrop API to generate AI art from text prompts.</li>
    <li>🪙 <strong>Credit System:</strong> Each image generation costs 1 credit. Users can buy more.</li>
    <li>💳 <strong>Razorpay Payments:</strong> Integrated with Razorpay test mode to simulate purchases.</li>
    <li>📊 <strong>MongoDB Logging:</strong> Stores all credit transactions securely.</li>
    <li>🎨 <strong>Tailwind UI:</strong> Fully responsive frontend with animations via Framer Motion.</li>
  </ul>

  <h2>🧰 Tech Stack</h2>
  <h3>Frontend</h3>
  <ul>
    <li>React.js (Vite)</li>
    <li>Tailwind CSS</li>
    <li>Framer Motion</li>
    <li>Axios</li>
    <li>React Context API</li>
  </ul>

  <h3>Backend</h3>
  <ul>
    <li>Node.js + Express.js</li>
    <li>MongoDB + Mongoose</li>
    <li>JWT Authentication</li>
    <li>Razorpay SDK</li>
    <li>ClipDrop API</li>
  </ul>

  <h2>🖼️ Screenshots</h2>

  <h3>🏠 Home Page</h3>
  <img src="screenshots/home.png" alt="Home Page" />

  <h3>🖌️ Image Generation</h3>
  <img src="screenshots/generate.png" alt="Generate Image" />

  <h3>💳 Buy Credits Page</h3>
  <img src="screenshots/buy.png" alt="Buy Credits Page" />

  <h2>📂 Folder Structure</h2>
  <pre><code>
imagify/
├── client/          # React frontend
│   ├── src/
│   ├── .env
│   └── index.html
├── server/          # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── .env
│   └── server.js
└── README.html
  </code></pre>

  <h2>🧑‍💻 Developed By</h2>
  <p><strong>Areeb Tahir</strong><br/>
    <a href="https://github.com/your-username">GitHub</a> |
    <a href="https://linkedin.com/in/your-linkedin">LinkedIn</a>
  </p>

  <h2>📌 License</h2>
  <p>This project is created for educational and demo purposes. Please do not use in production without implementing full security and verified payment flows.</p>