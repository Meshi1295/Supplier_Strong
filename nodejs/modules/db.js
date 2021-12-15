const env = require('dotenv');
env.config()

const db = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.HOST,
        port: process.env.PORT,
        user: 'postgres',
        password: 'root12345',
        database: process.env.DATABASE
    }
});

const getCustomers = () => {
    return db('customerlist')
        .select('*')
        .from('customerlist')
}

const setNewCustomer = (
    { nameStore, fullName, startDate, phoneNumber, address }) => {
    return db('customerlist')
        .insert([{
            customer_name: fullName,
            store_name: nameStore,
            customer_phone: phoneNumber,
            start_work_date: startDate,
            address
        }])
        .returning('*')
}

module.exports = {
    getCustomers,
    setNewCustomer
}