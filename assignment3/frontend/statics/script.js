document.addEventListener("DOMContentLoaded", async function () {
    const access_token = sessionStorage.getItem("access_token");

    const metricsResponse = await fetch('/metrics', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });

    if (!metricsResponse.ok)
        window.location.href = '/login';

    const metrics = await metricsResponse.json();

    document.getElementById("total-sales-value").innerHTML = '$' + Math.trunc(metrics['Total Sales'])
    document.getElementById("avg-spend-value").innerHTML = '$' + Math.trunc(metrics['Sales per customer'])
    document.getElementById("num-customer-value").innerHTML = metrics['Number of Unique Customers']

    const productslink = await fetch('/daily', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    const products = await productslink.json();

    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
        tableBody.innerHTML += `
        <tr>
        <td>${products[i]['Product ID']}</td>
        <td>${products[i]['Product Name']}</td>
        <td>${products[i]['Sales']}</td>
        <td>${Math.trunc(products[i]['Profit Percent'] * 100)}</td>
        </tr>
        `
    }

});