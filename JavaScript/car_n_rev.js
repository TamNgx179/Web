document.addEventListener('DOMContentLoaded', async function() {

    //  code mở rộng ra thêm feature để tìm kiếm 
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

// feature is already defined as:
/*
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
*/

    const intialVisibleCount = 7;
    const cardPerPage = 7;
    let currentCarPage = intialVisibleCount;

    const featureListContainer = document.querySelector(".feature-list");
    const moreFeatureButton = document.querySelector(".more-feature");
    const featureSearchInput = document.querySelector(".feature-search-input"); // Get the search input

    featureListContainer.innerHTML = '';

    const featureItems = [];

    // --- ============================================================Initial Feature Rendering =======================================================================================---
    feature.forEach((featureName, index) => {
        const safeId = 'feature' + (index + 1);

        const itemDiv = document.createElement('div');
        itemDiv.className = 'checkbox-item';
        // Store the original feature name on the itemDiv for easier searching
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

        // Hide initially if beyond the visible count
        if(index >= currentCarPage)
        {
            itemDiv.style.display = "none";
        } else {
             itemDiv.style.display = "flex"; // Ensure initially visible items are displayed
        }

        featureListContainer.appendChild(itemDiv);
        featureItems.push(itemDiv);
    });
    
    // Hide 'More feature' button if all features are initially visible
    if (featureItems.length <= intialVisibleCount) {
        moreFeatureButton.style.display = 'none';
    }


    // --- ================================================="More Feature" Button Click Handler=============================================================================== ---
    moreFeatureButton.addEventListener('click', function(event){
        event.preventDefault();
        
        // Only load more if currently not searching
        if (featureSearchInput.value.trim() === '') {
            const cardTotalNumber = featureItems.length;
            const newCardPage = currentCarPage + cardPerPage;

            let visibleCount = 0;
            let lastVisibleIndex = -1;

            // Find the last currently visible index in the original list order
            for (let i = 0; i < cardTotalNumber; i++) {
                if (featureItems[i].style.display !== 'none') {
                    lastVisibleIndex = i;
                    visibleCount++;
                }
            }
            
            // Start showing from the index after the last visible one
            let startIndex = lastVisibleIndex + 1;
            let itemsShown = 0;

            for( let i = startIndex; i < cardTotalNumber && itemsShown < cardPerPage; i++)
            {
                // Only show if the item is not currently hidden by the search filter (which it shouldn't be 
                // if the search input is empty, but good practice)
                if (featureItems[i].dataset.featureName.includes(featureSearchInput.value.trim().toLowerCase())) {
                     featureItems[i].style.display = 'flex';
                     itemsShown++;
                }
               
            }

             // Recalculate currentCarPage based on the total number of items now visible
             // (This logic needs to be simplified for the 'More' button to work reliably 
             // without recalculating the original index after filtering. 
             // A simpler approach for *non-filtered* display is better)
             
            // Revert to original simple logic for demonstration assuming *no search* is active when clicked:
            currentCarPage = newCardPage;


            // Hide 'More feature' if all features are now visible
            if (currentCarPage >= cardTotalNumber)
            {
                moreFeatureButton.style.display = 'none';
            }
        }
    });

    // --- ===========================================================Feature Search Functionality ================================================================================---
    featureSearchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        let visibleCount = 0;

        featureItems.forEach(item => {
            const featureName = item.dataset.featureName;
            
            if (featureName.includes(searchTerm)) {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Toggle the 'More feature' button visibility
        if (searchTerm === '') {
            // If the search is cleared, revert to the initial display logic
            let totalItems = featureItems.length;
            
            for (let i = 0; i < totalItems; i++) {
                if (i < currentCarPage) {
                    featureItems[i].style.display = 'flex';
                } else {
                    featureItems[i].style.display = 'none';
                }
            }
            
            if (currentCarPage < totalItems) {
                moreFeatureButton.style.display = 'block'; // Show if more features exist
            } else {
                moreFeatureButton.style.display = 'none'; // Hide if all features are visible
            }

        } else {
            // When searching, all matching items are shown, so hide the 'More feature' button
            moreFeatureButton.style.display = 'none';
        }
    });

    //  ===============================================Phần pop up khi bấm vào search for brand của từng hãng xe============================================================================
    // ... (Phần LOGIC CHO MODAL giữ nguyên không thay đổi) ...
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

    const gridContainer = document.getElementById('brand-grid-container');
    const listContainer = document.getElementById('brand-list-container');

    if (gridContainer && mostSearchedBrands.length > 0) {
        mostSearchedBrands.forEach(brand => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'brand-grid-item';
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

    // ================================================= Bấm vào 1 brand xe sẽ hiện ra các model của hãng xe đó
    const carIconClicking = document.querySelector(".brand-logo")

    carIconClicking.addEventListener("click", function(){


    })

    // ==========================================================
    // LOGIC TẢI DỮ LIỆU VÀ CHUẨN HÓA (ĐÃ SỬA DỤNG ID)
    // ==========================================================
    
    let iconMap = {}; 
    let carData = []; 
    const REQUIRED_SPECS = ['Mileage', 'Year', 'Transmission', 'Fuel', 'Drivetrain', 'Power'];
    
    // Hàm chuyển đổi cấu trúc JSON lồng thành mảng phẳng
    function flattenCarData(nestedData) {
        const flatArray = [];
        if (nestedData && nestedData.brands) {
            for (const brandKey in nestedData.brands) {
                const brand = nestedData.brands[brandKey];
                brand.models.forEach(model => {
                    
                    // LỌC VÀ SẮP XẾP CÁC SPECS THEO THỨ TỰ CỐ ĐỊNH
                    const filteredSpecs = REQUIRED_SPECS.map(requiredLabel => {
                        const spec = model.specs.find(s => s.label === requiredLabel);
                        return spec || { label: requiredLabel, value: 'N/A' }; 
                    }).filter(spec => spec.value !== 'N/A');

                    flatArray.push({
                        title: model.name,
                        id: model.id, // <<< THÊM ID DUY NHẤT VÀO DỮ LIỆU
                        price: '$' + model.priceUSD.toLocaleString('en-US'), 
                        imageSrc: model.hero, 
                        isActive: false, 
                        location: { city: brand.name }, 
                        specs: filteredSpecs, 
                        features: model.features
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

        carData = flattenCarData(nestedCarData);

    } catch(error) {
        console.error('Lỗi khi đọc file JSON:', error);
    }


    // ==========================================================
    // LOGIC HIỂN THỊ XE VÀ PHÂN TRANG (ĐÃ SỬA DỤNG ID)
    // ==========================================================
    
    const carGridContainer = document.getElementById('car-grid-container');
    const itemsPerPage = 8; 

    function getIconForSpec(spec) {
        const labelKey = spec.label.toLowerCase().trim().replace(' ', ''); 

        // Ưu tiên kiểm tra các nhóm cố định
        if (iconMap.transmission && iconMap.transmission[spec.value]) {
            return iconMap.transmission[spec.value];
        }
        if (iconMap.fuel && iconMap.fuel[spec.value]) {
            return iconMap.fuel[spec.value];
        }
        if (iconMap.drivetrain && iconMap.drivetrain[spec.value]) {
            return iconMap.drivetrain[spec.value];
        }

        // Kiểm tra trong default map
        if (iconMap.default && iconMap.default[labelKey]) {
            return iconMap.default[labelKey];
        }
        
        return 'YOUR_DEFAULT_FALLBACK_ICON.png';
    }

    function renderCarGrid(page) {
        if (!carGridContainer || carData.length === 0) {
            carGridContainer.innerHTML = '<p>Không tìm thấy dữ liệu xe.</p>';
            return;
        }

        carGridContainer.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = carData.slice(startIndex, endIndex);

        pageData.forEach(car => {
            let specsHTML = '';
            
            // Lấy TẤT CẢ specs đã được lọc trong hàm flattenCarData (tối đa 6)
            car.specs.forEach(spec => {
                const iconSrc = getIconForSpec(spec);
                specsHTML += `<div class="spec-item"><img class="icon" src="${iconSrc}" alt="${spec.label}"><span>${spec.value}</span></div>`;
            });

            // Logic features và nút "see more"
            let featuresHTML = '';
            const maxVisibleFeatures = 4; 
            
            // <<< THAY ĐỔI QUAN TRỌNG: DÙNG car.id CÓ SẴN >>>
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

            const carCardHTML = `
                <div class="car-card ${activeClass}">
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

    let totalPages = 1;
    let currentPage = 1;
    const paginationContainer = document.querySelectorAll('.pagination');

    function updatePagination() {
        totalPages = Math.ceil(carData.length / itemsPerPage);
        renderPagination(totalPages, currentPage);
    }


    function renderPagination(totalPages, page) {
        if (!paginationContainer || totalPages <= 1) {
            paginationContainer.forEach(container => {
                container.innerHTML = '';
            });
            return;
        };
        
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
                renderCarGrid(currentPage);
                if (carGridContainer) carGridContainer.scrollIntoView({ behavior: 'smooth' }); 
            }
        });
        });
    }

    updatePagination();
    renderCarGrid(currentPage);

    
    // <<< THAY ĐỔI QUAN TRỌNG: LOGIC NÚT "SEE MORE" ĐÃ SỬA DỤNG ID >>>
    if (carGridContainer) {
        carGridContainer.addEventListener('click', function(event) {
            const target = event.target;
            
            if (target.classList.contains('car-tag-more')) {
                event.preventDefault(); 
                
                const carId = target.getAttribute('data-car-id');
                const tagsContainer = document.getElementById('tags-for-car-' + carId);
                
                // TÌM KIẾM DỮ LIỆU BẰNG ID ĐÃ LƯU (car.id)
                const carDataEntry = carData.find(car => car.id === carId); 
                
                if (carDataEntry && tagsContainer) {
                    let allFeaturesHTML = '';
                    carDataEntry.features.forEach(feature => {
                        allFeaturesHTML += `<span class="car-tag">${feature}</span>`;
                    });
                    
                    tagsContainer.innerHTML = allFeaturesHTML;
                }
            }
        });
    }

    // ============================================================ Search xe theo các feature,mileage,price,year, 

}); // Đóng sự kiện DOMContentLoaded