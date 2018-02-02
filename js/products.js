$(document).ready(() => {
    
// let iphone,color,memory = '';

const iphones = [
    {
        name: "iphone 5D",  
        image: 'https://i5.walmartimages.com/asr/dfc16d2b-b8a5-443a-b1f8-fddd54c0d393_1.f6be90ea5554aedffb71723666c1b52d.jpeg',
        memory: [
            {amount: '16', price: '32000'},
            {amount: '32', price: '36000'},
        ],
        colors: [
            {name: 'Gold', price: '1000'},
            {name: 'Pink', price: '2000'}
        ],
        price: '25000'
    },
    {
        name: "iphone 5f", 
        image: 'https://i5.walmartimages.com/asr/dfc16d2b-b8a5-443a-b1f8-fddd54c0d393_1.f6be90ea5554aedffb71723666c1b52d.jpeg',       
        memory: [
            {amount: '16', price: '32000'},
            {amount: '32', price: '36000'},
        ],
        colors: [
            {name: 'Gold', price: '25000'},
            {name: 'Pink', price: '26000'}
        ],
        price: '25000'
    }
  
]

let iphonesList = $();

for (let iphone of iphones) {    
    const iphoneMarkup = 
        `<div class="col-sm-4">
            <div class="pricing-item pricing-item-1  text-center">
                <img class="img-responsive iphoneImage" src="`+iphone.image+`"/>
                <h5 class="mb-10">`+iphone.name+`</h5>
                <p>Память:</p>
                <div class="selectStorage"></div>
                <p>Цвет:</p>
                <div class="selectColor"></div>
                <div class="pricing-price">` +iphone.price+ `
                    <span class="pricing-currency">P</span>
                </div>

                <button
                    class="b-btn mdl-button mdl-js-button button mb-30">Купить</button>
            </div>
        </div>`       
    $('#iphones').append(iphoneMarkup);   

    for (let color of iphone.colors) {        
        console.log(color.name + color.price);
        const colorMarkup = 
        `<label class="radio-inline">
            <input type="radio" name="color" value="`+color.price+`"/>`+color.name+`
        </label>
        `
        $('.selectColor').append(colorMarkup)
    }
            
    for (let storage of iphone.memory) {
        const storageMarkup = 
        `<label class="radio-inline">
            <input type="radio" name="storage" value="`+storage.price+`"/>`+storage.amount+`
        </label>
        `
        $('.selectStorage').append(storageMarkup)
    }
    
};



$('#iphones input[name=color]').on('change', () => {    
    let selectedStorage = $('input[name=storage]:checked').val();    
    $('input[name=color]:checked').closest('.pricing-item').children('.pricing-price').text(selectedStorage);    
    let selectedColor = parseInt($('input[name=color]:checked').val());    
    let newPrice = parseInt(selectedStorage) + parseInt(selectedColor);
    $('input[name=color]:checked').closest('.pricing-item').children('.pricing-price').text(newPrice);    
});

$('#iphones input[name=storage]').on('change', () => {
    let selectedStorage = $('input[name=storage]:checked').val();    
    let price = $('input[name=storage]:checked').closest('.pricing-item').children('.pricing-price').text(selectedStorage);        
    
    console.log(price);
});

updatePrice = () => {
    
}

});