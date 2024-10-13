const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("passport");
require("./config/passport-setup");
const session = require("express-session");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const GoogleStrategy = require("passport-google-oauth20").Strategy; // Tambah paket Google OAuth 2.0

dotenv.config();

// Gunakan variabel dari .env
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET; // JWT_SECRET untuk session

// Konfigurasi express-session untuk mengelola sesi
app.use(
  session({
    secret: JWT_SECRET, // Gunakan JWT_SECRET untuk session secret
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware express
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// Inisialisasi Passport dan sesi
app.use(passport.initialize());
app.use(passport.session());

// Konfigurasi Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Handle profile dari Google
      return done(null, profile); // Anda bisa simpan profile di database jika diperlukan
    }
  )
);

// Serialize user ke sesi
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user dari sesi
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Route autentikasi Google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback setelah login sukses dari Google
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Redirect ke halaman profil setelah login berhasil
    res.redirect("/profile");
  }
);

// Route untuk menampilkan profil pengguna
app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user }); // Tampilkan data user yang sudah login
  } else {
    res.redirect("/"); // Redirect jika belum login
  }
});

// Route logout
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

app.use("/api", require("./routes/drama"));
app.use("/auth", require("./routes/auth"));

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
