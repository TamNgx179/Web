let currentStep = 0; // bước hiện tại, bắt đầu từ 0
let carlist = [];
let trolley = [];

// let tmp = createCarForm("a", "a", "a", "a", "a", "a")
// let tmp2 = createCarForm("b", "b", "b", "b", "b", "b")
// let tmp3 = createCarForm("c", "c", "c", "c", "c", "c")
// trolley.push(tmp)
// trolley.push(tmp2)
// trolley.push(tmp3)

let selectedcar = JSON.parse(localStorage.getItem('selectedcar')) || [];


function initEvent() {
    const nextbtn = document.getElementById("next-step"); 
    const prevbtn = document.getElementById("back");
    const steps = document.querySelectorAll("#step-purchasing li"); 

    function updateSteps() {
        steps.forEach((step, index) => {
            if(index === currentStep) {
                setprocessbar(index)
                

                purchasingstep(index);
            }else setprocessbar(index)
        });
    }

    // lần đầu load cũng phải gọi updateSteps để in đậm step 0
    updateSteps();

    // gán sự kiện nút Next
    nextbtn.onclick = (event) => {
        event.preventDefault(); // ngăn form submit
        if (currentStep < steps.length - 1) {
            if(checkinputinfomation(currentStep)){ 
                currentStep++;
                updateSteps();
            }
            else {
                if(currentStep != 0){
                    alert("Please choose an option and fill in all the information");
                }
                else {
                    alert("Please select a car before next step")
                }
            }

        };
    }

    // gán sự kiện nút Prev
    prevbtn.onclick = (event) => {
        event.preventDefault(); // ngăn form submit
        if (currentStep > 0) {
            currentStep--;
            updateSteps();
        }
    };
}

function setprocessbar(idx) {
    const steps = document.querySelectorAll("#step-purchasing li");

    steps.forEach((step, index) => {
        // Xóa class cũ để reset
        step.classList.remove("active", "completed");

        // active bước hiện tại
        if (index === currentStep) {
            step.classList.add("active");
        }
        //complete bước trước đó
        else if (index < currentStep) {
            step.classList.add("completed");
        }
        // Bước sau thì để trống (mặc định)
    });
}

//set chỉnh nội dung các trang
function setStepContent({ header, paragraph, options}) {
    document.getElementById("header").innerHTML = header;
    document.getElementById("paragraph").innerHTML = paragraph;

    // option 1
    document.getElementById("icon1").src = options[0].img;
    document.getElementById("chososing1").innerHTML = options[0].title;
    document.getElementById("content1").innerHTML = options[0].content;

    // option 2
    document.getElementById("icon2").src = options[1].img;
    document.getElementById("chososing2").innerHTML = options[1].title;
    document.getElementById("content2").innerHTML = options[1].content;
}

function settingdisplay_before_Step(method_status, info_status, confirmation_status, carforms_status, back_status, next_status, displaycarform) {
    const method = document.getElementById('method');
    const info = document.getElementById('info');
    const confirmation = document.getElementById('confirmation');
    const carforms = document.querySelectorAll('.carform');
    const backBtn = document.getElementById('back');
    const nextBtn = document.getElementById('next-step');
    const display = document.querySelector('.display-carform')

    // Chỉ gán nếu giá trị khác rỗng (null, undefined, hoặc chuỗi trống)
    if (method_status) method.style.display = method_status
    if (info_status) info.style.display = info_status
    if (confirmation_status) confirmation.style.display = confirmation_status
    if (back_status) backBtn.style.display = back_status
    if (next_status) nextBtn.style.display = next_status
    if (displaycarform) display.style.display = displaycarform
    
    if (carforms_status) {
        carforms.forEach(item => item.style.display = carforms_status);
    }
}

function purchasingstep(index) {
    
    switch(index) {
        
        case 0:{
            settingdisplay_before_Step('none', 'none', 'none', 'flex', 'none', 'flex', 'flex');
            setstep0();

            setStepContent({
                header: "Selection of cars for inspection",
                paragraph: "<strong>We want you to get the best car possible, which is why we first carry out a thorough inspection.</strong> If your chosen car doesn’t pass the strict technical check, we’ll move on and inspect the next options from your list – that’s why it’s a good idea to select three cars upfront. You’ll receive a detailed report, complete photo documentation, and our recommendation. The final choice is entirely yours.",
                options: [
                    {
                        img: "",
                        title: "",
                        content: ""
                    },
                    {
                        img: "",
                        title: "",
                        content: ""
                    }
                ],
            });

            break;
        }
        case 1:{
            settingdisplay_before_Step('flex', 'none', 'none', 'none', 'block', 'flex', 'none');
            
            setinfomation(index);

            setStepContent({
                header: "Choosing a payment method",
                paragraph: "Select one option below. Depending on your choice. We will ask for the minimum information needed to process securely. You can review everything again before placing the order",
                options: [
                    {
                        img: "../Image_icon/Credit_card.png",
                        title: "Credit/Debit card",
                        content: "Pay now using VISA, Master card or AMEX"
                    },
                    {
                        img: "../Image_icon/Pay_on_cash.png",
                        title: "Pay by cash",
                        content: "Pay by cash in person"
                    }
                ],
            });

            break;
        }
        case 2:{
            settingdisplay_before_Step('flex', 'none', 'none', 'none', 'block', 'flex', 'none');
            setinfomation(index);

            setStepContent({
                header: "Delivery service",
                paragraph: "Choose how you'd like to recieve your car. Homedelivery includes a walkthrough and paperwork check. You can also pick up at an showroom near you.",
                options: [
                    {
                        img: "../Image_icon/Home_delivery.png",
                        title: "Home delivery",
                        content: "To your address within 2 -7 days. <strong>$499</strong>"
                    },
                    {
                        img: "../Image_icon/Showroom.png",
                        title: "Pick up at showroom",
                        content: "Choose a location and time."
                    }
                ],
            });

            break;
        }
        case 3: {
            settingdisplay_before_Step('none', 'none', 'flex', 'none', 'block', 'block', 'none');
            setstep3();
            
            break;
        }
    }

}

//hàm tạo car form
function createCarForm(imgSrc, name, weight, power, speed, price) {
    // khung ngoài
    const carForm = document.createElement("div");
    carForm.className = "carform";

    // ảnh xe
    const imgCar = document.createElement("img");
    imgCar.className = "img-car";
    imgCar.src = imgSrc;
    carForm.appendChild(imgCar);

    // đường gạch dọc
    const line = document.createElement("hr");
    line.className = "line";
    carForm.appendChild(line);

    // thông tin xe
    const carInfo = document.createElement("div");
    carInfo.className = "car-infomation";

    // tên xe + thùng rác
    const carAndClose = document.createElement("div");
    carAndClose.className = "car-and-close";

    const carName = document.createElement("h4");
    carName.className = "car-name";
    carName.textContent = name;

    const closeIcon = document.createElement("img");
    closeIcon.className = "icon";
    closeIcon.src = "../Image_icon/trashcan.png";
    closeIcon.style.cursor = "pointer";

    carAndClose.appendChild(carName);
    carAndClose.appendChild(closeIcon);

    // thông số cơ bản
    const infoLine = document.createElement("div");
    infoLine.className = "info-line";

    const carWeight = document.createElement("div");
    carWeight.className = "car-weight";
    const weightIcon = document.createElement("img");
    weightIcon.className = "icon";
    weightIcon.src = "../Image_icon/weight.png";
    const weightText = document.createElement("div");
    weightText.className = "weight";
    weightText.textContent = weight;
    carWeight.appendChild(weightIcon);
    carWeight.appendChild(weightText);

    const carPower = document.createElement("div");
    carPower.className = "car-power";
    const powerIcon = document.createElement("img");
    powerIcon.className = "icon";
    powerIcon.src = "../Image_icon/engine.png";
    const powerText = document.createElement("div");
    powerText.className = "power";
    powerText.textContent = power;
    carPower.appendChild(powerIcon);
    carPower.appendChild(powerText);

    const carSpeed = document.createElement("div");
    carSpeed.className = "car-speed";
    const speedIcon = document.createElement("img");
    speedIcon.className = "icon";
    speedIcon.src = "../Image_icon/energy.png";
    const speedText = document.createElement("div");
    speedText.className = "speed";
    speedText.textContent = speed;
    carSpeed.appendChild(speedIcon);
    carSpeed.appendChild(speedText);

    infoLine.appendChild(carWeight);
    infoLine.appendChild(carPower);
    infoLine.appendChild(carSpeed);

    // số lượng
    const quantityDiv = document.createElement("div");
    quantityDiv.className = "car-quantity";

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.className = "qty-btn";

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.value = "1";
    qtyInput.className = "qty-input";

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.className = "qty-btn";

    quantityDiv.appendChild(minusBtn);
    quantityDiv.appendChild(qtyInput);
    quantityDiv.appendChild(plusBtn);

    // giá xe
    const carPrice = document.createElement("h3");
    carPrice.className = "car-price";
    carPrice.textContent = price;

    // gắn tất cả vào carInfo
    carInfo.appendChild(carAndClose);
    carInfo.appendChild(infoLine);
    carInfo.appendChild(quantityDiv);
    carInfo.appendChild(carPrice);

    carForm.appendChild(carInfo);

    // ==== Setup event cho form ====
    setupCarEvents(carForm);

    return carForm;
}


function setupCarEvents(carForm) {
    const plusBtn = carForm.querySelector('.qty-btn:last-child');   //lấy button +
    const minusBtn = carForm.querySelector('.qty-btn:first-child'); //button -
    const qtyInput = carForm.querySelector('.qty-input');           //trực tiếp
    const closeIcon = carForm.querySelector('.car-and-close .icon'); //thùng rác

    // nút -
    minusBtn.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        //số lượng nhỏ nhất là 1
        qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);

        //gọi thay đổi khi thay đổi bằng js
        qtyInput.dispatchEvent(new Event('change', { bubbles: true }));

    };

    // nút +
    plusBtn.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        qtyInput.value = parseInt(qtyInput.value) + 1;
        qtyInput.dispatchEvent(new Event('change', { bubbles: true }));

    };

    // input trực tiếp
    qtyInput.onchange = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (parseInt(qtyInput.value) < 1) qtyInput.value = 1;
    };

    // xóa xe
    closeIcon.onclick = (e) => {
        e.stopPropagation();
        carForm.remove();

        // Xóa form khỏi mảng tạm trolley
        const index = trolley.indexOf(carForm);
        if (index > -1) trolley.splice(index, 1);

        const carNameText = carForm.querySelector(".car-name")?.textContent.trim();
        if (carNameText) {
            const newCart = JSON.parse(localStorage.getItem("selectedcar")) || [];

            // Lọc ra mảng mới, loại bỏ item có tên trùng với carNameText
            const updatedCart = newCart.filter(item => (item.name || "").trim() !== carNameText);

            // Lưu mảng đã lọc trở lại localStorage
            localStorage.setItem("selectedcar", JSON.stringify(updatedCart));
            totalinfomation();
        }

        // Cập nhật số lượng xe hiển thị trên counter
        const counter = document.getElementById("counter");
        if (counter) {
            counter.textContent = String(JSON.parse(localStorage.getItem("selectedcar") || "[]").length);
        }

        //xóa xe ra khỏi sumary
        inputcarintosumary(carForm, false);
    };
}




//click chọn xe
function selected_car_on_trolley(car_on_trolley_list){
    car_on_trolley_list.forEach((item, index) => {
        item.onclick = (e) => {
            // nếu event từ nút + / - / input / thùng rác => bỏ qua
            if(e.target.closest('.qty-btn') || e.target.closest('.qty-input') || e.target.closest('.icon')) return;

            if(item.style.border.includes('green')){
                item.style.border = '1px solid black';
                inputcarintosumary(item, false);
            } else {
                item.style.border = '3px solid green';
                inputcarintosumary(item, true);
            }
        }
    });
}

function inputcarintosumary(item, selected) {
    const list = document.getElementById('list-car-selected');

    if (selected) {
        const li = document.createElement('li');

        const name = document.createElement('span');
        name.classList.add('car-name');
        name.textContent = item.querySelector('.car-name')?.textContent || '';

        const price = document.createElement('span');
        price.classList.add('car-price');
        price.textContent = item.querySelector('.car-price')?.textContent || '';

        const qty = document.createElement('span');
        qty.classList.add('car-qty');
        qty.textContent = " Count: " + (item.querySelector('.qty-input')?.value || 1); // thêm số lượng

        li.appendChild(name);
        li.appendChild(qty);   // chèn sau tên
        li.appendChild(price);

        list.appendChild(li);

        // Bắt sự kiện onchange trên input qty
        const qtyInput = item.querySelector('.qty-input');
        qtyInput.onchange = () => {

            // Cập nhật summary
            const qtySpan = li.querySelector('.car-qty');
            if (qtySpan) qtySpan.textContent = " Count: " + qtyInput.value;

        };
    } 
    else {
        const allLi = list.querySelectorAll('li');
        allLi.forEach(li => {
            const carName = li.querySelector('.car-name')?.textContent.trim();
            const itemName = item.querySelector('.car-name')?.textContent.trim();
            if (carName === itemName) {
                li.remove();
            }
        });
    }
}



function setstep0() {
    const display = document.querySelector('.display-carform');
    const addAnother = document.getElementById('addanother');

    // Xóa carform cũ khỏi DOM
    display.querySelectorAll('.carform').forEach(el => el.remove());

    // Tạo 1 form trống mới test
    // load lại tất cả các xe đã được chọn từ các trang khác
    trolley.forEach(item => {
        display.insertBefore(item, addAnother)
    })

    // Gán lại event click chọn cho toàn bộ form xe
    selected_car_on_trolley(trolley);

    addAnother.onclick = () => {
        window.location.href = "../HTML/Cars_And_Review.html";
    }
}



function setstep3() {
    document.getElementById("header").innerHTML = "Order confirmation";
    document.getElementById("paragraph").innerHTML = "Review your order details. You can still go back to change anything. When you're ready, click Place order to complete your purchase.";

    document.getElementById("method").style.display = "none";
    document.getElementById("info").style.display = "none"

    document.getElementById('item-label').innerHTML = "";

    document.getElementById('confirmation').style.display = 'flex';
    document.getElementById('back').style.display = 'block';


    
    totalinfomation();
}

function checkinputinfomation(stepindex){
    if(stepindex == 0){

        //chưa form nào được chọn (ol chưa có li nào) (sumary trống)
        const ol = document.querySelector('#list-car-selected')
        if(ol.querySelectorAll('li').length == 0){
            return false
        }
        else return true
    }
    else if(stepindex == 1){
        //chưa chọn phương thức thanh toán (sumary trống)
        if(document.getElementById('payment-label-sum').textContent == ''){
            return false
        }
        else return true
    }
    else if (stepindex == 2){
        //chưa chọn phương thức vận chuyển (sumary trống)
        if(document.getElementById('delivery-fee').textContent == ''){
            return false
        }
        else return true
    }

    //step cuối luôn đúng
    else return true
}


function totalinfomation() {
    let delivery = document.getElementById('delivery-label-sum').innerHTML.trim(); // loại bỏ khoảng trắng

    //phí vẫn chuyển
    let deliveryFee = 0;

    //Tổng thành tiền
    let totalitemcost = 0;

    //chuyển về tận nhà thì giá ship $499
    if(delivery === "Home") {
        deliveryFee = 499;
    }


    const addressText = gettingaddress(2);
    const feeDiv = document.querySelector('.fee');
    const itemcost = document.querySelectorAll('.carform')

    itemcost.forEach(item => {
        let priceText = item.querySelector('.car-price').textContent; 
        let cost = parseInt(priceText.replace(/[^0-9]/g, '')); // giá 1 chiếc
        let qty = parseInt(item.querySelector('.qty-input').value) || 1; // số lượng

        totalitemcost += cost * qty; // nhân với số lượng
    });

    // Hiển thị giá delivery
    document.getElementById('delivery-fee').innerHTML = "$" + deliveryFee;

    // Tổng = deliveryFee
    document.getElementById('total-fee').innerHTML = "$" + (deliveryFee + totalitemcost).toLocaleString(); //thêm dấu , khi hiện số
}

function insertAddressLabel(addressText) {
    const deliveryLabel = document.getElementById('delivery-label-sum');
    const deliveryFee = document.getElementById('delivery-fee');

    let addressLabel = document.getElementById('address');

    if (!addressLabel) {
        addressLabel = document.createElement('label');
        addressLabel.id = 'address';
        addressLabel.style.fontWeight = 'normal'

        // chèn sau delivery-label-sum, trước delivery-fee
        deliveryLabel.parentElement.insertBefore(addressLabel, deliveryFee);
    }

    // cập nhật nội dung
    addressLabel.textContent = addressText;
}

function addtime(idx, index) {
    const container = document.getElementById("info");

    //chỉ tạo khi đang ở bước chọn phương thức giao hàng
    if (idx === 2) {
        // Kiểm tra nếu chưa có thì mới tạo
        if (!document.getElementById("label3")) {
            const label = document.createElement("label");
            label.id = "label3";
            label.setAttribute("for", "info3");
            label.textContent = "Time";

            const input = document.createElement("input");
            input.id = "info3";
            input.type = "text";
            input.name = "Time";
            input.placeholder = "Time";

            container.appendChild(label);
            container.appendChild(input);
        }
    } else {
        // Nếu khác 2 thì xóa nếu tồn tại
        const label = document.getElementById("label3");
        const input = document.getElementById("info3");

        if (label) label.remove();
        if (input) input.remove();
    }
}


function gettingaddress() {

        const addressInput = document.getElementById('info1');
        const streetInput = document.getElementById('info2');

        let address = "";
        let street = "";


        if (addressInput) {
            address = addressInput.value.trim()
        }


        if (streetInput) {
            street = streetInput.value.trim();
        }


        if (address === "" && street === "") {
            return "No address provided";
        }

        if (street !== "") {
            return address + ", " + street; 
        } else {
            return address;
        }
}


function handleAddressInput() {
    const info1 = document.getElementById('info1');
    const info2 = document.getElementById('info2');

    // Tạo label address nếu chưa có
    insertAddressLabel(gettingaddress());

    // Cập nhật address khi người dùng nhập
    info1.oninput = info2.oninput = () => {
        insertAddressLabel(gettingaddress());
        totalinfomation();
    }
}


function setinfomation(stepindex) {
    const infomationDiv = document.querySelectorAll(".Option");

    stepdata = stepindex

    const infodata = [
        [
            { label: "Name on card", placeholder: "Name on card" },
            { label: "Card number", placeholder: "Card number" }
        ],
        [
            { label: "Full Name", placeholder: "Full name" },
            { label: "Phone number", placeholder: "Phone number" }
        ],
        [
            { label: "Adress", placeholder: "Adress" },
            { label: "Street number", placeholder: "Street number" }
        ],
        [
            { label: "Phone number", placeholder: "Phone number" },
            { label: "Reciever", placeholder: "name" }
        ]
    ];

    infomationDiv.forEach((item, index) => {
        item.onclick = () => {
            
            let info;
            indexdata = index
            if(stepindex == 1){
                info = infodata[index];
                //ở bước phương thức thanh toán
                document.getElementById('payment-label-sum').innerHTML = document.getElementById('payment-label').innerHTML = index == 0 ? "Card" : "Cash";
                document.getElementById('payment-label-sum').style.fontWeight = 'normal'
                addtime(stepindex, index)
            }
            if(stepindex == 2){
                info = infodata[index + 2];
                document.getElementById('delivery-label-sum').innerHTML =  document.getElementById('delivery-label').innerHTML = index == 0 ? "Home" : "Showroom";
                addtime(stepindex, index)

                if(index == 0){

                    //chọn giao hàng tại nhà thì tạo thêm div địa chỉ vào sumary
                    handleAddressInput(); // gọi hàm tách riêng
                } else {

                    // nếu chọn Showroom thì xoá input địa chỉ
                    const addressLabel = document.getElementById('address');
                    if(addressLabel) addressLabel.remove();
                }

                totalinfomation();
            }
            if(info) {
                document.getElementById('label1').innerHTML = info[0].label;
                document.getElementById('info1').placeholder = info[0].placeholder;
                document.getElementById('label2').innerHTML = info[1].label;
                document.getElementById('info2').placeholder = info[1].placeholder;
            }
            document.getElementById("info").style.display = "block";
        }
        resetInputs()
    });
}

function resetInputs() {
    const info1 = document.getElementById('info1');
    const info2 = document.getElementById('info2');
    const info3 = document.getElementById('info3'); // nếu có

    if(info1) info1.value = "";
    if(info2) info2.value = "";
    if(info3) info3.value = "";
}
//Nhận id xe từ trang car
function gettingcar() {
    // Nếu có xe từ localStorage
    selectedcar.forEach(car => {
        const carForm = createCarForm(
            car.img,
            car.name,
            car.weight,
            car.power,
            car.speed,
            car.price
        );
        trolley.push(carForm);
    });

}
/* ========= APPEND-ONLY: COUNTER + EMPTY POPUP + TRASH REMOVAL ========= */
(function () {
  // ====== TÊN KHÓA LƯU DỮ LIỆU TRONG LOCAL STORAGE ======
  const CART_KEY = "selectedcar";

  // ====== HÀM LẤY DỮ LIỆU GIỎ HÀNG ======
  function getCart() {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        return JSON.parse(saved);
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  // ====== HÀM LƯU DỮ LIỆU GIỎ HÀNG ======
  function setCart(cartArray) {
    localStorage.setItem(CART_KEY, JSON.stringify(cartArray));
    updateCounter(); // cập nhật số lượng hiển thị
  }

  // ====== CẬP NHẬT SỐ XE TRÊN ICON GIỎ HÀNG ======
  function updateCounter() {
    const counter = document.getElementById("counter");
    if (counter) {
      counter.textContent = String(getCart().length);
    }
  }

  

  // ====== KHI TRANG ĐÃ TẢI XONG ======
  document.addEventListener("DOMContentLoaded", function () {
    updateCounter();          // Cập nhật số lượng giỏ hàng
  });
})();

window.onload = () => {
    gettingcar()
    initEvent();
}