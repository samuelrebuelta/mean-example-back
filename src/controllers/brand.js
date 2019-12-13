const Brand = require('../models/brand');

// GET BRANDS METHOD
exports.fetchBrands = (request, response, next) => {
    Brand.find()
        .then(data => { response.status(200).json({ message: 'Data fetched succesfully', data }); })
        .catch(error => response.status(400).json({ message: 'Error', error }));
}

// DELETE BRAND METHOD
exports.deleteBrand = (request, response, next) => {
    Brand.deleteOne(request.id)
        .then((result) => { response.status(200).json({ message: 'Brand deleted succesfully', result }); })
        .catch(error => response.status(400).json({ message: 'Error', error }));
}

// POST BRAND METHOD
exports.postBrand = (request, response, next) => {
    // Check if exist
    Brand.exists({ brandName: request.body.brandName })
        .then((alreadyExists) => {
            if (alreadyExists && (request.body.modelDescription && request.body.modelDescription !== '')) {
                Brand.find({ brandName: request.body.brandName }).then(elems => {
                    const currentElement = elems[0];
                    const modelAlreadyExists = currentElement.models.some(el => el.modelDescription === request.body.modelDescription);
                    if (modelAlreadyExists) {
                        response.status(200).json({ message: 'Brand and model already exist' });
                    } else {
                        Brand.findOneAndUpdate({ brandName: request.body.brandName }, { $push: { models: { modelDescription: request.body.modelDescription } } })
                            .then(result => {
                                response.status(201).json({ message: `Model added to ${request.body.brandName} succesfully`, result });
                            })
                            .catch(error => response.status(400).json({ message: 'Error', error }));
                    }
                })

            } else if (!alreadyExists) {
                const brand = new Brand({
                    id: request.body._id,
                    brandName: request.body.brandName,
                    models: request.body.modelDescription && request.body.modelDescription !== '' ?
                        [{ modelDescription: request.body.modelDescription }] : [],
                });
                brand.save()
                    .then((result) => { response.status(201).json({ message: 'Brand added succesfully', result }); })
                    .catch(error => response.status(400).json({ message: 'Error', error }));
            } else {
                response.status(200).json({ message: 'You cannot add an empty model name' });
            }
        })
        .catch(error => response.status(400).json({ message: 'Error', error }));
}