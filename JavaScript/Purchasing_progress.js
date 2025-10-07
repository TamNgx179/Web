let currentStep = 0; // bước hiện tại, bắt đầu từ 0
let carlist = [];

function initEvent() {
    const nextbtn = document.getElementById("next-step"); 
    const prevbtn = document.getElementById("back");
    const steps = document.querySelectorAll("#step-purchasing li"); 

    function updateSteps() {
        steps.forEach((step, index) => {
            if(index === currentStep) {
                step.style.fontWeight = "bold"; // in đậm bước hiện tại
                purchasingstep(index);
            }else step.style.fontWeight = "normal"; // các bước khác bình thường
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
            else alert("Please fill in all the information");
            
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

function purchasingstep(index) {
    switch(index) {
        case 0:{
            document.getElementById('method').style.display = 'none'
            document.getElementById("info").style.display = "none";
            document.getElementById('confirmation').style.display = "none"
            document.querySelector('.carform').style.display = 'flex'
            document.getElementById('back').style.display = 'none';

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
            document.getElementById("method").style.display = "flex";
            document.getElementById("info").style.display = "none";
            document.getElementById('confirmation').style.display = "none"
            document.querySelector('.carform').style.display = 'none';
            document.getElementById('back').style.display = 'block';

            
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
            document.getElementById("method").style.display = "flex";
            document.getElementById("info").style.display = "none";
            document.getElementById('confirmation').style.display = "none"
            document.querySelector('.carform').style.display = 'none';

            document.getElementById('back').style.display = 'block';


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

    //click vào icon thùng rác
    closeIcon.onclick = () => {
        carForm.remove(); // Xóa cả form
    };

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

    return carForm;
}



function setstep0(){
    //đợi data
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
            alert("Please choose an option and fill in all the information");
            return false;
        } else {
            // reset input
            info1.value = "";
            info2.value = "";
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

    // Hiển thị giá delivery
    document.getElementById('delivery-fee').innerHTML = "$" + deliveryFee;

    // Tổng = deliveryFee
    document.getElementById('total-fee').innerHTML = "$" + deliveryFee;
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
            { label: "Phone number", placeholder: "Phone number" }
        ]
    ];

    infomationDiv.forEach((item, index) => {
        item.onclick = () => {
            let info;
            indexdata = index
            if(stepindex == 1){
                info = infodata[index];
                document.getElementById('payment-label-sum').innerHTML = document.getElementById('payment-label').innerHTML = index == 0 ? "Card" : "Cash";

                
            }
            if(stepindex == 2){
                info = infodata[index + 2];
                document.getElementById('delivery-label-sum').innerHTML =  document.getElementById('delivery-label').innerHTML = index == 0 ? "Home" : "Showroom";

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
    });
}

window.onload = function() {
    purchasingstep(0);
};
