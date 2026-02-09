let cart=JSON.parse(localStorage.getItem("cart"))||[];
let box=document.getElementById("cartBox");
let totalBox=document.getElementById("total");

function render(){
box.innerHTML="";
let total=0;

cart.forEach((i,index)=>{
total+=i.price*i.qty;
box.innerHTML+=`
<div class="cart-item">
${i.name} x ${i.qty}
<button onclick="removeItem(${index})">X</button>
</div>
`;
});

totalBox.innerText="Total ₹"+total;
}

function removeItem(i){
cart.splice(i,1);
localStorage.setItem("cart",JSON.stringify(cart));
render();
}

function checkout(){
window.location.href="billing.html";
}

render();
