let currentStep = 0; // bước hiện tại, bắt đầu từ 0
let stepdata;
let indexdata;

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
            currentStep++;
            updateSteps();
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
            break;
        }
        case 1:{
            document.getElementById("method").style.display = "flex";
            document.querySelector(".infomation").style.display = "none";
            document.getElementById('confirmation').style.display = "none"
            
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
            document.querySelector(".infomation").style.display = "none";
            document.getElementById('confirmation').style.display = "none"

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
            setstep3(stepdata, indexdata);
            break;
        }
    }
}



function setstep3(stepDataValue, indexDataValue) {
    document.getElementById("header").innerHTML = "Order confirmation";
    document.getElementById("paragraph").innerHTML = "Review your order details. You can still go back to change anything. When you're ready, click Place order to complete your purchase.";

    document.getElementById("method").style.display = "none";
    document.getElementById("info").style.display = "none"

    document.getElementById('item-label').innerHTML = ""; // thông tin sản phẩm nếu có

    // Payment label
    if(stepDataValue == 1){
        document.getElementById('payment-label').innerHTML = indexDataValue == 0 ? "Card" : "Cash";
    }
    // Delivery label
    if(stepDataValue == 2){
        document.getElementById('delivery-label').innerHTML = indexDataValue == 0 ? "Home" : "Showroom";
    }

    document.getElementById('confirmation').style.display = 'flex';
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
            }
            if(stepindex == 2){
                info = infodata[index + 2];
            }
            if(info) {
                document.getElementById('label1').innerHTML = info[0].label;
                document.getElementById('info1').placeholder = info[0].placeholder;
                document.getElementById('label2').innerHTML = info[1].label;
                document.getElementById('info2').placeholder = info[1].placeholder;
            }
            document.querySelector(".infomation").style.display = "block";
        }
    });
}

