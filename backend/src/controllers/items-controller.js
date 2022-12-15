const { query } = require("express");
const HttpError = require("../models/http-error");
const Item = require("../models/item");

const getItem = async (req, res, next) => {
    const itemId = req.params.itemId;

    let existingItem;    
    try {
        existingItem = await Item.findById(itemId).populate('item_data');
    } catch (error) {
        return next(new HttpError(
            'Fetching operation failed.',
            500
        ));
    }

    if(!existingItem)
        return next(new HttpError(
            'Item not found.',
            404
        ));
    
    res.status(201).json({ item: existingItem });
    
};

/* let {page, search, status, role_id} = req.query;
role_id = role_id ? role_id : null;
status = status ? status : null;
const currentPage = parseInt(page) || 1;
const perPage = recordsPerPage;
const query ={
    email: { $ne: 'xxxxx@gmail.com' }
}
if (status) {
    query.status = status
}
if (role_id) {
    query.role_id = role_id
}
if (search) {
    query.username = {'$regex' : search, '$options' : 'i'}
    delete query.email
    query['$and'] = [
        { email: {'$regex' : search, '$options' : 'i'}},
        { email: { $ne: 'xxxxx@gmail.com' } }
    ]
}
const userData = await User.find(query)
    .sort({_id : -1})
    .populate('role_id')
    .skip((currentPage - 1) * perPage).limit(perPage); */

const searchCategory = async (req, res, next) => {
    console.log('search!');
    const { category, subCategory } = req.params;
    let { orderBy, sort, page, recordsPerPage } = req.query;

    const currentPage = parseInt(page) || 1;

    let sortQuery;
    if(orderBy === 'price' || orderBy === 'date') {
        sortQuery  = { [orderBy]: sort };
    } else {
        return next(new HttpError(
            'Invalid Query.',
            500
        ));
    }

    if(!category)
        return next(new HttpError(
            'Invalid Query.',
            500
        ));

    let query = { category };
    if(subCategory)
        query.subCategory = subCategory;
    
    let items;
    try {
        items = await Item.find(query)
                          .sort(sortQuery)
                          .skip((currentPage - 1) * recordsPerPage)
                          .limit(recordsPerPage);
    } catch (error) {
        return next(new HttpError(
            'Operation failed',
            500
        ));
    }

    //userPlaces.places.map((place) => place.toObject({ getters: true })
    
    res.status(201).json({ results: items.map(item => item.toObject({ getters: true })) });
};

exports.getItem        = getItem;
exports.searchCategory = searchCategory;