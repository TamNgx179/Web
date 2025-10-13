let currentStep = 0;
const MAX_SLOTS = 3;

/* Nội dung cố định theo từng bước (đảm bảo Back/Next không bị lẫn) */
const STEP_CONTENTS = [
  {
    header: "Selection of cars for inspection",
    paragraph:
      "<strong>We want you to get the best car possible, which is why we first carry out a thorough inspection.</strong> If your chosen car doesn’t pass the strict technical check, we’ll move on and inspect the next options from your list – that’s why it’s a good idea to select three cars upfront. You’ll receive a detailed report, complete photo documentation, and our recommendation. The final choice is entirely yours."
  },
  {
    header: "Choosing a payment method",
    paragraph:
      "Select one option below. Depending on your choice, we will ask for the minimum information needed to process securely. You can review everything again before placing the order."
  },
  {
    header: "Delivery service",
    paragraph:
      "Choose how you'd like to receive your car. Home delivery includes a walkthrough and paperwork check. You can also pick up at a showroom near you."
  },
  {
    header: "Order confirmation",
    paragraph:
      "Review your order details. You can still go back to change anything. When you're ready, click Place order to complete your purchase."
  }
];

function initEvent(){
  const nextbtn = document.getElementById("next-step");
  const prevbtn = document.getElementById("back");
  const steps = document.querySelectorAll("#step-purchasing .step");

  function paintSteps(){
    steps.forEach((li, idx)=>{
      li.classList.remove("active","completed");
      if(idx < currentStep) li.classList.add("completed");
      if(idx === currentStep) li.classList.add("active");
    });
    purchasingstep(currentStep);
  }

  nextbtn.onclick = (e)=>{
    e.preventDefault();
    if(currentStep < steps.length-1){
      if(checkinputinfomation(currentStep)){
        currentStep++;
        paintSteps();
      }
    }
  };

  prevbtn.onclick = (e)=>{
    e.preventDefault();
    if(currentStep>0){ currentStep--; paintSteps(); }
  };

  paintSteps();
  renderEmptySlots(); // vẽ slot rỗng lần đầu
}
document.addEventListener('DOMContentLoaded', initEvent);

function purchasingstep(index){
  const method  = document.getElementById("method");
  const info    = document.getElementById("info");
  const confirm = document.getElementById("confirmation");
  const form    = document.getElementById("Choosing-method"); // <-- thêm

  // set nội dung đúng theo bước
  const { header, paragraph } = STEP_CONTENTS[index];
  document.getElementById("header").innerHTML = header;
  document.getElementById("paragraph").innerHTML = paragraph;

  // reset hiển thị
  method.style.display = "none";
  info.style.display   = "none";
  confirm.style.display= "none";
  document.getElementById('back').style.display = index===0 ? 'none' : 'inline-flex';

  // toggle class để ẩn divider ở bước cuối
  if (index === 3) form.classList.add("final-step");     // <-- thêm
  else form.classList.remove("final-step");              // <-- thêm

  if(index===1){
    method.style.display = "flex";
    setOptionsForStep(1);
    setinfomation(1);
  } else if(index===2){
    method.style.display = "flex";
    setOptionsForStep(2);
    setinfomation(2);
  } else if(index===3){
    confirm.style.display = "flex";
  }
}


function setOptionsForStep(step){
  if(step===1){
    document.getElementById("icon1").src = "../Image_icon/Credit_card.png";
    document.getElementById("chososing1").innerHTML = "Credit/Debit card";
    document.getElementById("content1").innerHTML   = "Pay now using VISA, Master card or AMEX";

    document.getElementById("icon2").src = "../Image_icon/Pay_on_cash.png";
    document.getElementById("chososing2").innerHTML = "Pay by cash";
    document.getElementById("content2").innerHTML   = "Pay by cash in person";
  }
  if(step===2){
    document.getElementById("icon1").src = "../Image_icon/Home_delivery.png";
    document.getElementById("chososing1").innerHTML = "Home delivery";
    document.getElementById("content1").innerHTML   = "To your address within 2–7 days. <strong>$499</strong>";

    document.getElementById("icon2").src = "../Image_icon/Showroom.png";
    document.getElementById("chososing2").innerHTML = "Pick up at showroom";
    document.getElementById("content2").innerHTML   = "Choose a location and time.";
  }
}

function checkinputinfomation(stepindex){
  const info1 = document.getElementById('info1');
  const info2 = document.getElementById('info2');

  if(stepindex===0) return true;
  if(stepindex===1 || stepindex===2){
    if(info1.value.trim()==="" || info2.value.trim()===""){
      alert("Please choose an option and fill in all the information");
      return false;
    }
    info1.value = ""; info2.value = "";
    return true;
  }
  return true;
}

function setinfomation(stepindex){
  const infomationDiv = document.querySelectorAll(".Option");
  const infodata = [
    [{label:"Name on card", placeholder:"Name on card"},{label:"Card number", placeholder:"Card number"}],
    [{label:"Full Name", placeholder:"Full name"},{label:"Phone number", placeholder:"Phone number"}],
    [{label:"Address", placeholder:"Address"},{label:"Street number", placeholder:"Street number"}],
    [{label:"Phone number", placeholder:"Phone number"},{label:"Phone number", placeholder:"Phone number"}],
  ];

  infomationDiv.forEach((item, idx)=>{
    item.onclick = ()=>{
      let pair;
      if(stepindex===1){
        pair = infodata[idx];
        document.getElementById('payment-label').innerHTML =
        document.getElementById('payment-label-sum').innerHTML = idx===0? "Card" : "Cash";
      }else{
        pair = infodata[idx+2];
        document.getElementById('delivery-label').innerHTML =
        document.getElementById('delivery-label-sum').innerHTML = idx===0? "Home" : "Showroom";
        totalinfomation();
      }
      document.getElementById('label1').innerHTML = pair[0].label;
      document.getElementById('info1').placeholder = pair[0].placeholder;
      document.getElementById('label2').innerHTML = pair[1].label;
      document.getElementById('info2').placeholder = pair[1].placeholder;
      document.getElementById('info').style.display = "block";
    };
  });
}

function totalinfomation(){
  const delivery = document.getElementById('delivery-label-sum').textContent.trim();
  const fee = (delivery==="Home") ? 499 : 0;

  // hiển thị phí ngay cạnh chữ Delivery (một dòng)
  document.getElementById('delivery-fee').textContent = fee ? ` +$${fee}` : "";
  document.getElementById('total-fee').textContent = `$${fee}`;
}

function renderEmptySlots(){
  const addWrap = document.getElementById('add-container');
  if(!addWrap) return;

  const carCount = document.querySelectorAll('#inspection-card .carform').length;
  const empty = Math.max(0, MAX_SLOTS - carCount);

  addWrap.innerHTML = '';
  for(let i=0; i<empty; i++){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'add-row';
    btn.innerHTML = `<span class="plus">+</span><span class="label">Add another car</span>`;
    btn.addEventListener('click', ()=>{
      alert('Sau này sẽ mở modal/đi tới danh sách để thêm xe vào slot này.');
    });
    addWrap.appendChild(btn);
  }
}

/* Xoá xe -> bù slot */
document.addEventListener('click', (e)=>{
  if(e.target.classList.contains('trash')){
    const card = e.target.closest('.carform');
    if(card) card.remove();
    renderEmptySlots();
  }
});


