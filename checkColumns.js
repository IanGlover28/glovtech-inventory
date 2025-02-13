const { sequelize } = require('./models');

async function checkColumns() {
  const [results] = await sequelize.query(
    "SELECT column_name FROM information_schema.columns WHERE table_name = 'Users';"
  );
  console.log(results);
}

checkColumns();
