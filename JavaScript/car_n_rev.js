(function () {
  const preloader = document.getElementById('preloader');
  document.body.classList.add('is-loading');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader?.classList.add('hide');
      document.body.classList.remove('is-loading');
      setTimeout(() => preloader?.remove(), 500);
    }, 600);
  });
})();

// ================== Cart counter ======================
let selectedcar = JSON.parse(localStorage.getItem('selectedcar')) || [];
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

document.addEventListener('DOMContentLoaded', async function() {

    const feature = ["ABS + EBD + Brake Assist","Active steering","Adaptive lighting",
    "Air suspension","Air-conditioned glove box","Alloy wheels","Ambient lighting","Android Auto","Anti-lock Braking System","Apple CarPlay","Armrest front","Armrest rear","Assisted driving","Automated Emergency Braking with Pedestrian Detection",
    "Automatic activation of warning lights","Automatic lights",
    "Automatic parking brake","Auxiliary heating","Blind spot assist","Bluetooth",
    "BMW Curved Display","CRUISE CONTROL","Central locking with remote","Daytime running lights",
    "Digital cockpit","Driver's seat with massage","Electric adjustable front seats",
    "Electric adjustable rear seats","Electric tailgate","Emergency call","Emergency braking assist (EBA, BAS)",
    "Fatigue warning system","Front collision warning system","Front Fog lights",
    "Front seats with memory","Gesture control","Head-up display",
    "Heated front seats","Heated rear seats","Heated steering wheel","Heated windshield","Height adjustable suspension","High beam assist",
    "Hill descent assist","Hill-start assist","Induction charging for smartphones","Lane assist",
    "Leather steering wheel","Monitors in headrests","Multiple airbags","Multi-zone automatic climate control",
    "Multifunctional steering wheel","Navigation system","Night vision assist","Paddle shifters",
    "Panoramic roof","Parking assist system self-steering",
    "Predictive emergency braking system (PEBS)","Rain sensor",
    "Rear cross traffic alert (RCTA)","Rear seats ISOFIX points","Rear seats with massage function",
    "Rear wiper","Seat belts with pretensioners and reminders","Smart key",
    "Sport front seats","Sport-exhaust system","Sport-suspension system",
    "Start-stop system","Sunroof","Touch screen","Traction control (TC, ASR)","Traffic sign recognition","Trailer coupling","Tyre pressure monitoring","USB",
    "Variable stiffness suspension","Ventilated front seats","Ventilated rear seats","Voice control",
    "WLAN/Wifi hotspot","Wood trim"
    ];

    const intialVisibleCount = 7;
    const cardPerPage = 7;
    let currentCarPage = intialVisibleCount;

    const featureListContainer = document.querySelector(".feature-list");
    const moreFeatureButton = document.querySelector(".more-feature");
    const featureSearchInput = document.querySelector(".feature-search-input");

    featureListContainer.innerHTML = '';
    const featureItems = [];

    // Hiển thị hộp kiểm tính năng
    feature.forEach((featureName, index) => {
        const safeId = 'feature' + (index + 1);
        const itemDiv = document.createElement('div');
        itemDiv.className = 'checkbox-item';
        itemDiv.dataset.featureName = featureName.toLowerCase(); 

        const checkbox = document.createElement('input');
        checkbox.id = safeId;
        checkbox.type = 'checkbox';
        checkbox.name = 'feature';
        checkbox.value = featureName;

        const lableName = document.createElement("label");
        lableName.htmlFor = safeId;
        lableName.textContent = featureName;

        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(lableName);

        if(index >= currentCarPage) {
            itemDiv.style.display = "none";
        } else {
             itemDiv.style.display = "flex";
        }

        featureListContainer.appendChild(itemDiv);
        featureItems.push(itemDiv);
        
        // ========= THÊM SỰ KIỆN LỌC KHI CHECKBOX THAY ĐỔI =========
        checkbox.addEventListener('change', filterCars);
    });
    
    if (featureItems.length <= intialVisibleCount) {
        moreFeatureButton.style.display = 'none';
    }

    // Nút tính năng khác
    moreFeatureButton.addEventListener('click', function(event){
        event.preventDefault();
        
        if (featureSearchInput.value.trim() === '') {
            const cardTotalNumber = featureItems.length;
            let lastVisibleIndex = -1;

            for (let i = 0; i < cardTotalNumber; i++) {
                if (featureItems[i].style.display !== 'none') {
                    lastVisibleIndex = i;
                }
            }
            
            let startIndex = lastVisibleIndex + 1;
            let itemsShown = 0;

            for( let i = startIndex; i < cardTotalNumber && itemsShown < cardPerPage; i++) {
                if (featureItems[i].dataset.featureName.includes(featureSearchInput.value.trim().toLowerCase())) {
                     featureItems[i].style.display = 'flex';
                     itemsShown++;
                }
            }

            currentCarPage += cardPerPage;

            if (currentCarPage >= cardTotalNumber) {
                moreFeatureButton.style.display = 'none';
            }
        }
    });

    // Tìm kiếm tính năng
    featureSearchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();

        featureItems.forEach(item => {
            const featureName = item.dataset.featureName;
            
            if (featureName.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        if (searchTerm === '') {
            let totalItems = featureItems.length;
            
            for (let i = 0; i < totalItems; i++) {
                if (i < currentCarPage) {
                    featureItems[i].style.display = 'flex';
                } else {
                    featureItems[i].style.display = 'none';
                }
            }
            
            if (currentCarPage < totalItems) {
                moreFeatureButton.style.display = 'block';
            } else {
                moreFeatureButton.style.display = 'none';
            }
        } else {
            moreFeatureButton.style.display = 'none';
        }
    });

    // Thiết lập phương thức thương hiệu
    let mostSearchedBrands = [];
    let allBrands = [];

    try {
        const response = await fetch('../DATA/car-icon.json');
        if (!response.ok) throw new Error('Không thể tải car-icon.json');
        const data = await response.json();

        mostSearchedBrands = data.mostSearchedBrands || [];
        allBrands = data.allBrands || [];
    } catch (error) {
        console.error('Lỗi khi đọc file JSON:', error);
    }
    // Hạn chế các thương hiệu được phép thiết lập
    const ALLOWED_BRANDS = [
      { name: 'BMW',      imgSrc: '../images/logos/bmw-logo.png' },
      { name: 'Honda',    imgSrc: '../images/logos/honda-logo.png' },
      { name: 'Mercedes', imgSrc: '../images/logos/mercedes-logo.png' },
      { name: 'Porsche',  imgSrc: '../images/logos/porsche-logo.png' },
      { name: 'Toyota',   imgSrc: '../images/logos/toyota-logo.png' },
      { name: 'Vinfast',  imgSrc: '../images/logos/vinfast-logo.png' },
    ];
    mostSearchedBrands = ALLOWED_BRANDS;
    allBrands = ALLOWED_BRANDS;


    const gridContainer = document.getElementById('brand-grid-container');
    const listContainer = document.getElementById('brand-list-container');

    if (gridContainer && mostSearchedBrands.length > 0) {
        mostSearchedBrands.forEach(brand => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'brand-grid-item';
            // THÊM data-brand-name vào đây để đảm bảo khớp với car.brand
            itemDiv.setAttribute('data-brand-name', brand.name); 
            const img = document.createElement('img');
            img.src = brand.imgSrc;
            img.alt = brand.name;
            itemDiv.appendChild(img);
            gridContainer.appendChild(itemDiv);
        });
    }

    if (listContainer && allBrands.length > 0) {
        allBrands.forEach(brand => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'brand-list-item';
            // THÊM data-brand-name vào đây để đảm bảo khớp với car.brand
            itemDiv.setAttribute('data-brand-name', brand.name);
            const img = document.createElement('img');
            img.className = 'brand-logo';
            img.src = brand.imgSrc;
            img.alt = brand.name;
            const span = document.createElement('span');
            span.className = 'brand-name';
            span.textContent = brand.name;
            itemDiv.appendChild(img);
            itemDiv.appendChild(span);
            listContainer.appendChild(itemDiv);
        });
    }

    const openModalBtn = document.getElementById('openMakeModalBtn');
    const closeModalBtn = document.getElementById('closeMakeModalBtn');
    const modalOverlay = document.getElementById('makeModalOverlay');

    function openModal() {
        if (modalOverlay) modalOverlay.classList.add('active');
    }

    function closeModal() {
        if (modalOverlay) modalOverlay.classList.remove('active');
    }

    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) closeModal();
        });
    }

    // Selected brands container
    const makeAndModelSelection = document.querySelector('.form-group');
    let selectedBrandsContainer = document.querySelector('.selected-brands-container');

    if(!selectedBrandsContainer && makeAndModelSelection){
        selectedBrandsContainer = document.createElement('div');
        selectedBrandsContainer.className = 'selected-brands-container';
        const carModelLabel = makeAndModelSelection.querySelector('label');

        if (carModelLabel && carModelLabel.nextSibling) {
            makeAndModelSelection.insertBefore(selectedBrandsContainer, carModelLabel.nextSibling);
        } else {
           makeAndModelSelection.appendChild(selectedBrandsContainer);
        }
    }

    // Add thẻ xe vào trên thanh search khi click vào 1 xe trong phần pops up 
    // Brand selection
    if(modalOverlay){
        modalOverlay.addEventListener('click', function(event){
            const brandItem = event.target.closest('.brand-grid-item, .brand-list-item');
            if(brandItem){
                const brandImg = brandItem.querySelector('img');
                // Lấy brandName từ element hoặc từ data-brand-name
                const brandName = brandItem.querySelector('.brand-name')?.textContent||brandImg.alt||brandItem.dataset.brandName; 
                const brandImgSrc = brandImg.src;

                const existingBrand = selectedBrandsContainer.querySelector(`[data-brand-name="${brandName}"]`);
                if(existingBrand){
                    return;
                }

                const carTagDisplay = document.createElement('div');
                carTagDisplay.className = 'car-tag-display';
                carTagDisplay.setAttribute('data-brand-name', brandName);

                const carTagIcon = document.createElement('img');
                carTagIcon.src = brandImgSrc;
                carTagIcon.alt = brandName;
                carTagIcon.className = 'car-tag-icon';

                const carTagText = document.createElement('span');
                carTagText.className = 'car-tag-text';
                carTagText.textContent = brandName;

                const carTagRemove = document.createElement('button');
                carTagRemove.className = 'car-tag-remove';
                carTagRemove.innerHTML = '&times;';
                carTagRemove.setAttribute('aria-label', 'Remove ' + brandName);

                carTagRemove.addEventListener('click', function(e) {
                    e.stopPropagation();
                    carTagDisplay.remove();
                    // ========= GỌI LỌC KHI XÓA BRAND =========
                    filterCars();
                });

                const carTagContent = document.createElement('div');
                carTagContent.className = 'car-tag-content';
                carTagContent.appendChild(carTagText);
                
                carTagDisplay.appendChild(carTagIcon);
                carTagDisplay.appendChild(carTagContent);
                carTagDisplay.appendChild(carTagRemove);
                selectedBrandsContainer.appendChild(carTagDisplay);
                
                // ========= GỌI LỌC KHI THÊM BRAND =========
                filterCars();
            }
        });
    }

    // ========= BIẾN LƯU GIÁ TRỊ BAN ĐẦU CỦA SLIDER =========
    let initialSliderValues = {
        priceMin: 0,
        priceMax: 0,
        mileageMin: 0,
        mileageMax: 0,
        powerMin: 0,
        powerMax: 0
    };

    // Range slider initialization
    function initRangeSlider(minId, maxId, displayMinId, displayMaxId, unit = '') {
        const minSlider = document.getElementById(minId);
        const maxSlider = document.getElementById(maxId);
        const minDisplay = document.getElementById(displayMinId);
        const maxDisplay = document.getElementById(displayMaxId);
        
        if (!minSlider || !maxSlider) return;
        
        // ========= LƯU GIÁ TRỊ BAN ĐẦU =========
        if (minId === 'price-min') {
            initialSliderValues.priceMin = parseInt(minSlider.min);
            initialSliderValues.priceMax = parseInt(maxSlider.max);
            minSlider.value = minSlider.min;
            maxSlider.value = maxSlider.max;
        } else if (minId === 'mileage-min') {
            initialSliderValues.mileageMin = parseInt(minSlider.min);
            initialSliderValues.mileageMax = parseInt(maxSlider.max);
            minSlider.value = minSlider.min;
            maxSlider.value = maxSlider.max;
        } else if (minId === 'power-min') {
            initialSliderValues.powerMin = parseInt(minSlider.min);
            initialSliderValues.powerMax = parseInt(maxSlider.max);
            minSlider.value = minSlider.min;
            maxSlider.value = maxSlider.max;
        }
        
        function updateDisplay() {
            let minVal = Math.max(0, parseInt(minSlider.value));
            let maxVal = parseInt(maxSlider.value);
            
            if (minVal > maxVal) {
                minVal = maxVal;
                minSlider.value = minVal;
            }
            
            if (maxVal < minVal) {
                maxVal = minVal;
                maxSlider.value = maxVal;
            }
            
            if (unit === '$') {
                minDisplay.textContent = `$${minVal.toLocaleString('en-US')}`;
                maxDisplay.textContent = `$${maxVal.toLocaleString('en-US')}`;
            } else if (unit === 'km') {
                minDisplay.textContent = `${minVal.toLocaleString('en-US')} km`;
                maxDisplay.textContent = `${maxVal.toLocaleString('en-US')} km`;
            } else if (unit === 'HP') {
                minDisplay.textContent = `${minVal} HP`;
                maxDisplay.textContent = `${maxVal} HP`;
            }
            
            updateTrack(minSlider, maxSlider);
        }
        
        function updateTrack(minSlider, maxSlider) {
            const container = minSlider.closest('.range-slider-container');
            const track = container.querySelector('.range-track');
            if (!track) return;
            
            const min = parseInt(minSlider.min);
            const max = parseInt(minSlider.max);
            const minVal = parseInt(minSlider.value);
            const maxVal = parseInt(maxSlider.value);
            
            const minPercent = ((minVal - min) / (max - min)) * 100;
            const maxPercent = ((maxVal - min) / (max - min)) * 100; 
            
            track.style.left = minPercent + '%';
            track.style.width = (maxPercent - minPercent) + '%';
        }
        
        // ========= GỌI LỌC KHI SLIDER THAY ĐỔI =========
        minSlider.addEventListener('input', updateDisplay);
        maxSlider.addEventListener('input', updateDisplay);
        minSlider.addEventListener('change', filterCars);
        maxSlider.addEventListener('change', filterCars);
        
        updateDisplay();
    }

    initRangeSlider('price-min', 'price-max', 'price-min-display', 'price-max-display', '$');
    initRangeSlider('mileage-min', 'mileage-max', 'mileage-min-display', 'mileage-max-display', 'km');
    initRangeSlider('power-min', 'power-max', 'power-min-display', 'power-max-display', 'HP');

    // Car data processing
    let iconMap = {}; 
    let carData = []; 
    const REQUIRED_SPECS = ['Mileage', 'Year', 'Transmission', 'Fuel', 'Drivetrain', 'Power'];
    
    function flattenCarData(nestedData) {
        const flatArray = [];
        if (nestedData && nestedData.brands) {
            for (const brandKey in nestedData.brands) {
                const brand = nestedData.brands[brandKey];
                brand.models.forEach(model => {
                    const filteredSpecs = REQUIRED_SPECS.map(requiredLabel => {
                        const spec = model.specs.find(s => s.label === requiredLabel);
                        return spec || { label: requiredLabel, value: 'N/A' }; 
                    }).filter(spec => spec.value !== 'N/A');

                    flatArray.push({
                        brand: brand.name, // Giữ nguyên theo logic của bạn
                        title: model.name,
                        id: model.id,
                        type: model.type,
                        price: '$' + model.priceUSD.toLocaleString('en-US'), 
                        imageSrc: model.hero, 
                        isActive: false, 
                        location: { city: brand.name }, 
                        specs: filteredSpecs, 
                        features: model.features,
                        vehicleType: model.type || model.vehicleType || model.bodyType || model.category || model.segment || model.body || model.kind || ''
                    });
                });
            }
        }
        return flatArray;
    }


    try {
        const res1 = await fetch("../DATA/icon.json");
        if (!res1.ok) throw new Error('Không thể tải icon.json');
        iconMap = await res1.json(); 

        const res2 = await fetch("../DATA/car.json");
        if (!res2.ok) throw new Error('Không thể tải car.json');
        const nestedCarData = await res2.json(); 

        
        // Đưa Porsche vào nestedCarData trước khi làm phẳng
        try {
          const resP = await fetch("../DATA/porsche.json");
          if (resP.ok) {
            const porscheJSON = await resP.json();
            const brandKey = (porscheJSON.brand && (porscheJSON.brand.id || porscheJSON.brand.name)) || 'porsche';
            const models = (porscheJSON.cars || []).map
            (c => {
              const rnd = Math.floor(Math.random() * 121) * 100;
              const mileage = rnd.toLocaleString('en-US') + ' km';
              const year = '2024';
              let transmission = 'Automatic';
              if (c.specs && c.specs.Gear) {
                const g = String(c.specs.Gear).toLowerCase();
                transmission = (g.includes('pdk') || g.includes('tiptronic') || g.includes('automatic') || g.includes('1-speed'))
                  ? 'Automatic' : 'Manual';
              }
              let fuel = 'Gasoline';
              if (c.type === 'EV' || /BEV|Electric/i.test(c.specs?.Engine || '') || /Taycan|Electric/i.test(c.name || '')) {
                fuel = 'Electric';
              }
              const nameL = String(c.name || '').toLowerCase();
              const drivetrain = (nameL.includes('macan') || nameL.includes('cayenne')) ? 'AWD' : 'RWD';
              const power = c.specs && c.specs.Power ? c.specs.Power : 'N/A';
              
              const specs = [
                { label: 'Mileage', value: mileage },
                { label: 'Year', value: year },
                { label: 'Transmission', value: transmission },
                { label: 'Fuel', value: fuel },
                { label: 'Drivetrain', value: drivetrain },
                { label: 'Power', value: power },
              ];
              
              return {
                id: c.id,
                name: c.name,
                type: c.type,
                priceUSD: Number(c.priceUSD || 0),
                hero: c.hero || c.display,
                specs,
                features: [...(c.safety || []), ...(c.convenience || [])],
                type: c.type
              };
            });
            
            if (!nestedCarData.brands) nestedCarData.brands = {};
            nestedCarData.brands[brandKey] = { name: 'Porsche', models };
          } else {
            console.warn('porsche.json not found or cannot be loaded');
          }
        } catch (e) {
          console.error('Cannot load Porsche data', e);
        }

        carData = flattenCarData(nestedCarData);

        // Điền LOẠI XE được chọn dựa trên carData
        (function populateVehicleTypeOptionsFromCarData() {
            const sel = document.getElementById('vehicle-type-select');
            if (!sel) return;
            const types = Array.from(new Set((carData || []).map(c => (c.vehicleType || '').trim()).filter(Boolean))).sort();
            sel.innerHTML = '<option value="All">All</option>' + types.map(t => `<option value="${t}">${t}</option>`).join('');
        })();
        // Trình lắng nghe sự kiện để kích hoạt lọc khi loại thay đổi
        (function attachVehicleTypeChange() {
            const sel = document.getElementById('vehicle-type-select');
            if (sel) sel.addEventListener('change', filterCars);
        })();

        
    } catch(error) {
        console.error('Lỗi khi đọc file JSON:', error);
    }

    const carGridContainer = document.getElementById('car-grid-container');
    const itemsPerPage = 8; 
    
    function getIconForSpec(spec) {
        const labelKey = spec.label.toLowerCase().trim().replace(' ', ''); 

        if (iconMap.transmission && iconMap.transmission[spec.value]) {
            return iconMap.transmission[spec.value];
        }
        if (iconMap.fuel && iconMap.fuel[spec.value]) {
            return iconMap.fuel[spec.value];
        }
        if (iconMap.drivetrain && iconMap.drivetrain[spec.value]) {
            return iconMap.drivetrain[spec.value];
        }

        if (iconMap.default && iconMap.default[labelKey]) {
            return iconMap.default[labelKey];
        }
        
        return 'YOUR_DEFAULT_FALLBACK_ICON.png';
    }
    
    // ========= HÀM LỌC MỚI - CHỈ LỌC KHI CÓ THAY ĐỔI =========
    let filteredCarData = [];
    // Lấy tất cả dữ liệu trên thanh filter và trả về những giữ liệu ấy
    function getFilterState() {
        const selectedBrands = Array.from(selectedBrandsContainer.querySelectorAll('.car-tag-display'))
            .map(tag => tag.dataset.brandName);

        const priceMin = parseInt(document.getElementById('price-min').value);
        const priceMax = parseInt(document.getElementById('price-max').value);
        
        const carPriceToNumber = (priceString) => parseInt(priceString.replace('$', '').replace(/,/g, ''));

        const mileageMin = parseInt(document.getElementById('mileage-min').value);
        const mileageMax = parseInt(document.getElementById('mileage-max').value);

        const powerMin = parseInt(document.getElementById('power-min').value);
        const powerMax = parseInt(document.getElementById('power-max').value);
        
        // Sử dụng document.getElementById() để truy cập trực tiếp bằng ID
        const transmissionSelect = document.getElementById('transmission-select');
        const fuelSelect = document.getElementById('fuel-select');
        const typeSelect = document.getElementById('type-select');

        // Lấy giá trị được chọn (áp dụng cho đoạn code nằm trong hàm filterCars hoặc getFilterState)
        const selectedTransmission = transmissionSelect ? transmissionSelect.value : 'All';
        const selectedFuel = fuelSelect ? fuelSelect.value : 'All';
        const selectedType = typeSelect ? typeSelect.value : 'All';
        
        const selectedFeatures = Array.from(featureListContainer.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value.toLowerCase().trim());

        return {
            brands: selectedBrands,
            priceMin: priceMin,
            priceMax: priceMax,
            mileageMin: mileageMin,
            mileageMax: mileageMax,
            powerMin: powerMin,
            powerMax: powerMax,
            transmission: selectedTransmission,
            fuel: selectedFuel,
            type: selectedType,
            features: selectedFeatures,
            carPriceToNumber: carPriceToNumber
        };
    }
    // ========= HÀM LỌC CHÍNH - CHỈ LỌC KHI CÓ ĐIỀU KIỆN =========
    function filterCars() {
        // Lấy dữ liệu hiện tại trên thanh lọc
        const filters = getFilterState();
        // Lấy dữ liệu từ trong carData đê so sánh với các giá trị trên thanh filter
        filteredCarData = carData.filter(car => {
            const carBrand = car.location.city; 
            const carPrice = filters.carPriceToNumber(car.price);
            
            // 1. Lọc theo Brand - CHỈ LỌC NẾU CÓ BRAND ĐƯỢC CHỌN
            if (filters.brands.length > 0) {
                const brandMatch = filters.brands.map(b => (b || '').toLowerCase()).includes((carBrand || '').toLowerCase());
                if (!brandMatch) return false;
            }

            // 2. Lọc theo Price - CHỈ LỌC NẾU SLIDER THAY ĐỔI
            const priceChanged = filters.priceMin !== initialSliderValues.priceMin || 
                                 filters.priceMax !== initialSliderValues.priceMax;
            if (priceChanged) {
                const priceMatch = carPrice >= filters.priceMin && carPrice <= filters.priceMax;
                if (!priceMatch) return false;
            }
            
            const getSpecValue = (label) => {
                const spec = car.specs.find(s => s.label === label);
                return spec ? spec.value : 'N/A';
            };
            
            // 3. Lọc theo Mileage - CHỈ LỌC NẾU SLIDER THAY ĐỔI
            const mileageChanged = filters.mileageMin !== initialSliderValues.mileageMin || 
                                   filters.mileageMax !== initialSliderValues.mileageMax;
            if (mileageChanged) {
                const carMileageStr = getSpecValue('Mileage').replace(' km', '').replace(/,/g, '');
                const carMileage = parseInt(carMileageStr) || 0;
                const mileageMatch = carMileage >= filters.mileageMin && carMileage <= filters.mileageMax;
                if (!mileageMatch) return false;
            }
            
            // 4. Lọc theo Power - CHỈ LỌC NẾU SLIDER THAY ĐỔI
            const powerChanged = filters.powerMin !== initialSliderValues.powerMin || 
                                 filters.powerMax !== initialSliderValues.powerMax;
            if (powerChanged) {
                const carPowerStr = getSpecValue('Power').replace(' HP', '');
                const carPower = parseInt(carPowerStr) || 0;
                const powerMatch = carPower >= filters.powerMin && carPower <= filters.powerMax;
                if (!powerMatch) return false;
            }

            // 5. Lọc theo Transmission - CHỈ LỌC NẾU KHÔNG PHẢI "All"
            if (filters.transmission !== 'All') {
                const carTransmission = getSpecValue('Transmission');
                const transmissionMatch = carTransmission === filters.transmission;
                if (!transmissionMatch) return false;
            }
            
            // 6. Lọc theo Fuel - CHỈ LỌC NẾU KHÔNG PHẢI "All"
            if (filters.fuel !== 'All') {
                const carFuel = getSpecValue('Fuel');
                const fuelMatch = carFuel === filters.fuel;
                if (!fuelMatch) return false;
            }

            if (filters.type !== 'All') {
            const mycarType = car.type;
            const typeMatch = (mycarType || '').toLowerCase() === (filters.type || '').toLowerCase();
            if (!typeMatch) return false;
        }
            
            // 7. Lọc theo Features - CHỈ LỌC NẾU CÓ FEATURE ĐƯỢC CHỌN
            if (filters.features.length > 0) {
                const featureMatch = filters.features.every(requiredFeature => 
                    car.features.map(f => f.toLowerCase().trim()).includes(requiredFeature)
                );
                if (!featureMatch) return false;
            }
            
            return true;
        });

        currentPage = 1;
        updatePagination(filteredCarData.length);
        renderCarGrid(currentPage, filteredCarData);
    }

    // ========= THÊM SỰ KIỆN CHO TRANSMISSION VÀ FUEL SELECT =========
    const transmissionSelect = document.getElementById('transmission-select');
    const fuelSelect = document.getElementById('fuel-select');
    const typeSelect = document.getElementById('type-select')
    
    if (transmissionSelect) {
        transmissionSelect.addEventListener('change', filterCars);
    }
    if (fuelSelect) {
        fuelSelect.addEventListener('change', filterCars);
    }
    if(typeSelect) // Thêm lắng nghe sự kiện cho typeSelect
    {
        typeSelect.addEventListener('change', filterCars);
    }

    // ========= RENDER CAR GRID - SỬ DỤNG filteredCarData NẾU CÓ, KHÔNG THÌ DÙNG carData =========
    function renderCarGrid(page, dataToRender = null) {
        const displayData = dataToRender || carData;
        
        if (!carGridContainer || displayData.length === 0) {
            carGridContainer.innerHTML = '<p>Không tìm thấy xe phù hợp với bộ lọc.</p>';
            return;
        }

        carGridContainer.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = displayData.slice(startIndex, endIndex);

        pageData.forEach(car => {
            let specsHTML = '';
            
            car.specs.forEach(spec => {
                const iconSrc = getIconForSpec(spec);
                specsHTML += `<div class="spec-item"><img class="icon" src="${iconSrc}" alt="${spec.label}"><span>${spec.value}</span></div>`;
            });

            let featuresHTML = '';
            const maxVisibleFeatures = 4; 
            const carId = car.id; 

            if (car.features && car.features.length > 0) {
                featuresHTML += `<div class="car-tags-row" id="tags-for-car-${carId}">`; 
                
                for (let i = 0; i < car.features.length; i++) {
                    if (i < maxVisibleFeatures) {
                        featuresHTML += `<span class="car-tag">${car.features[i]}</span>`;
                    } else if (i === maxVisibleFeatures) {
                        const remainingFeatures = car.features.length - maxVisibleFeatures;
                        featuresHTML += `<div class="car-tag-more" data-car-id="${carId}"> ${remainingFeatures} more  </div>`;
                        break; 
                    }
                }
                featuresHTML += '</div>'; 
            }

            const activeClass = car.isActive ? 'active' : '';

            // CẬP NHẬT: Thêm data-id và data-brand vào car-card để truy xuất dễ dàng
            const carCardHTML = `
                <div class="car-card ${activeClass}" data-id="${car.id}" data-brand="${car.brand}">
                    <img class="car-image" src="${car.imageSrc}" alt="${car.title}">
                    <div class="car-card-content">
                        <div class = "car-card-content-header">
                            <div class = "car-card-content-title">
                                <h3 class="car-title">${car.title}</h3>
                            </div>
                            <div class="car-location">
                                <img class="icon" src="${iconMap.default.location}" alt="Location">  
                                <span>${car.location.city}</span>
                            </div>
                        </div>
                        <div class="car-specs">${specsHTML}</div>
                        ${featuresHTML}
                        <p class="car-price">${car.price}</p>
                    </div>
                </div>
            `;
            carGridContainer.innerHTML += carCardHTML;
        });
    }

    // Pagination
    let totalPages = 1;
    let currentPage = 1;
    const paginationContainer = document.querySelectorAll('.pagination');

    function updatePagination(totalItems = null) {
        const itemCount = totalItems !== null ? totalItems : carData.length;
        totalPages = Math.ceil(itemCount / itemsPerPage);
        renderPagination(totalPages, currentPage);
    }

    function renderPagination(totalPages, page) {
        if (!paginationContainer || totalPages <= 1) {
            paginationContainer.forEach(container => {
                container.innerHTML = '';
            });
            return;
        }
        
        let liTag = '';
        const prevDisabled = page === 1 ? 'disabled' : '';
        liTag += `<li class="control-prev ${prevDisabled}" data-page="${Math.max(1, page - 1)}"><a><svg class="arrow-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>Previous</a></li>`;
        
        if (totalPages > 6) {
            if (page > 2) {
                liTag += `<li data-page="1"><a>1</a></li>`;
                if (page > 3) liTag += `<li><a>...</a></li>`;
            }

            let startPage = Math.max(2, page - 1);
            let endPage = Math.min(totalPages - 1, page + 1);

            if (page === 1) endPage = Math.min(totalPages, 3);
            if (page === totalPages) startPage = Math.max(1, totalPages - 2);

            for (let i = startPage; i <= endPage; i++) {
                if (i > totalPages || i < 1) continue;
                const activeClass = (page === i) ? 'active' : '';
                liTag += `<li class="${activeClass}" data-page="${i}"><a>${i}</a></li>`;
            }

            if (page < totalPages - 1) {
                if (page < totalPages - 2) liTag += `<li><a>...</a></li>`;
                liTag += `<li data-page="${totalPages}"><a>${totalPages}</a></li>`;
            }

        } else {
            for (let i = 1; i <= totalPages; i++) {
                const activeClass = (i === page) ? 'active' : '';
                liTag += `<li class="${activeClass}" data-page="${i}"><a>${i}</a></li>`;
            }
        }
        
        const nextDisabled = page === totalPages ? 'disabled' : '';
        liTag += `<li class="control-next ${nextDisabled}" data-page="${Math.min(totalPages, page + 1)}"><a>Next<svg class="arrow-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></a></li>`;
        
        paginationContainer.forEach(container => {
            container.innerHTML = liTag;
        })
        
        paginationContainer.forEach(container => {
              const prev = container.querySelector('.control-prev');
              const next = container.querySelector('.control-next');
              if (prev) prev.classList.toggle('disabled', page === 1);
              if (next) next.classList.toggle('disabled', page === totalPages);
        });
    }
    
    if (paginationContainer.length > 0) {
        paginationContainer.forEach(paginationContainers => {
            paginationContainers.addEventListener('click', function(e) {
                e.preventDefault();
                const targetLi = e.target.closest('li');
                if (!targetLi || targetLi.classList.contains('disabled')) return;
                
                let newPage = currentPage;
                const targetPage = targetLi.getAttribute('data-page');

                if (targetPage) {
                    newPage = parseInt(targetPage);
                } else {
                     const linkText = targetLi.textContent.trim();
                     if (!isNaN(parseInt(linkText))) {
                         newPage = parseInt(linkText);
                     } else {
                         return; 
                     }
                }

                if (newPage !== currentPage && !isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
                    currentPage = newPage;
                    renderPagination(totalPages, currentPage);
                    // ========= SỬ DỤNG filteredCarData NẾU CÓ LỌC =========
                    const dataToDisplay = filteredCarData.length > 0 ? filteredCarData : carData;
                    renderCarGrid(currentPage, dataToDisplay);
                    if (carGridContainer) carGridContainer.scrollIntoView({ behavior: 'smooth' }); 
                }
            });
        });
    }

    // ========= HIỂN THỊ BAN ĐẦU - TẤT CẢ XE =========
    updatePagination();
    renderCarGrid(currentPage);

    // Feature expansion on car cards
    if (carGridContainer) {
        // CẬP NHẬT: Tích hợp logic chuyển trang vào lắng nghe sự kiện trên carGridContainer
        carGridContainer.addEventListener('click', function(event) {
            const target = event.target;
            
            // Logic mở rộng tính năng (giữ nguyên)
            if (target.classList.contains('car-tag-more')) {
                event.preventDefault(); 
                
                const carId = target.getAttribute('data-car-id');
                const tagsContainer = document.getElementById('tags-for-car-' + carId);
                
                const currentData = filteredCarData.length > 0 ? filteredCarData : carData;
                const carDataEntry = currentData.find(car => car.id === carId); 
                
                if (carDataEntry && tagsContainer) {
                    let allFeaturesHTML = '';
                    carDataEntry.features.forEach(feature => {
                        allFeaturesHTML += `<span class="car-tag">${feature}</span>`;
                    });
                    
                    tagsContainer.innerHTML = allFeaturesHTML;
                }
            }
            
            // Logic chuyển trang (ĐÃ SỬA CHỮA)
            const carCard = target.closest('.car-card');
            if (carCard && !target.classList.contains('car-tag-more')) {
                const carId = carCard.getAttribute('data-id');
                const carBrand = carCard.getAttribute('data-brand'); // Lấy brand từ data-attribute

                if (carId && carBrand) {
                    const targetUrl = `car.html?brand=${encodeURIComponent(carBrand.toLowerCase())}&id=${encodeURIComponent(carId)}`;
                    // CHỈ điều hướng MỘT LẦN đến URL của chiếc xe đã click
                    window.location.href = targetUrl;
                }
            }
        });
    }

});

// ====== Lazy loading cho tất cả ảnh trên trang ======
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    // Nếu ảnh chưa được set loading trong HTML thì cho lazy
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
  });
});
