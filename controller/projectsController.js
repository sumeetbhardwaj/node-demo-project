const Product = require("../module/productModel")

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if(name =="" || description == "" || price == ""){
            res.status(201).json({ msg: 'All fields are required!' });
        }
        // product object
        const product = new Product({ name, description, price });

        //save product in mongoDB
        await product.save();

        res.status(201).json({ msg: 'Add product successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

/**
 * @swagger
 * /api/project/get:
 *   get:
 *     description: Get something
 *     responses:
 *       200:
 *         description: Successful response
 */

exports.gatAllProducts = async(req, res) => {
    const allProducts = await Product.find();
    res.status(201).json(allProducts);
}