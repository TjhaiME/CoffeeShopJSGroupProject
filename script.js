
//date and time
// JavaScript code to display date and time function 
function updateDateTime() {
    var currentDate = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    var formattedDate = currentDate.toLocaleDateString('en-US', options);
    document.getElementById('datetime').textContent = formattedDate; 
} // Call the function when the page is loaded window.onload = function () { updateDateTime(); }
updateDateTime()
setInterval(updateDateTime, 1000) //have to pass to setInterval without the brackets

//fetch doesnt work with the 2nd url
//fetch('https://jsonplaceholder.typicode.com/posts/1')
let EliasURL = 'https://github.com/OnlineProjectsGit/API/blob/main/WDEndpoint.json'
let quickPreFIX = "https://cors-anywhere.herokuapp.com/"//quick fix for the bug that happens to be a prefix
//THIS IS BAD
//Lucas Moy's response to this question "https://stackoverflow.com/questions/29612800/load-json-from-github-file"
//This is not a good solution because you have to request temporary access
//then you have to refresh
//then it works but I think only for local server, which is bad because the last step is to put on github live pages
fetch(quickPreFIX+EliasURL, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
  .then((response) => {return response.json()})
  .then((json) => console.log(JSON.stringify(json)));

let shopObjects = {
    "Bagel" : {
        "price" : 12, //cost of shop object
        "amountPerPurchase" : 1, //amount we get when we order (e.g. 3 doughnuts)
        "imgLink" : "./images/bagels.webp", //link to image we want to use
        "altText" : "image of bagel for shop" //text for screen readers
    },
    "Croissant" : {
        "price" : 690000,
        "amountPerPurchase" : 1,
        "imgLink" : "./images/Croissant.webp",
        "altText" : "image of croissant for shop"
    },
    "Coffee" : {
        "price" : 5,
        "amountPerPurchase" : 1,
        "imgLink" : "./images/coffee.webp",
        "altText" : "image of coffee for shop"
    },
    "Iced Latte" : {
        "price" : 7,
        "amountPerPurchase" : 1,
        "imgLink" : "./images/latte.jpeg",
        "altText" : "image of iced latte for shop"
    },    
    "Doughnuts" : {
        "price" : 12,
        "amountPerPurchase" : 3,
        "imgLink" : "./images/Dougnuts-AB.jpg",
        "altText" : "image of doughnuts for shop"
    },
    "Muffin" : {
        "price" : 5,
        "amountPerPurchase" : 1,
        "imgLink" : "./images/muffins.webp",
        "altText" : "image of muffins for shop"
    }
}
//each object in the shop should have these things
let shopObjectsDefault = {
    "price" : 0, //cost of shop object
    "amountPerPurchase" : 1, //amount we get when we order (e.g. 3 doughnuts)
    "imgLink" : "noLinkGiven", //link to image we want to use
    "altText" : "noAltTestGiven" //text for screen readers
}//NOTE we do not use this shopObjectsDefault it's so we have something to copy paste the shop data into

let cartObjects = {}
//Key_of_shop_object : amount_of_them
//}
//When we click a button it should add/remove values from this object

//we need to handle "end cases"
//if it is NOT in cart object already then add it
function add_endcase(shopObjectKey){
    if (shopObjectKey in cartObjects){
        cartObjects[shopObjectKey] += 1 //add 1 to the value
    }else{
        //it is not in the object and we have to add it
        cartObjects[shopObjectKey] = 1
    }
}
function minus_endcase(shopObjectKey){
    if (shopObjectKey in cartObjects){
        if(cartObjects[shopObjectKey] == 1){
            //remove from object entirely
            //delete cartObjects[shopObjectKey]
            //only do with remove
        }else{
            cartObjects[shopObjectKey] -= 1 //subtract 1 from the value
        }
        
    }else{
        //it is not in the object and clicking remove should do nothing
        console.log("there is nothing to remove "+shopObjectKey+" is not in the cart")
    }
}

function calculate_price(){
    let totalPrice = 0
    for (shopObjectKey of Object.keys(cartObjects)){
        const amountWeAreBuying = cartObjects[shopObjectKey]
        let totalPriceForThisItem = amountWeAreBuying*shopObjects[shopObjectKey].price
        totalPrice += totalPriceForThisItem
    }
    return totalPrice
}


///dynamically create shop using DOM manipulation
function create_shop_HTML(){
    for (shopObjectKey of Object.keys(shopObjects)){
        //Render a shop item to the shop section of the HTML
    }
}
///dynamically create cart using DOM manipulation
function create_cart_HTML(){
    for (shopObjectKey of Object.keys(cartObjects)){

    }
}












function generate_shop_div(){
    let bigDiv = document.getElementById("bigShopDiv");
    let oldElmnt = document.getElementById("shop");
    //remove old shop (we dont want it to generate again), might not be needed here but good practice to know
    if(oldElmnt != null){
      oldElmnt.remove();
    }
    let shopDiv = document.createElement("div");
    shopDiv.id = "shop";
    //bigDiv.appendChild(shopDiv) //do later

    //for each element we need an entry:
    //for (shopObjectKey of Object.keys(shopObjects)){
    for (let index = 0; index < Object.keys(shopObjects).length; index++){
        shopObjectKey = Object.keys(shopObjects)[index]

        //Render a shop item to the shop section of the HTML
        //make outer div
        let shopElmnt = document.createElement("div");
        shopElmnt.className = "shopItem"
        shopElmnt.id = "shopItem"+index
        //shopDiv.appendChild(shopElmnt)//do later
        //make img div
        let imgDiv = document.createElement("div");
        imgDiv.className = "shopItem__img"
        //make <img>
        let imgElmnt = document.createElement("img");
        imgElmnt.className = "productImg"
        imgElmnt.src = shopObjects[shopObjectKey].imgLink
        imgElmnt.alt = shopObjects[shopObjectKey].altText
        //add to img div
        imgDiv.appendChild(imgElmnt)
        //add completed imgDiv to shopElment
        shopElmnt.appendChild(imgDiv)

        //now we also need to make the shop content section
        let contentDiv = document.createElement("div");
        contentDiv.className = "shopItem__content"
        
        let nameElmnt = document.createElement("h3")
        nameElmnt.innerText = shopObjectKey //the key is also the name of the item
        contentDiv.appendChild(nameElmnt)
        
        let priceElmnt = document.createElement("p")
        priceElmnt.innerText = "$"+shopObjects[shopObjectKey].price //get price from shopObjects
        contentDiv.appendChild(priceElmnt)
        //add completed contentDiv to shopElment
        shopElmnt.appendChild(contentDiv)
        
        //we also need to create buttons
        let buttonDiv = document.createElement("div");
        buttonDiv.className = "shopItem__button"
        buttonDiv.setAttribute("onclick", "add_button('"+shopObjectKey+"')");
        let buttonElmnt = document.createElement("button")
        buttonElmnt.className = "cartBtn"
        buttonElmnt.type = "button"
        //WHAT IS THIS <i> thingamagig?
        let iThingo = document.createElement("i")
        iThingo.className = "fa-solid fa-cart-shopping"
        buttonElmnt.appendChild(iThingo)
        //Need to understand what this above does
        buttonElmnt.innerText = "Add To Cart"
        buttonDiv.appendChild(buttonElmnt)
        //add completed buttonDiv to shopElment
        shopElmnt.appendChild(buttonDiv)


        //then add it all as a complete object (I do this here because theoretically I can imagine there being a programming language that would want it to be complete before adding it)
        shopDiv.appendChild(shopElmnt)
    }
    //append all shop elements to the appropriate part of the page
    bigDiv.appendChild(shopDiv)
  
}

function generate_cart_div(skipSave = false){
    //save cart when we refresh it
    // console.log("cartObjects before save = ")
    // console.log(cartObjects)
    // console.log("cartObjects stringified = ")
    // console.log(JSON.stringify(cartObjects))
    if(!skipSave){ //skipSave == false
        //Use a default variable to avoid calling this for the BAD BUG FIX that could be avoided by just adding HTML (which if done would make the default variable redundant)
        localStorage.setItem("myCart", JSON.stringify(cartObjects));
    }


    //we want to add to the cartItems id div
    let outerCartDiv = document.getElementById("cart");
    let oldElmnt = document.getElementById("cartItems");
    //remove old cart (we dont want it to generate again), might not be needed here but good practice to know
    if(oldElmnt != null){
      oldElmnt.remove();
    }
    let oldCheckout = document.getElementById("checkout")
    if(oldCheckout != null){
        oldCheckout.remove();
    }
    let allCartItemsDiv = document.createElement("div");
    allCartItemsDiv.id = "cartItems"
    allCartItemsDiv.className = "cartitems"//you can tell there were multiple people here
    totalItems = 0
    totalCost = 0
    for (let shopObjectKey of Object.keys(cartObjects)){
        totalItems += cartObjects[shopObjectKey] //count for later in checkout
        //make cartitem div
        let cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cartitem"
        //make cart_image div
        let imgDiv = document.createElement("div");
        imgDiv.className = "cart_image"
        let imgElmnt = document.createElement("img");
        imgElmnt.src = shopObjects[shopObjectKey].imgLink
        imgElmnt.alt = shopObjects[shopObjectKey].altText
        //add to img div
        imgDiv.appendChild(imgElmnt)
        cartItemDiv.appendChild(imgDiv)

        //make carttext div
        let textDiv = document.createElement("div");
        textDiv.className = "carttext"
        let textElmnt = document.createElement("h2");
        textElmnt.className = "carttext_h2"
        textElmnt.innerText = shopObjectKey
        textDiv.appendChild(textElmnt)
        cartItemDiv.appendChild(textDiv)

        //make item_count div
        let countDiv = document.createElement("div");
        countDiv.className = "item_count"
        //+
        let plusElmnt = document.createElement("div");
        plusElmnt.className = "count_btn"
        plusElmnt.innerText = "+"
        //plusElmnt.onclick = "add_button()"
        //console.log("hyfgiug")
        //let currentShopObjectKey = shopObjectKey //some weird scope issue is happening
        //console.log("currentShopObjectKey = ", currentShopObjectKey)
        plusElmnt.setAttribute("onclick", "add_button('"+shopObjectKey+"')");
        countDiv.appendChild(plusElmnt)
        //val
        let valueElmnt = document.createElement("div");
        valueElmnt.className = "count"
        valueElmnt.innerText = cartObjects[shopObjectKey]
        countDiv.appendChild(valueElmnt)
        //-
        let minusElmnt = document.createElement("div");
        minusElmnt.className = "count_btn"
        minusElmnt.innerText = "-"
        minusElmnt.setAttribute("onclick", "minus_button('"+shopObjectKey+"')");
        countDiv.appendChild(minusElmnt)
        //add completed thingo
        cartItemDiv.appendChild(countDiv)

        //make cost div
        let costDiv = document.createElement("div");
        costDiv.className = "cost"

        let priceDiv = document.createElement("div");
        priceDiv.className = "price"
        let individualTotal = cartObjects[shopObjectKey]*shopObjects[shopObjectKey].price //amount x price
        totalCost += individualTotal
        priceDiv.innerText = "$"+individualTotal
        costDiv.appendChild(priceDiv)
        let removeDiv = document.createElement("div");
        removeDiv.className = "remove_btn"
        removeDiv.innerText = "Remove"
        removeDiv.setAttribute("onclick", "remove_button('"+shopObjectKey+"')");
        costDiv.appendChild(removeDiv)
        cartItemDiv.appendChild(costDiv)
        
        //submit to HTML
        allCartItemsDiv.appendChild(cartItemDiv)
    }
    

    //Add the div we just made to the HTML
    outerCartDiv.appendChild(allCartItemsDiv)

    //make checkout div
    let checkoutDiv = document.createElement("div");
    checkoutDiv.className = "checkout"
    checkoutDiv.id = "checkout"
    let totalOuterDiv = document.createElement("div");
    totalOuterDiv.className = "total"
    let totalInnerDiv = document.createElement("div");

    let subTotalDiv = document.createElement("div");
    subTotalDiv.className = "Subtotal"
    subTotalDiv.innerText = "Sub-Total"
    totalInnerDiv.appendChild(subTotalDiv)

    let itemCountDiv = document.createElement("div");
    itemCountDiv.className = "items"//bad name
    itemCountDiv.innerText = String(totalItems)+"items"
    totalInnerDiv.appendChild(itemCountDiv)
    totalOuterDiv.appendChild(totalInnerDiv)
    let totalCostDiv = document.createElement("div");
    totalCostDiv.className = "total-cost"
    totalCostDiv.innerText = "$"+String(totalCost)//could use function but this is more efficient
    totalOuterDiv.appendChild(totalCostDiv)
    checkoutDiv.appendChild(totalOuterDiv)
    //make checkout button
    let checkoutButton = document.createElement("button");
    checkoutButton.className = "btn"
    checkoutButton.innerText = "Checkout"
    checkoutDiv.appendChild(checkoutButton)

    //add completyed checkout section
    outerCartDiv.appendChild(checkoutDiv)
}


///We have defined the data and functions above, now we need
//to actually tell the computer what to do

generate_shop_div()

///BAD BUG FIX:
cartObjects["Coffee"] = 1
generate_cart_div(true) //NOTE: This is the only place I use a variable for this function, so if we fix and delete this we can also reduce that function
delete cartObjects["Coffee"]
generate_cart_div(true)
//END BAD BUG FIX
//Should've just not delted stuff when converting HTML to Javascript



cartObjects = JSON.parse(localStorage.getItem("myCart"));
// console.log("newCartObjects = ")
// console.log(newCartObjects)
//this prints : object Object
//whether it is empty or not

//adding objects to cart for testing
//REMOVE for final assesment and create using buttons instead
// cartObjects["Croissant"] = 2
// cartObjects["Coffee"] = 3

generate_cart_div()


function remove_button(shopObjectKey){
    delete cartObjects[shopObjectKey]
    generate_cart_div()
}
function minus_button(shopObjectKey){
    minus_endcase(shopObjectKey)
    generate_cart_div()
}
function add_button(shopObjectKeyParam){
    console.log("in add button function")
    console.log("shopObjectKey = ")
    console.log(shopObjectKeyParam)
    add_endcase(shopObjectKeyParam)
    generate_cart_div()
}