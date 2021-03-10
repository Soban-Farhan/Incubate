const { Sequelize, DataTypes } = require('sequelize');
const db = require('./database')

const Plan = db.define('Plan', {
    planID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(20), allowNull: false },
    description: { 
        type: DataTypes.STRING, allowNull: false, 
        get() { return JSON.parse(this.getDataValue('description')) },
        set(val) { 
            this.setDataValue('description', JSON.stringify(val) ) 
        }
    },
    cost: { type: DataTypes.DECIMAL(3, 2), allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { tableName: 'tblPlans', createdAt: false, updatedAt: false, })

const User = db.define('User', {
    userID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    firstName: { type: DataTypes.STRING(50), allowNull: false, },
    lastName: { type: DataTypes.STRING(50), allowNull: false, },
    emailAddress: { type: DataTypes.STRING, allowNull: false, unique: true, },
    password: { type: DataTypes.STRING, allowNull: false, },
    PlanID: { type: DataTypes.INTEGER, references: { model: Plan, key: 'planID' }, allowNull: false, defaultValue: 1 },
}, { tableName: 'tblUsers', createdAt: false, updatedAt: false, })

const Board = db.define('Board', {
    boardID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    userID: { type: DataTypes.INTEGER, references: { model: User, key: 'userID' }, allowNull: false },
    name: { type: DataTypes.STRING(50), allowNull: false, },
    description: { type: DataTypes.STRING, allowNull: true },
    type: { type: DataTypes.STRING, defaultValue: "personal", allowNull: false },
    features: { 
        type: DataTypes.STRING, allowNull: false, 
        get() { 
            return JSON.parse(this.getDataValue('features')) 
        },
        set(val) { 
            this.setDataValue('features', JSON.stringify(val)) 
        } 
    },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { tableName: 'tblBoards', createdAt: false, updatedAt: false, })

User.hasMany(Board, { foreignKey: { name: 'userID' } });
Board.belongsTo(User, { foreignKey: { name: 'userID' }});

const BoardTab = db.define('BoardTab', {
    tabID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    boardID: { type: DataTypes.INTEGER, references: { model: Board, key: 'boardID' }, allowNull: false },
    name: { type: DataTypes.STRING(50), allowNull: false, },
    description: { type: DataTypes.STRING, allowNull: true },
    features: { 
        type: DataTypes.STRING, allowNull: false, 
        get() { 
            return JSON.parse(this.getDataValue('features')) 
        },
        set(val) { 
            this.setDataValue('features', JSON.stringify(val)) 
        } 
    },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { tableName: 'tblBoardTabs', createdAt: false, updatedAt: false, })

const TabUser = db.define('TabUser', {
    tabID: { type: DataTypes.INTEGER, primaryKey: true, references: { model: BoardTab, key: 'tabID' }, allowNull: false },
    userID: { type: DataTypes.INTEGER,  primaryKey: true, references: { model: User, key: 'userID' }, allowNull: false },
    dateJoined: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { tableName: 'tblTabUsers', createdAt: false, updatedAt: false, })

const TabCard = db.define('TabCard', {
    cardID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    tabID: { type: DataTypes.INTEGER, references: { model: BoardTab, key: 'tabID' }, allowNull: false },
    name: { type: DataTypes.STRING(50), allowNull: false, },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { tableName: 'tblTabCards', createdAt: false, updatedAt: false, })

const CardTask = db.define('CardTask', {
    taskID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    cardID: { type: DataTypes.INTEGER, references: { model: TabCard, key: 'cardID' }, allowNull: false },
    name: { type: DataTypes.STRING(50), allowNull: false, },
    description: { type: DataTypes.STRING, allowNull: true },
    additionalDetail: { 
        type: DataTypes.STRING, allowNull: false, 
        get() { 
            return JSON.parse(this.getDataValue('additionalDetail')) 
        },
        set(val) { 
            this.setDataValue('additionalDetail', JSON.stringify(val)) 
        } 
    },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { tableName: 'tblCardTasks', createdAt: false, updatedAt: false, })


const createAll = async () => {
    await db.sync({ force: true })
    await Plan.create({
        name: "FREE", 
        description: { boards: 5, tabs: 4, teamboards: 5 }, 
        cost: 0.00
    })

    await User.create({ 
        firstName: 'Soban',
        lastName: "Farhan",
        emailAddress: 'sobanfarhan@gmail.com', 
        password: '9eb990eef14e2c65311169bbda3d63997c306ee180ec386f6b8286f47520c443'
    });
}

const deleteAll = async () => {
    await db.drop()
}

module.exports = {
    createAll,
    deleteAll,
    User,
    Plan,
    Board,
    BoardTab,
    TabUser,
    TabCard,
    CardTask    
}