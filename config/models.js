const { Sequelize, DataTypes } = require('sequelize');
const db = require('./database')

const User = db.define('User', {
        userID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
        firstName: { type: DataTypes.STRING(50), allowNull: false, },
        lastName: { type: DataTypes.STRING(50), allowNull: false, },
        emailAddress: { type: DataTypes.STRING, allowNull: false, unique: true, },
        password: { type: DataTypes.STRING, allowNull: false, },
        // Plan: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, },
    }, { tableName: 'tblUsers', createdAt: false, updatedAt: false, })

const Plan = db.define('Plan', {
        planID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(20), allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        cost: { type: DataTypes.DECIMAL(3, 2), allowNull: false },
        isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    }, { tableName: 'tblPlans', createdAt: false, updatedAt: false, })

const createAll = async () => {
    await db.sync({ force: true })
    // await User.hasOne(Plan, {
    //     foreignKey: 'Plan'
    // });
    // await Plan.belongsTo(User);
}

const deleteAll = async () => {
    await db.drop()
}

module.exports = {
    createAll,
    deleteAll,
    User,
    Plan
}