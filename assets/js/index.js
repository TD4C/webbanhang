document.addEventListener("DOMContentLoaded", function () {
    const productTabs = document.querySelectorAll(".pro_li");
    const products = document.querySelectorAll(".product");

    productTabs.forEach(tab => {
        tab.addEventListener("click", function () {
    
            document.querySelector(".pro_active").classList.remove("pro_active");
            tab.classList.add("pro_active");

      
            const category = tab.innerText.trim().toLowerCase().replace(" ", "-");

            
            products.forEach(product => {
                if (category === "all" || product.dataset.category === category) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopButton = document.getElementById("scrollToTop");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add("show");
        } else {
            scrollToTopButton.classList.remove("show");
        }
    });

    scrollToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});