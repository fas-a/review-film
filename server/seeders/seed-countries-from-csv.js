const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Country } = require('../models'); // Sesuaikan dengan lokasi model Anda

const csvFilePath = path.join(__dirname, 'data/countries.csv');

async function seedCountriesFromCSV() {
  const countries = [];
  
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      countries.push({
        id: row.id,
        name: row.name,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    })
    .on('end', async () => {
      try {
        await Country.bulkCreate(countries, { updateOnDuplicate: ['name'] });
        console.log('Countries seeded successfully');
      } catch (error) {
        console.error('Error seeding countries:', error);
      }
    });
}

seedCountriesFromCSV();
