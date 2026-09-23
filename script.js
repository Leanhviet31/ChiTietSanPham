document.addEventListener('DOMContentLoaded', () => {
    // 1. Image gallery
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Update main image src
            mainImage.src = thumb.dataset.src;
            
            // Update active class
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // 2. Quantity selector
    const qtyMinus = document.querySelector('.qty-minus');
    const qtyPlus = document.querySelector('.qty-plus');
    const qtyInput = document.querySelector('.qty-input');

    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val > 1) {
                qtyInput.value = val - 1;
            }
        });

        qtyPlus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val < 99) {
                qtyInput.value = val + 1;
            }
        });
    }

    // 3. Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked button and target content
            btn.classList.add('active');
            const targetId = btn.dataset.tab;
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Toast Notification Function
    function showToast(message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Trigger reflow
        void toast.offsetWidth;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // 4. Wishlist toggle
    const wishlistBtn = document.querySelector('.btn-wishlist-detail');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            wishlistBtn.classList.toggle('active');
            const icon = wishlistBtn.querySelector('i');
            if (wishlistBtn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showToast('Đã thêm vào yêu thích');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showToast('Đã bỏ khỏi yêu thích');
            }
        });
    }

    // 5. Add to cart button
    const cartBtn = document.querySelector('.btn-cart');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            showToast('Đã thêm vào giỏ hàng');
        });
    }

    // 6. Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                if (navList.style.display === 'flex') {
                    navList.style.display = 'none';
                } else {
                    navList.style.display = 'flex';
                    navList.style.flexDirection = 'column';
                    navList.style.position = 'absolute';
                    navList.style.top = '72px';
                    navList.style.left = '0';
                    navList.style.right = '0';
                    navList.style.backgroundColor = '#fff';
                    navList.style.padding = '16px';
                    navList.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    navList.style.zIndex = '99';
                }
            }
        });
    }

    // Handle resize to reset mobile menu
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && navList) {
            navList.style.display = 'flex';
            navList.style.flexDirection = 'row';
            navList.style.position = 'static';
            navList.style.boxShadow = 'none';
            navList.style.padding = '0';
        } else if (navList) {
            navList.style.display = 'none';
        }
    });

    // 7. Sticky header is handled via CSS position: sticky

    // 8. Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. FitMatch logic
    const fitmatchBtn = document.querySelector('.btn-fitmatch-check');
    const fitmatchResults = document.querySelector('.fitmatch-results');

    if (fitmatchBtn && fitmatchResults) {
        fitmatchBtn.addEventListener('click', () => {
            // Simple logic to show results with a slight delay simulating check
            fitmatchBtn.textContent = 'Đang kiểm tra...';
            fitmatchBtn.disabled = true;
            fitmatchResults.style.display = 'none';
            
            setTimeout(() => {
                fitmatchResults.style.display = 'flex';
                fitmatchBtn.textContent = 'Kiểm tra';
                fitmatchBtn.disabled = false;
            }, 800);
        });
    }
});
