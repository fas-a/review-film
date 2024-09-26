// routes/drama.js
const express = require("express");
const router = express.Router();
const {
  Drama,
  Actor,
  Genre,
  ActorDrama,
  DramaGenre,
  Country,
} = require("../models"); // Sesuaikan dengan model

// GET /api/dramas - Ambil semua drama beserta aktor dan genre terkait
router.get("/dramas", async (req, res) => {
  try {
    const dramas = await Drama.findAll({
      include: [
        {
          model: Genre,
          through: DramaGenre,
          attributes: ["id", "name"], // Genre terkait
        },
      ],
    });

    res.json(dramas);
  } catch (error) {
    console.error("Error fetching dramas:", error);
    res.status(500).json({ message: "Failed to fetch dramas" });
  }
});

router.get("/countries", async (req, res) => {
  try {
    const countries = await Country.findAll({
      attributes: ["id", "name"], // Sesuaikan atribut jika ada kolom lain
    });
    res.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ message: "Failed to fetch countries" });
  }
});

// POST /api/countries - Tambah negara baru
router.post("/countries", async (req, res) => {
  try {
    const { name } = req.body;
    const newCountry = await Country.create({ name });
    res.status(201).json(newCountry);
  } catch (error) {
    console.error("Error adding country:", error);
    res.status(500).json({ message: "Failed to add country" });
  }
});

module.exports = router;
