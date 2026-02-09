let totalAmount = 0;

function addItem(){

let customer = document.getElementById("customer").value;
let item = document.getElementById("item").value;
let price = document.getElementById("price").value;
let qty = document.getElementById("qty").value;

if(customer=="" || item=="" || price=="" || qty==""){
alert("Fill all fields");
return;
}

let itemTotal = price * qty;
totalAmount += itemTotal;

let billArea = document.getElementById("bill-area");

billArea.innerHTML += `
<p>${item} - ₹${price} x ${qty} = ₹${itemTotal}</p>
`;

document.getElementById("total").innerHTML = "Total = ₹" + totalAmount;

}

function downloadPDF(){

const element = document.querySelector(".container");

html2pdf()
.from(element)
.save("bill.pdf");

}
