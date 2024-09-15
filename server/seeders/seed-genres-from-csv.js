const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Genre } = require('../models'); // Sesuaikan dengan lokasi model Anda

const csvFilePath = path.join(__dirname, 'data/genres.csv');

async function seedGenresFromCSV() {
  const genres = [];
  
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      genres.push({
        id: row.id,
        name: row.nama,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    })
    .on('end', async () => {
      try {
        await Genre.bulkCreate(genres, { updateOnDuplicate: ['name'] });
        console.log('Genres seeded successfully');
      } catch (error) {
        console.error('Error seeding genres:', error);
      }
    });
}

seedGenresFromCSV();
