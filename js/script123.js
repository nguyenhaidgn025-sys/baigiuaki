/* ========== BÀI 1: SẢN PHẨM ========== */
const productListEl = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');

if (productListEl) {

    const products = [
        { 
            id: 1, 
            name: 'Laptop Dell XPS', 
            price: '25.000.000đ', 
            image: 'images/Laptop Dell XPS.jpg' 
        },
        { 
            id: 2, 
            name: 'iPhone 15 Pro', 
            price: '30.000.000đ', 
            image: 'images/iPhone 15 Pro.jpg' 
        },
        { 
            id: 3, 
            name: 'Chuột Logitech', 
            price: '500.000đ', 
            image: 'images/Chuột Logitech.jpg' 
        },
        { 
            id: 4, 
            name: 'Bàn phím cơ', 
            price: '1.200.000đ', 
            image: 'images/Bàn phím cơ.jpg' 
        },
        { 
            id: 5, 
            name: 'Màn hình LG 27"', 
            price: '4.500.000đ', 
            image: 'images/Màn hình LG 27.jpg' 
        }
    ];

    // 2. Hàm render 
    function renderProducts(data) {
        productListEl.innerHTML = ''; 
        const errorMsg = document.getElementById('error-msg');

        if (data.length === 0) {
            errorMsg.classList.remove('hidden');
            return;
        } 
        
        errorMsg.classList.add('hidden');
        data.forEach(prod => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            
            card.innerHTML = `
                <img src="${prod.image}" alt="${prod.name}" class="product-img">
                <h3>${prod.name}</h3>
                <p class="price">${prod.price}</p>
            `;
            productListEl.appendChild(card);
        });
    }

    //Khởi tạo 
    renderProducts(products);

    searchInput.addEventListener('keyup', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
        renderProducts(filtered);
    });
}

/* ========== BÀI 2: FORM ========== */
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const terms = document.getElementById('terms').checked;
        const msgEl = document.getElementById('form-msg');

        const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!terms) { msgEl.innerText = "Bạn chưa đồng ý điều khoản!"; msgEl.style.color = 'red'; return; }
        if (!passRegex.test(password)) { msgEl.innerText = "Mật khẩu yếu!"; msgEl.style.color = 'red'; return; }

        localStorage.setItem('user_data', JSON.stringify({ fullname, email }));
        msgEl.style.color = 'green'; msgEl.innerText = `Đăng ký thành công! Chào ${fullname}.`;
        registerForm.reset();
    });
}

/* ========== BÀI 3: TIMER ========== */
const timerDisplay = document.getElementById('timer-display');
if (timerDisplay) {
    let duration = 60 * 10;
    function updateTimer() {
        const m = Math.floor(duration / 60);
        const s = duration % 60;
        timerDisplay.innerText = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
        if (duration < 60) timerDisplay.classList.add('danger');
        if (duration <= 0) { clearInterval(timerInterval); alert("Hết giờ!"); }
        else duration--;
    }
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}