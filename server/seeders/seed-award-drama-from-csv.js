const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { AwardDrama, Award, Drama } = require('../models'); // Sesuaikan dengan lokasi model Anda

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
        // Ambil semua id yang valid dari tabel `awards` dan `dramas`
        const validAwards = await Award.findAll({ attributes: ['id'] });
        const validDramas = await Drama.findAll({ attributes: ['id'] });

        const validAwardIds = validAwards.map(award => award.id);
        const validDramaIds = validDramas.map(drama => drama.id);

        const filteredAwardDrams = awardDrams.filter(awardDrama =>
          validAwardIds.includes(awardDrama.award_id) &&
          validDramaIds.includes(awardDrama.drama_id)
        );

        // Insert data yang sudah divalidasi
        await AwardDrama.bulkCreate(filteredAwardDrams);
        console.log('Award-Drama associations seeded successfully');
      } catch (error) {
        console.error('Error seeding award-drama associations:', error);
      }
    });
}

seedAwardDramaFromCSV();
