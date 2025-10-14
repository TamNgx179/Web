let currentStep = 0; // bước hiện tại, bắt đầu từ 0
let carlist = [];
let trolley = [];

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
            else alert("lease choose an option and fill in all the information");
            
        }

    };

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

        // Nếu là bước hiện tại → active
        if (index === currentStep) {
            step.classList.add("active");
        }
        // Nếu là bước trước đó → completed
        else if (index < currentStep) {
            step.classList.add("completed");
        }
        // Bước sau thì để trống (mặc định)
    });
}

initEvent();

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
function createCarForm(imgSrc, name, time, power, energy, price) {
    //khung ngoài
    const carForm = document.createElement("div");
    carForm.className = "carform";

    //ảnh xe
    const imgCar = document.createElement("img");
    imgCar.className = "img-car";
    imgCar.src = imgSrc;
    carForm.appendChild(imgCar);

    //đường gạch dọc
    const line = document.createElement("hr");
    line.className = "line";
    carForm.appendChild(line);

    //phần thông tin xe
    const carInfo = document.createElement("div");
    carInfo.className = "car-infomation";

    //tên xe + icon thùng rác
    const carAndClose = document.createElement("div");
    carAndClose.className = "car-and-close";

    //tên xe
    const carName = document.createElement("h4");
    carName.className = "car-name";
    carName.textContent = name;

    //icon thùng rác
    const closeIcon = document.createElement("img");
    closeIcon.className = "icon";
    closeIcon.src = "../Image_icon/trashcan.png";
    closeIcon.style.cursor = "pointer"; // trỏ chuột

    

    //đẩy tên xe và icon thùng rác vào khung
    carAndClose.appendChild(carName);
    carAndClose.appendChild(closeIcon);

    //dòng thông tin cơ bản xe
    const infoLine = document.createElement("div");
    infoLine.className = "info-line";

    //shop-time (thời gian bỏ xe vào giỏ)
    const shopTime = document.createElement("div");
    shopTime.className = "shop-time";
    const shopIcon = document.createElement("img");
    shopIcon.className = "icon";
    shopIcon.src = "../Image_icon/calendar.png";
    const shopText = document.createElement("div");
    shopText.className = "time";
    shopText.textContent = time;
    //đẩy icon và nội dung vào khung
    shopTime.appendChild(shopIcon);
    shopTime.appendChild(shopText);

    // Car-power
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

    // Car-energy
    const carEnergy = document.createElement("div");
    carEnergy.className = "car-energy";
    const energyIcon = document.createElement("img");
    energyIcon.className = "icon";
    energyIcon.src = "../Image_icon/energy.png";
    const energyText = document.createElement("div");
    energyText.className = "energy";
    energyText.textContent = energy;
    carEnergy.appendChild(energyIcon);
    carEnergy.appendChild(energyText);

    // Gắn 3 khối info vào info-line
    infoLine.appendChild(shopTime);
    infoLine.appendChild(carPower);
    infoLine.appendChild(carEnergy);

    // Giá xe
    const carPrice = document.createElement("h3");
    carPrice.className = "car-price";
    carPrice.textContent = price;

    // Gắn tất cả vào car-info
    carInfo.appendChild(carAndClose);
    carInfo.appendChild(infoLine);
    carInfo.appendChild(carPrice);

    // Gắn vào form chính
    carForm.appendChild(carInfo);

    //click vào icon thùng rác
    closeIcon.onclick = () => {
        carForm.remove(); // Xóa cả form
        trolley = trolley.filter(x => x  != carForm)
    };

    return carForm;
}

//Nhận id xe từ trang car
function gettingcar() {
    // Lấy dữ liệu từ localStorage
    let selectedcar = JSON.parse(localStorage.getItem('selectedcar')) || [];

    // Tạo form từ mỗi xe trong selectedcar
    selectedcar.forEach(car => {
        const carForm = createCarForm(
            car.img,
            car.name,
            car.time,
            car.power,
            car.energy,
            car.price
        );
        trolley.push(carForm);
    });
}

//click chọn xe
function selected_car_on_trolley(car_on_trolley_list){
    car_on_trolley_list.forEach((item, index) => {
        item.onclick = () => {
            if(item.style.border.includes('green')){
                item.style.border = '1px solid black';
            } else {
                item.style.border = '3px solid green';
            }
        }
    });
}



function setstep0(){
    const display = document.querySelector('.display-carform')

    trolley.forEach(item => {
        display.appendChild(item)
    })
    
    selected_car_on_trolley(trolley)
}

function setstep3() {
    document.getElementById("header").innerHTML = "Order confirmation";
    document.getElementById("paragraph").innerHTML = "Review your order details. You can still go back to change anything. When you're ready, click Place order to complete your purchase.";

    document.getElementById("method").style.display = "none";
    document.getElementById("info").style.display = "none"

    document.getElementById('item-label').innerHTML = "";

    document.getElementById('confirmation').style.display = 'flex';
    document.getElementById('back').style.display = 'block';
}

function checkinputinfomation(stepindex){
    const info1 = document.getElementById('info1');
    const info2 = document.getElementById('info2');

    if(stepindex == 0){
        document.getElementById('next-step').innerText = "Next step";
        return true;
    }
    if(stepindex == 1 || stepindex == 2){
        if(info1.value.trim() === "" || info2.value.trim() === ""){
            return false;
        } else {


            
            return true;
        }
    }
    else if(stepindex == 3){
        return true;
    }
    return false;
}


function totalinfomation() {
    let delivery = document.getElementById('delivery-label-sum').innerHTML.trim(); // loại bỏ khoảng trắng

    let deliveryFee = 0;
    if(delivery === "Home") {
        deliveryFee = 499;
    }
    // Showroom mặc định = 0

    

    const addressText = gettingaddress(2);

    const feeDiv = document.querySelector('.fee');

    // Hiển thị giá delivery
    document.getElementById('delivery-fee').innerHTML = "$" + deliveryFee;

    // Tổng = deliveryFee
    document.getElementById('total-fee').innerHTML = "$" + deliveryFee;
}

function insertAddressLabel(addressText) {
    const deliveryLabel = document.getElementById('delivery-label-sum');
    const deliveryFee = document.getElementById('delivery-fee');

    let addressLabel = document.getElementById('address');

    if (!addressLabel) {
        addressLabel = document.createElement('label');
        addressLabel.id = 'address';
        // chèn sau delivery-label-sum, trước delivery-fee
        deliveryLabel.parentElement.insertBefore(addressLabel, deliveryFee);
    }

    // cập nhật nội dung
    addressLabel.textContent = addressText;
}

function addtime(idx, index) {
    const container = document.getElementById("info");

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
                document.getElementById('payment-label-sum').innerHTML = document.getElementById('payment-label').innerHTML = index == 0 ? "Card" : "Cash";
                addtime(stepindex, index)
            }
            if(stepindex == 2){
                info = infodata[index + 2];
                document.getElementById('delivery-label-sum').innerHTML =  document.getElementById('delivery-label').innerHTML = index == 0 ? "Home" : "Showroom";
                addtime(stepindex, index)

                if(index == 0){
                    handleAddressInput(); // gọi hàm tách riêng
                } else {
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

window.onload = () => {
    gettingcar()
    setstep0()
}