const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: 'eduwork_crud',
    username: 'root',
    password: 'root',
    dialect: 'mysql'
})

async function connectDB(){
    try {
        await sequelize.authenticate()
        console.log('Connection success')
    } catch (error) {
        console.error('Unable to connect database', error)
    }
}

connectDB()
// (async ()=>{
//     try {
//         await sequelize.authenticated()
//         console.log('Connection success')
//     } catch (error) {
//         console.error('Unable to connect database', error)
//     }
// })()

module.exports = sequelize