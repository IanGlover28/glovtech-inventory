module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Sales", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      product_id: { type: Sequelize.INTEGER, references: { model: "Products", key: "id" }, onDelete: "CASCADE" },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      unit_price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      total_amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      user_id: { type: Sequelize.INTEGER, references: { model: "Users", key: "id" }, onDelete: "CASCADE" },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Sales");
  },
};
