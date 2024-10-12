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
  User,
  AwardDrama,
  Comment,
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
        {
          model: Award,
          through: AwardDrama,
          attributes: ["id", "name"],
        },
      ],
    });

    res.json(dramas);
  } catch (error) {
    console.error("Error fetching dramas:", error);
    res.status(500).json({ message: "Failed to fetch dramas" });
  }
});

router.get("/drama/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const drama = await Drama.findByPk(id, {
      include: [
        {
          model: Genre,
          through: DramaGenre,
          attributes: ["id", "name"], // Genre terkait
        },
        {
          model: Actor,
          through: ActorDrama,
          attributes: ["id", "name", "photo"], // Aktor terkait
        },
        {
          model: Award,
          through: AwardDrama,
          attributes: ["id", "name"],
        },
        {
          model: Country,
          attributes: ["id", "name"], // Negara ter
        },
        {
          model: Comment,
          where: { status: "Approved" },
          attributes: ["id", "content", "rate" ],
          include: [
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
      ],
    });
    if (!drama) {
      return res.status(404).json({ message: "Drama not found" });
    }
    res.json(drama);
  } catch (error) {
    console.error("Error fetching drama:", error);
    res.status(500).json({ message: "Failed to fetching drama" });
  }
});

router.get("/countries", async (req, res) => {
  const { page, limit } = req.query;

  const pageNumber = parseInt(page, 10) || 1; // Halaman saat ini
  const limitNumber = parseInt(limit, 10) || 10; // Jumlah item per halaman
  const offset = (pageNumber - 1) * limitNumber; // Hitung offset untuk pagination

  try {
    const { count, rows: countries } = await Country.findAndCountAll({
      attributes: ["id", "name"], // Hanya ambil kolom id dan name
      limit: limitNumber,
      offset,
    });

    res.json({
      totalItems: count, // Total item di database
      totalPages: Math.ceil(count / limitNumber), // Total halaman
      currentPage: pageNumber, // Halaman saat ini
      countries, // Data Country
    });
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

// GENRES
// GET /api/genres - Ambil semua genre dengan pagination
router.get("/genres", async (req, res) => {
  const { page, limit } = req.query;

  const pageNumber = parseInt(page, 10) || 1; // Halaman saat ini
  const limitNumber = parseInt(limit, 10) || 10; // Jumlah item per halaman
  const offset = (pageNumber - 1) * limitNumber; // Hitung offset untuk pagination

  try {
    const { count, rows: genres } = await Genre.findAndCountAll({
      attributes: ["id", "name"], // Hanya ambil kolom id dan name
      limit: limitNumber,
      offset,
    });

    res.json({
      totalItems: count, // Total item di database
      totalPages: Math.ceil(count / limitNumber), // Total halaman
      currentPage: pageNumber, // Halaman saat ini
      genres, // Data genre
    });
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ message: "Failed to fetch genres" });
  }
});

// POST /api/genres - Tambah genre baru
router.post(
  "/genres",
  [check("name").not().isEmpty().withMessage("Genre name is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name } = req.body;
      const newGenre = await Genre.create({ name });
      res.status(201).json(newGenre);
    } catch (error) {
      console.error("Error adding genre:", error);
      res.status(500).json({ message: "Failed to add genre" });
    }
  }
);

router.post("/comment", async (req, res) => {
  try {
    const { rating, comment, user, drama } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ error: "Rating and comment are required." });
    }

    // Save the comment to the database (adjust this according to your database setup)
    const newComment = await Comment.create({
      rate: rating,
      content: comment,
      user_id: user,
      drama_id: drama,
      // Add any other fields you might have, like userId, movieId, etc.
    });

    res.status(201).json(newComment); // Return the saved comment
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/genres/:id - Edit genre berdasarkan ID
router.put("/genres/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    genre.name = name;
    await genre.save();

    res.json(genre);
  } catch (error) {
    console.error("Error updating genre:", error);
    res.status(500).json({ message: "Failed to update genre" });
  }
});

// DELETE /api/genres/:id - Hapus genre berdasarkan ID
router.delete("/genres/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    await genre.destroy();
    res.json({ message: "Genre deleted successfully" });
  } catch (error) {
    console.error("Error deleting genre:", error);
    res.status(500).json({ message: "Failed to delete genre" });
  }
});

// AWARD
// GET /api/awards - Ambil semua award beserta negara terkait
router.get("/awards", async (req, res) => {
  try {
    const awards = await Award.findAll({});
    res.json(awards);
  } catch (error) {
    console.error("Error fetching awards:", error);
    res.status(500).json({ message: "Failed to fetch awards" });
  }
});

// POST /api/awards - Tambah award baru
router.post(
  "/awards",
  [
    check("name").not().isEmpty().withMessage("Award name is required"),
    check("year").isInt().withMessage("Year must be a valid integer"),
    check("country_id")
      .isInt()
      .withMessage("Country ID must be a valid integer"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, year, country_id } = req.body;
      const newAward = await Award.create({ name, year, country_id });
      res.status(201).json(newAward);
    } catch (error) {
      console.error("Error adding award:", error);
      res.status(500).json({ message: "Failed to add award" });
    }
  }
);

// PUT /api/awards/:id - Edit award berdasarkan ID
router.put("/awards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year, country_id } = req.body;

    const award = await Award.findByPk(id);
    if (!award) {
      return res.status(404).json({ message: "Award not found" });
    }

    award.name = name;
    award.year = year;
    award.country_id = country_id;
    await award.save();

    res.json(award);
  } catch (error) {
    console.error("Error updating award:", error);
    res.status(500).json({ message: "Failed to update award" });
  }
});

// DELETE /api/awards/:id - Hapus award berdasarkan ID
router.delete("/awards/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const award = await Award.findByPk(id);
    if (!award) {
      return res.status(404).json({ message: "Award not found" });
    }

    await award.destroy();
    res.json({ message: "Award deleted successfully" });
  } catch (error) {
    console.error("Error deleting award:", error);
    res.status(500).json({ message: "Failed to delete award" });
  }
});

// GET /api/users - Ambil semua user
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role"], // Hanya ambil atribut yang diperlukan
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// POST /api/users - Tambah user baru
router.post(
  "/users",
  [
    check("username").not().isEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("role").not().isEmpty().withMessage("Role is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, role } = req.body;
      const newUser = await User.create({ username, email, role });
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ message: "Failed to add user" });
    }
  }
);

// PUT /api/users/:id - Edit user berdasarkan ID
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    user.email = email;
    user.role = role;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
});

// DELETE /api/users/:id - Hapus user berdasarkan ID
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

module.exports = router;
