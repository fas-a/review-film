const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { ActorDrama } = require('../models'); // Adjust path as needed

const csvFilePath = path.join(__dirname, 'data/actor_drama.csv');

async function seedActorDramaFromCSV() {
  const actorDrams = [];
  
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      actorDrams.push({
        actor_id: row.actor_id,
        drama_id: row.drama_id,
      });
    })
    .on('end', async () => {
      for (const actorDrama of actorDrams) {
        try {
          await ActorDrama.create(actorDrama);
        } catch (error) {
          if (error.name === 'SequelizeUniqueConstraintError') {
            console.log(`Skipping duplicate entry: ${JSON.stringify(actorDrama)}`);
          } else {
            console.error('Error seeding actor-drama associations:', error);
          }
        }
      }
      console.log('Actor-Drama associations seeded successfully');
    });
}

seedActorDramaFromCSV();
