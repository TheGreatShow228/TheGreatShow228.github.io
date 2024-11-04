document.addEventListener('DOMContentLoaded', function() {
    const quantityContainers = document.querySelectorAll('.catalog_quantity');

    quantityContainers.forEach(container => {
        const minusButton = container.querySelector('.minus-basket');
        const plusButton = container.querySelector('.plus-basket');
        const quantityLabel = container.querySelector('.catalog_quantity-container_number');
        let quantity = parseInt(quantityLabel.textContent);

        plusButton.addEventListener('click', function() {
            quantity++;
            quantityLabel.textContent = quantity;
        });

        minusButton.addEventListener('click', function() {
            if (quantity > 1) { 
                quantity--;
                quantityLabel.textContent = quantity;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const favoriteImages = document.querySelectorAll('.favorite-good-image');

    favoriteImages.forEach(image => {
        image.addEventListener('click', function() {
            handleImageClick(image);
        });
    });

    function handleImageClick(image) {
        console.log('Image clicked:', image.src); 

        if (isHeartImage(image.src)) {
            changeImage(image, 'img/heart(blue).png');
        } else {
            changeImage(image, 'img/heart.png');
        }
    }

    function isHeartImage(src) {
        return src.includes('heart.png');
    }

    function changeImage(image, newSrc) {
        image.src = newSrc; 
        console.log(`Changed image to ${newSrc}`); 
    }
});
