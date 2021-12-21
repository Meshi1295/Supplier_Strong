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

const getSpecificCustomer = (id) => {
    return db('customerlist')
        .select('*')
        .from('customerlist')
        .where('customer_id', id)
}

const setNewCustomer = (
    { nameStore, fullName, startDate, phoneNumber, address, filename }) => {
    return db('customerlist')
        .insert([{
            customer_name: fullName,
            store_name: nameStore,
            customer_phone: phoneNumber,
            start_work_date: startDate,
            address: address,
            profileimg: filename
        }])
        .returning('*')
}

const deleteCustomer = (customer_id) => {
    return db('customerlist')
        .where({ customer_id: customer_id })
        .del()
        .returning('*')

}

const setNewProduct = (data) => {
    console.log("db", data);
    // return db('productlist')
    // .insert()
    // .returning('*')

}

module.exports = {
    getCustomers,
    setNewCustomer,
    getSpecificCustomer,
    deleteCustomer,
    setNewProduct
}