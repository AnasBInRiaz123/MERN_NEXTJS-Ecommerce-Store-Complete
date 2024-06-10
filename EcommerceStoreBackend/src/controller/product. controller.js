const { toSlug } = require("../utils/helpers")
const { uploadImageToCloudinary } = require('../utils/fileUpload')
const Product = require("../models/product.model")


const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, quantity } = req.body
        const slug = toSlug(name)
        const file = req.file

        const imageUrl = await uploadImageToCloudinary(file)

        const product = new Product({
            name, price, description, category, quantity, slug, imageUrl
        })
        const resp = await product.save()

        const newProduct = await Product.findById(resp._id).populate('category')
        res.status(201).json(newProduct)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const cid = req.query.cid || null
        const query = {}

        if (cid) {
            query.category = cid
        }

        const products = await Product.find({ ...query }).populate('category').populate('reviews')

        res.json(products)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getProductByID = async (req, res) => {
    try {
        productId = req.params._id
        const product = await Product.findById(productId).populate('category').populate('reviews')
        if (!product) {
            res.status(404).json({ message: "Product Not Found" })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params._id
        const file = req.file
        const imageUrl = null
        if (file) {
            imageUrl = await uploadImageToCloudinary(file)
        }
        if (imageUrl) {
            req.body.imageUrl = imageUrl
        }
        req.body.slug = toSlug(req.body.name)
        const product = Product.findByIdAndUpdate(productId, req.body, {
            new: true
        })
        if (!product) {
            res.status(404).json({ message: "product Not Found" })
        }
        const updateProduct = await product.populate("category")

        res.status(201).json(updateProduct)
    }
    catch (error) {
        res.status(500).json({ message: error.message })

    }
}


const deleteProduct = async (req, res) => {
    try {
        const productId = req.params._id
        const product = await Product.findByIdAndDelete(productId)
        if (!product) {
            res.status(404).json({ message: "product Not Found" })
        }
        res.status(200).json({ message: " Product deleted Successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


module.exports = { createProduct, getAllProducts, getProductByID, updateProduct, deleteProduct }
