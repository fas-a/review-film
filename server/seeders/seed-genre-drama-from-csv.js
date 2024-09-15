const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { GenreDrama, Genre } = require('../models'); // Sesuaikan dengan lokasi model Anda

const csvFilePath = path.join(__dirname, 'data/genre_drama.csv');

async function seedGenreDramaFromCSV() {
  const genreDrams = [];
  
  // Fetch all valid genre_ids
  const genres = await Genre.findAll({ attributes: ['id'] });
  const validGenreIds = new Set(genres.map(genre => genre.id));

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      const genre_id = parseInt(row.genre_id, 10);
      if (validGenreIds.has(genre_id)) {
        genreDrams.push({
          drama_id: row.drama_id,
          genre_id: genre_id,
        });
      } else {
        console.warn(`Invalid genre_id ${genre_id} found in CSV`);
      }
    })
    .on('end', async () => {
      try {
        await GenreDrama.bulkCreate(genreDrams, { ignoreDuplicates: true });
        console.log('Genre-Drama associations seeded successfully');
      } catch (error) {
        console.error('Error seeding genre-drama associations:', error);
      }
    });
}

seedGenreDramaFromCSV();
