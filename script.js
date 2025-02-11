const products = [
    {
      name: 'Sony Playstation 5',
      url: 'images/playstation_5.png',
      category: 'games',
      price: 499.99,
    },
    {
      name: 'Samsung Galaxy',
      url: 'images/samsung_galaxy.png',
      category: 'smartphones',
      price: 399.99,
    },
    {
      name: 'Cannon EOS Camera',
      url: 'images/cannon_eos_camera.png',
      category: 'cameras',
      price: 749.99,
    },
    {
      name: 'Sony A7 Camera',
      url: 'images/sony_a7_camera.png',
      category: 'cameras',
      price: 49999,
    },
    {
      name: 'LG TV',
      url: 'images/lg_tv.png',
      category: 'televisions',
      price: 799.99,
    },
    {
      name: 'Nintendo Switch',
      url: 'images/nintendo_switch.png',
      category: 'games',
      price: 299.99,
    },
    {
      name: 'Xbox Series X',
      url: 'images/xbox_series_x.png',
      category: 'games',
      price: 499.99,
    },
    {
      name: 'Samsung TV',
      url: 'images/samsung_tv.png',
      category: 'televisions',
      price: 25999,
    },
    {
      name: 'Google Pixel',
      url: 'images/google_pixel.png',
      category: 'smartphones',
      price: 499.99,
    },
    {
      name: 'Sony ZV1F Camera',
      url: 'images/sony_zv1f_camera.png',
      category: 'cameras',
      price: 799.99,
    },
    {
      name: 'Toshiba TV',
      url: 'images/toshiba_tv.png',
      category: 'televisions',
      price: 22999,
    },
    {
      name: 'iPhone 14',
      url: 'images/iphone_14.png',
      category: 'smartphones',
      price: 999.99,
    },
  ];

  //select DOM elements
  const searchI=document.getElementById('search');
  const cartcount=document.getElementById('cart-count');
  const filterscontainer=document.getElementById('filters-container');
  const checkboxes=document.querySelectorAll('.check');
  const productwrapper=document.getElementById('products-wrapper');

  //initialize cart itemcount
  let cart=0;

  //init productElements array
  const productElements=[];

  //event listener for filtering
  filterscontainer.addEventListener('change',filterProducts);
  searchI.addEventListener('input',filterProducts);

  //loop over product and create an element
  products.forEach(product => {

    const productElement=createProductElement(product);

    productElements.push(productElement);
    productwrapper.appendChild(productElement);
  });


  function createProductElement(product){
    const productElement= document.createElement('div');

    productElement.className = 'item space-y-2';

    productElement.innerHTML=`
        <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
                    <img src="${product.url}" alt="${product.name}" class="w-full h-full object-cover">
                    <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0 cursor-pointer">Add to Cart</button>
        </div>
            <p class="text-xl">${product.name}</p>
            <strong>${product.price.toLocaleString('hi-IN',{ style: 'currency', currency: 'INR' })}</strong>
    `;

    productElement.querySelector('.status').addEventListener('click',updatecart);

    return productElement;
  }


  //add or remove from cart
  function updatecart(e){
    const statusel=e.target;
    
    if(statusel.classList.contains('added')){
        //remove from cart
         statusel.classList.remove('added');
         statusel.innerText='Add To Cart';
         statusel.classList.remove('bg-red-600');
         statusel.classList.add('bg-black');
         
         cart--;
    }else{
        //add to cart
        statusel.classList.add('added');
        statusel.innerText='Remove From Cart';
        statusel.classList.remove('bg-gray-800');
        statusel.classList.add('bg-red-600');

        cart++;
    }

    //Update cart count
    cartcount.innerText=cart.toString();
  }


  function filterProducts(){
    //get search term
    const searchterm=searchI.value.trim().toLowerCase();
    //get checked categories
    const checkedcategories=Array.from(checkboxes)
    .filter((check)=>check.checked)
    .map((check)=>check.id);

    //loop over the products and check for matches
    productElements.forEach((productElement,index)=>{
        const product=products[index];

        //check to see if the product matches the search or checked categories
        const matchesSearchTerm=product.name.toLowerCase().includes(searchterm);
        const isinCheckedCategories = checkedcategories.length===0 || checkedcategories.includes(product.category);

        //show or hide based on the matches
        if(matchesSearchTerm && isinCheckedCategories){
            productElement.classList.remove('hidden');
        }
        else{
            productElement.classList.add('hidden');
        }
    });


  }

