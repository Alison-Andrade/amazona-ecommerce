import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Admin',
            email: 'admin@amazona.com',
            password: bcrypt.hashSync('1234', 8),
            isSeller: false,
            isAdmin: true,
            seller: {
                name: '',
                logo: '',
                description: ''
            }
        },
        {
            name: 'User',
            email: 'user@amazona.com',
            password: bcrypt.hashSync('1234', 8),
            isSeller: false,
            isAdmin: false,
            seller: {
                name: '',
                logo: '',
                description: ''
            }
        }
    ],
    products: [
        {
            name: 'Nike Slim Shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quaity product',
            countInStock: 10
        },
        {
            name: 'Nike Fit Shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 100,
            brand: 'Nike',
            rating: 4.0,
            numReviews: 10,
            description: 'high quaity product',
            countInStock: 20
        },
        {
            name: 'Lacoste Free Shirt',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 220,
            brand: 'Lacoste',
            rating: 4.8,
            numReviews: 17,
            description: 'high quaity product',
            countInStock: 0
        },
        {
            name: 'Nike Slim Pant',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 78,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'high quaity product',
            countInStock: 15
        },
        {
            name: 'Puma Slim Pant',
            category: 'Pants',
            image: '/images/p5.jpg',
            price: 65,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description: 'high quaity product',
            countInStock: 5
        },
        {
            name: 'Adidas Fit Pant',
            category: 'Pants',
            image: '/images/p6.jpg',
            price: 139,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 15,
            description: 'high quaity product',
            countInStock: 12
        },
    ]
}

export default data