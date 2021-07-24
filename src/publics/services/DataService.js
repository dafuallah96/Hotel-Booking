import { Database, Auth } from '../../publics/configs/db'

export const addService = (service_type, service_name, service_price, service_description, _id, fullname, item) => {
    Database.ref('/services').child(_id).child(service_name).set({
        service_name: service_name,
        service_description: service_description,
        service_type: service_type,
        service_price: service_price,
        item1: item,
        _id: _id,
        fullname: fullname
    })
}

export const addTransaction = (email, success, price, service_name, service_type, id, token, remarks) => {
    Database.ref('/transactions').child(id).child(token).set({
        email: email,
        success: success,
        price: price,
        service_name: service_name,
        service_type: service_type,
        token: token,
        remarks: remarks,
        _id: id
    })
}