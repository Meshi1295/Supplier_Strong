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

// customer
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
        .where({ customer_id })
        .del()
        .returning('*')

}

const updateCustomer = (data) => {
    console.log('dbbbbbbb', data);
    if (data.image) {
        return db('customerlist')
            .update({
                customer_name: data.fullName,
                store_name: data.nameStore,
                customer_phone: data.phoneNumber,
                start_work_date: data.startDate,
                address: data.address,
                profileimg: data.image
            })
            .where({ customer_id: data.id })
            .returning('*')
    } else {
        return db('customerlist')
            .update({
                customer_name: data.fullName,
                store_name: data.nameStore,
                customer_phone: data.phoneNumber,
                start_work_date: data.startDate,
                address: data.address
            })
            .where({ customer_id: data.id })
            .returning('*')
    }


}

// product
const getProducts = () => {
    return db('productlist')
        .select('*')
        .returning('*')

}

const setNewProduct = (data) => {
    return db('productlist')
        .insert(data)
        .returning('*')
}

const deleteProduct = (id) => {
    return db('productlist')
        .where({ id })
        .del()
        .returning('*')
}

module.exports = {
    // customer
    getCustomers,
    setNewCustomer,
    getSpecificCustomer,
    deleteCustomer,
    updateCustomer,
    // product
    setNewProduct,
    getProducts,
    deleteProduct
}