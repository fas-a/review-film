const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Actor } = require('../models'); // Sesuaikan dengan lokasi model Anda

const csvFilePath = path.join(__dirname, 'data/actors.csv');

async function seedActorsFromCSV() {
  const actors = [];
  
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      actors.push({
        id: row.id,
        name: row.name,
        birth_date: row.birth_date,
        photo: row.photo,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    })
    .on('end', async () => {
      try {
        await Actor.bulkCreate(actors, { updateOnDuplicate: ['name', 'birth_date', 'photo'] });
        console.log('Actors seeded successfully');
      } catch (error) {
        console.error('Error seeding actors:', error);
      }
    });
}

seedActorsFromCSV();
