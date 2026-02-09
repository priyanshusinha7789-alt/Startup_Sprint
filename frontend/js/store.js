const products=[
{name:"Maggi",price:14},
{name:"Coke",price:40},
{name:"Chips",price:10},
{name:"Soap",price:30},
{name:"Rice",price:60}
];

let box=document.getElementById("productList");

products.forEach(p=>{
box.innerHTML+=`
<div class="card">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button onclick="addToCart('${p.name}',${p.price})">Add</button>
</div>
`;
});

function addToCart(name,price){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push({name,price,qty:1});
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart");
}
