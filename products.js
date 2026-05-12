let products = [
    {
        id: 1,
        name: "Shalwar Kameez",
        oldPrice: 3999,
        newPrice: 2999,
        img: "images/Kamez.png",
        category: "season"
    },
    {
        id: 2,
        name: "Formal Coat",
        oldPrice: 4999,
        newPrice: 3999,
        img: "images/Coat.png",
        category: "season"
    },
    {
        id: 3,
        name: "Jeans",
        oldPrice: 2999,
        newPrice: 1999,
        img: "images/Jeans.png",
        category: "season"
    },
    {
        id: 7,
        name: "Wais Coat",
        oldPrice: 4999,
        newPrice: 2999,
        img: "images/Waiscoat.png",
        category: "season"
    },
    {
        id: 4,
        name: "Polo Shirt",
        newPrice: 3499,
        img: "images/Polo.png",
        category: "new"
    },
    {
        id: 5,
        name: "Shirt",
        newPrice: 2999,
        img: "images/Shirt.png",
        category: "new"
    },
    {
        id: 6,
        name: "Trouser",
        newPrice: 3999,
        img: "images/Trouser.png",
        category: "new"
    },
    {
        id: 8,
        name: "Shorts",
        newPrice: 1599,
        img: "images/Shorts.png",
        category: "new"
    }
]

let seasonSaleContainer = document.getElementById('season');
let newArrivalContainer = document.getElementById('new-arrival');


let generateHTML = (product) => `
    <div class="product-card">
        <a href="product-detail-page.html?id=${product.id}" style="text-decoration: none; color: inherit;">
            <div class="img-container">
                <img src="${product.img}" alt="${product.name}">
            </div>
            <h3>${product.name}</h3>
        </a>
        <p class="price-row">
            ${product.oldPrice ? `<span class="old-price">Rs. ${product.oldPrice}</span>` : ''}
            <span class="new-price">Rs. ${product.newPrice}</span>
        </p>
    </div>
`;

const seasonProducts = products.filter(p => p.category === 'season');
const newArrivalProducts = products.filter(p => p.category === 'new');

if (seasonSaleContainer) {
    seasonSaleContainer.innerHTML = seasonProducts.map(generateHTML).join('');
}

if (newArrivalContainer) {
    newArrivalContainer.innerHTML = newArrivalProducts.map(generateHTML).join('');
}