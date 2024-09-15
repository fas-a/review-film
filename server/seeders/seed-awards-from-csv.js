const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Award } = require('../models'); // Sesuaikan dengan lokasi model Anda

const csvFilePath = path.join(__dirname, 'data/awards.csv');

async function seedAwardsFromCSV() {
  const awards = [];
  
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      awards.push({
        id: row.id,
        name: row.nama,
        year: row.tahun,
        country_id: row.country_id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    })
    .on('end', async () => {
      try {
        await Award.bulkCreate(awards, { updateOnDuplicate: ['name', 'year', 'country_id'] });
        console.log('Awards seeded successfully');
      } catch (error) {
        console.error('Error seeding awards:', error);
      }
    });
}

seedAwardsFromCSV();
