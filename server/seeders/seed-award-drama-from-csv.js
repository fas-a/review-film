const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { AwardDrama } = require('../models'); // Sesuaikan dengan lokasi model Anda

const csvFilePath = path.join(__dirname, 'data/award_drama.csv');

async function seedAwardDramaFromCSV() {
  const awardDrams = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      awardDrams.push({
        award_id: row.award_id,
        drama_id: row.drama_id,
      });
    })
    .on('end', async () => {
      try {
        // Insert data langsung ke database tanpa validasi
        await AwardDrama.bulkCreate(awardDrams);
        console.log('Award-Drama associations seeded successfully');
      } catch (error) {
        console.error('Error seeding award-drama associations:', error);
      }
    });
}

seedAwardDramaFromCSV();
