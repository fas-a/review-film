const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User } = require("../models");
const { Op } = require('sequelize');
const authenticateToken = require('../midleware/authMiddleware');


const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  // Validasi input
  if (!email || !username || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Cek apakah email sudah digunakan
  const existingUser = await User.findOne({where : { email }});
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  // Cek apakah username sudah digunakan
  const existingUsername = await User.findOne({where : { username }});
  if (existingUsername) {
    return res.status(400).json({ message: "Username already in use" });
  }

  try {
    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Simpan pengguna ke database
    await user.save();

    // Berikan respons sukses
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    // Cari user berdasarkan email atau username menggunakan Sequelize
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    // Jika user tidak ditemukan atau password salah
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT token dengan user ID
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      'rahasia',
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Google Auth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  res.redirect(`http://localhost:3000/?token=${token}`);
});

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ access: true, message: 'You have access!', user: req.user });
});


module.exports = router;
