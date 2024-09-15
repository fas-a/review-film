// routes/drama.js
const express = require('express');
const router = express.Router();
const { Drama, Actor, Genre, ActorDrama, DramaGenre } = require('../models'); // Sesuaikan dengan model

// GET /api/dramas - Ambil semua drama beserta aktor dan genre terkait
router.get('/dramas', async (req, res) => {
  try {
    const dramas = await Drama.findAll({
      include: [
        {
          model: Genre,
          through: DramaGenre,
          attributes: ['id', 'name'], // Genre terkait
        },
      ],
    });

    res.json(dramas);
  } catch (error) {
    console.error('Error fetching dramas:', error);
    res.status(500).json({ message: 'Failed to fetch dramas' });
  }
});

module.exports = router;
