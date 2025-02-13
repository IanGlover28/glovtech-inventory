module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Invoices", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      invoice_number: { type: Sequelize.STRING, unique: true, allowNull: false },
      file_url: { type: Sequelize.STRING },
      email_sent: { type: Sequelize.BOOLEAN, defaultValue: false },
      sale_id: { type: Sequelize.INTEGER, references: { model: "Sales", key: "id" }, onDelete: "CASCADE" },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Invoices");
  },
};
