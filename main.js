let products = [];
function renderProducts(productsToRender) {
    let html = '<table border="1">';
    html += '<tr id="t"><td>Name</td><td>Category</td><td>price</td><td>Quantity</td></tr>';

    for (let i = 0; i < productsToRender.length; i++) {
        let u = productsToRender[i];
        html += '<tr>';
        html += `<td>${u.name}</td>`;
        html += `<td>${u.category}</td>`;
        html += `<td>${u.price}</td>`;
        html += `<td>${u.quantity}</td>`;
        html += '</tr>';
    }

    html += '</table>';
    $('#container').html(html);
}

function init() {
    let settings = {
        url: 'https://old.blacatzacademy.com/api/products',
        type: 'GET',
        success: function (response) {
            products = response;
            renderProducts(products);
        },
    };

    $.ajax(settings);
}

function filter() {
    let category = $('option[name="category"]:checked').val();
    let priceFrom = $('input[name="priceFrom"]').val();
    let priceTo = $('input[name="priceTo"]').val();
    let product = products;

    if (category !== undefined) {
        product = product.filter(prod => prod.category == category);
    }

    if (priceFrom.length > 0) {
        product = product.filter(prod => prod.price >= priceFrom);
    }

    if (priceTo.length > 0) {
        product = product.filter(prod => prod.price <= priceTo);
    }

    renderProducts(product);
}

$(function () {
    init();
});