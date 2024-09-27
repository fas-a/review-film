// routes/drama.js
const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const {
  Drama,
  Actor,
  Genre,
  ActorDrama,
  DramaGenre,
  Country,
  Award,
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
router.post(
  "/countries",
  [check("name").not().isEmpty().withMessage("Country name is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name } = req.body;
      const newCountry = await Country.create({ name });
      res.status(201).json(newCountry);
    } catch (error) {
      console.error("Error adding country:", error);
      res.status(500).json({ message: "Failed to add country" });
    }
  }
);

// PUT /api/countries/:id - Edit negara berdasarkan ID
router.put("/countries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const country = await Country.findByPk(id);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    country.name = name;
    await country.save();

    res.json(country);
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).json({ message: "Failed to update country" });
  }
});

// DELETE /api/countries/:id - Hapus negara berdasarkan ID
router.delete("/countries/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const country = await Country.findByPk(id);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    await country.destroy();
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({ message: "Failed to delete country" });
  }
});

// GET /api/awards - Ambil semua award beserta negara terkait
router.get("/awards", async (req, res) => {
  try {
    const awards = await Award.findAll({
      include: [
        {
          model: Country,
          attributes: ["id", "name"], // Negara terkait
        },
      ],
    });
    res.json(awards);
  } catch (error) {
    console.error("Error fetching awards:", error);
    res.status(500).json({ message: "Failed to fetch awards" });
  }
});

module.exports = router;
