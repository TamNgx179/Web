// Lấy danh sách reviews từ localStorage hoặc tạo mới
const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#review');

const submit = document.getElementById('submit-review');
const close = document.getElementById('close-review');
const showmore = document.getElementById('see-all-reviews')

const writeReviewBtn = document.getElementById('write-review');

const reviewForm = document.getElementById('review-form');
const reviewMain = document.getElementById('review-main');

const select = document.getElementById('sort-review');

let reviewblock_count = 2;

// Hiển thị form viết review
writeReviewBtn.onclick = () => {
    reviewForm.style.display = 'flex';
}

// Lấy dữ liệu từ form và lưu
function gettingdata_saving() {
    

    submit.onclick = (e) => {
        e.preventDefault(); // Ngăn form reload trang

        if(nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === ''){
            alert('Please fill all content');
            return;
        }

        const data = {
            usname: nameInput.value,
            usemail: emailInput.value,
            date: new Date().toLocaleString(),
            review: messageInput.value
        };

        reviews.push(data);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";

        reviewForm.style.display = 'none';

        if (reviews.length <= 2) {
            create_review_block(data);
        }
        if(reviews.length > 2){
        showmore.style.display = 'inline-block'
        }
        else showmore.style.display = 'none'
        }

    close.onclick = (e) => {
        e.preventDefault();
        reviewForm.style.display = 'none';
    }
}

// Tạo block review
function create_review_block(object){
    if(object.usname == '' || object.usemail == '' || object.review == '') return;

    const review_block = document.createElement('div');
    review_block.classList.add('review');

    review_block.innerHTML = `
        <h3 class="name-input">By ${object.usname}</h3>
        <h3 class="date-time">${object.date}</h3>
        <p class="review-message">${object.review}</p>
        <button class="show-full" style="display: none;">Show full review</button>
    `;

    reviewMain.appendChild(review_block); // thêm review mới vào DOM

    const p = review_block.querySelector('.review-message'); // chỉ chọn trong review_block
    const showfull = review_block.querySelector('.show-full');

    
    // p.scrollHeight: chiều cao toàn bộ nội dung bên trong thẻ p (kể cả phần bị ẩn vì overflow)
    // p.clientHeight: chiều cao vùng hiển thị thực tế của thẻ p (chỉ phần nhìn thấy)

    // Nếu nội dung dài hơn vùng hiển thị => text bị cắt
    if (p.scrollHeight > p.clientHeight) {
        // Khi đó hiện nút "Show full" (inline-block giúp nút nằm gọn, không chiếm nguyên dòng)
        showfull.style.display = 'inline-block';
    }


    showfull.onclick = () => {
        review_block.classList.toggle("full");
        showfull.textContent = review_block.classList.contains("full") ? "Show less" : "Show full review";
    }
    
}

// Hiển thị một số review từ start -> end
function initreview(startnum, endnum) {
    const slice = reviews.slice(startnum, endnum); // lấy một phần mảng cha
    slice.forEach((item) => create_review_block(item)); 
}

// Xử lý nút "See more"
function showmorereview() {
    // Xử lý nút See more
    reviewblock_count = 2; // số review đã hiển thị ban đầu
    
    //khi mới chạy trang lần đầu nếu số lượng review lớn hơn 2 thì hiện nút showmore
    if(reviews.length > 2){
        showmore.style.display = 'inline-block'
    }

    showmore.onclick = () => {
        if(showmore.textContent === 'Show less'){
            //reset viewmain và khởi tạo lại 2 review đầu tiên
            reviewMain.innerHTML = '';
            reviewblock_count = 2;
            showmore.textContent = 'Show more'
            
            initreview(0, reviewblock_count)        
        }
        else {
            initreview(reviewblock_count, reviewblock_count + 3);
            reviewblock_count += 3;

            //hiển thị hết danh sách chuyển showmore thành showless 
            if(reviewblock_count >= reviews.length) {
                showmore.textContent = 'Show less';
            }
        }
        
    }
}


select.addEventListener('change', () => {
    const value = select.value;

    if(value === 'newest'){
        reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
        reviews.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    reviewMain.innerHTML = '';
    reviewblock_count = 2; // reset số review đã hiển thị

    initreview(0, reviewblock_count);
    showmore.style.display = reviewblock_count < reviews.length ? 'inline-block' : 'none';
});


// Khi load trang
window.onload = () => {
    initreview(0, 2); // hiển thị 2 review đầu tiên
    showmorereview(); // kích hoạt nút "See more"
    gettingdata_saving(); // kích hoạt submit & close
}

