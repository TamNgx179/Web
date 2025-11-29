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

//Hàm scroll tới phần about saigonspeed
function scrollToAbout() {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
        aboutSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const learnMoreBtn = document.querySelector(".button-review .btn");

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener("click", scrollToAbout);
    }
});

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


  document.addEventListener('DOMContentLoaded', () => {
            const toggles = document.querySelectorAll('.footer-toggle');
            toggles.forEach(toggle => {
                toggle.onclick = () => {
                    const list = toggle.nextElementSibling;
                    if (list.style.display === 'block') {
                        list.style.display = 'none';
                        toggle.querySelector('span').textContent = '▼';
                    } else {
                        list.style.display = 'block';
                        toggle.querySelector('span').textContent = '▲';
                    }
                };
            });
        });


        window.addEventListener("scroll", function() {
            const elements = document.querySelectorAll(".timeline-header");
            const windowHeight = window.innerHeight;
            const revealPoint = 100;

            elements.forEach(el => {
                const revealTop = el.getBoundingClientRect().top;
                if (revealTop < windowHeight - revealPoint) {
                el.classList.add("active");
                } else {
                el.classList.remove("active");
                }
            });
        });

        function revealAboutUs() {
            const elements = document.querySelectorAll(".about-us-header, .about-us-text");
            const windowHeight = window.innerHeight;
            const revealPoint = 100;

            elements.forEach(el => {
                const revealTop = el.getBoundingClientRect().top;
                if (revealTop < windowHeight - revealPoint) {
                el.classList.add("active");
                } else {
                el.classList.remove("active");
                }
            });
        }

        window.addEventListener("scroll", revealAboutUs);
        window.addEventListener("load", revealAboutUs);



            
        // Lưu trữ dữ liệu: Một đối tượng JavaScript chứa thông tin đại lý.
        // Có thể mở rộng dễ dàng. Chỉ cần thêm khóa mới cho vùng mới.
        const storeData = {
    hcm: {
        name: 'TP.HCM',
        region: 'South',
        locations: [
            {
                name: 'AutoDealer Sài Gòn',
                rating: 4.9,
                address: '789 Nguyễn Huệ, Quận 1, TP.HCM',
                phone: '+84 28 3345 6789',
                hours: '8:00 - 19:00',
                services: ['sales', 'service', 'insurance']
            },
            {
                name: 'AutoHub Thủ Đức',
                rating: 4.7,
                address: '123 Võ Văn Ngân, TP. Thủ Đức',
                phone: '+84 28 9876 5432',
                hours: '8:30 - 19:30',
                services: ['sales', 'service']
            },
            {
                name: 'CarCenter Quận 7',
                rating: 4.8,
                address: '456 Nguyễn Thị Thập, Quận 7',
                phone: '+84 28 1122 3344',
                hours: '8:00 - 18:00',
                services: ['sales', 'insurance', 'parts']
            },
            {
                name: 'Prestige Motors Bình Thạnh',
                rating: 4.9,
                address: '99 Xô Viết Nghệ Tĩnh, Q. Bình Thạnh',
                phone: '+84 28 5566 7788',
                hours: '9:00 - 20:00',
                services: ['luxury sales', 'certified service']
            },
            {
                name: 'CityAuto Gò Vấp',
                rating: 4.6,
                address: '222 Quang Trung, Q. Gò Vấp, TP.HCM',
                phone: '+84 28 2233 4455',
                hours: '8:00 - 18:30',
                services: ['sales', 'service', 'insurance']
            }
        ]
    },
    hanoi: {
        name: 'Hà Nội',
        region: 'North',
        locations: [
            {
                name: 'Capital Cars Hà Nội',
                rating: 4.8,
                address: '55 Tràng Tiền, Hoàn Kiếm, Hà Nội',
                phone: '+84 24 1234 5678',
                hours: '8:00 - 19:00',
                services: ['sales', 'service']
            },
            {
                name: 'Westlake Auto',
                rating: 4.6,
                address: '210 Võ Chí Công, Tây Hồ, Hà Nội',
                phone: '+84 24 8765 4321',
                hours: '8:30 - 18:30',
                services: ['sales', 'parts', 'insurance']
            },
            {
                name: 'Royal Motors Hà Đông',
                rating: 4.7,
                address: '12 Tố Hữu, Hà Đông, Hà Nội',
                phone: '+84 24 6677 8899',
                hours: '9:00 - 19:00',
                services: ['sales', 'service', 'insurance']
            },
            {
                name: 'AutoElite Cầu Giấy',
                rating: 4.9,
                address: '19 Duy Tân, Cầu Giấy, Hà Nội',
                phone: '+84 24 2222 1111',
                hours: '8:30 - 20:00',
                services: ['luxury sales', 'certified service']
            }
        ]
    },
    danang: {
        name: 'Đà Nẵng',
        region: 'Central',
        locations: [
            {
                name: 'Dragon Bridge Motors',
                rating: 4.9,
                address: '02 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
                phone: '+84 236 9999 8888',
                hours: '8:00 - 18:00',
                services: ['sales', 'service', 'insurance']
            },
            {
                name: 'AutoZone Đà Nẵng',
                rating: 4.8,
                address: '45 Lê Duẩn, Hải Châu, Đà Nẵng',
                phone: '+84 236 7788 3344',
                hours: '8:00 - 18:30',
                services: ['sales', 'service']
            },
            {
                name: 'MyKhe Motors',
                rating: 4.7,
                address: '88 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng',
                phone: '+84 236 4455 6677',
                hours: '9:00 - 19:00',
                services: ['sales', 'insurance']
            }
        ]
    },
    haiphong: {
        name: 'Hải Phòng',
        region: 'North',
        locations: [
            {
                name: 'Harbor Motors',
                rating: 4.8,
                address: '15 Trần Phú, Ngô Quyền, Hải Phòng',
                phone: '+84 225 9988 7766',
                hours: '8:00 - 19:00',
                services: ['sales', 'service']
            },
            {
                name: 'AutoPort Lê Chân',
                rating: 4.7,
                address: '55 Tô Hiệu, Lê Chân, Hải Phòng',
                phone: '+84 225 3344 2211',
                hours: '8:30 - 18:30',
                services: ['sales', 'insurance']
            },
            {
                name: 'Prestige Auto Kiến An',
                rating: 4.9,
                address: '101 Nguyễn Đức Cảnh, Kiến An, Hải Phòng',
                phone: '+84 225 6677 1122',
                hours: '9:00 - 19:00',
                services: ['luxury sales', 'certified service']
            }
        ]
    },
    cantho: {
        name: 'Cần Thơ',
        region: 'South',
        locations: [
            {
                name: 'Mekong Auto Center',
                rating: 4.8,
                address: '23 Hòa Bình, Ninh Kiều, Cần Thơ',
                phone: '+84 292 3344 5566',
                hours: '8:00 - 18:00',
                services: ['sales', 'service']
            },
            {
                name: 'Delta Motors',
                rating: 4.6,
                address: '17 Đường 3/2, Ninh Kiều, Cần Thơ',
                phone: '+84 292 7788 9900',
                hours: '8:30 - 19:00',
                services: ['sales', 'insurance', 'parts']
            },
            {
                name: 'AutoRiver Cần Thơ',
                rating: 4.7,
                address: '90 Nguyễn Văn Cừ, An Khánh, Cần Thơ',
                phone: '+84 292 1122 3344',
                hours: '8:00 - 18:30',
                services: ['sales', 'service']
            }
        ]
    },
    binhduong: {
        name: 'Bình Dương',
        region: 'South',
        locations: [
            {
                name: 'Becamex Auto',
                rating: 4.8,
                address: '230 Đại lộ Bình Dương, Thủ Dầu Một',
                phone: '+84 274 667 7889',
                hours: '8:00 - 19:00',
                services: ['sales', 'service', 'insurance']
            },
            {
                name: 'Dĩ An AutoHub',
                rating: 4.7,
                address: '1/1 Nguyễn An Ninh, Dĩ An',
                phone: '+84 274 223 3446',
                hours: '8:00 - 18:30',
                services: ['sales', 'service', 'parts']
            },
            {
                name: 'Thuận An Motors',
                rating: 4.6,
                address: '45 QL13, Thuận An',
                phone: '+84 274 998 8770',
                hours: '8:30 - 19:00',
                services: ['sales', 'service']
            }
        ]
    },
    dongnai: {
        name: 'Đồng Nai',
        region: 'South',
        locations: [
            {
                name: 'DongNai AutoMall',
                rating: 4.7,
                address: '12 Phạm Văn Thuận, Biên Hòa',
                phone: '+84 251 3344 5566',
                hours: '8:00 - 18:00',
                services: ['sales', 'service', 'insurance']
            },
            {
                name: 'CityDrive Biên Hòa',
                rating: 4.8,
                address: '88 Đồng Khởi, Biên Hòa',
                phone: '+84 251 6677 8899',
                hours: '8:30 - 19:00',
                services: ['sales', 'service']
            },
            {
                name: 'AutoExpress Long Thành',
                rating: 4.6,
                address: '25 QL51, Long Thành',
                phone: '+84 251 7788 9900',
                hours: '8:00 - 18:30',
                services: ['sales', 'parts']
            }
        ]
    },
    khanhhoa: {
        name: 'Khánh Hòa',
        region: 'Central',
        locations: [
            {
                name: 'Coastal Motors Nha Trang',
                rating: 4.8,
                address: '21 Trần Phú, TP. Nha Trang',
                phone: '+84 258 5566 7788',
                hours: '8:00 - 18:00',
                services: ['sales', 'service', 'insurance']
            },
            {
                name: 'SunAuto Cam Ranh',
                rating: 4.7,
                address: '77 Lê Thánh Tôn, TP. Nha Trang',
                phone: '+84 258 2233 4455',
                hours: '8:30 - 18:30',
                services: ['sales', 'parts']
            },
            {
                name: 'OceanCar Plaza',
                rating: 4.9,
                address: '02 Phạm Văn Đồng, TP. Nha Trang',
                phone: '+84 258 6677 8899',
                hours: '9:00 - 19:00',
                services: ['luxury sales', 'certified service']
            }
        ]
    },
    quangninh: {
        name: 'Quảng Ninh',
        region: 'North',
        locations: [
            {
                name: 'Hạ Long Cars',
                rating: 4.9,
                address: '22 Trần Hưng Đạo, Hạ Long',
                phone: '+84 203 987 6543',
                hours: '8:00 - 19:00',
                services: ['luxury sales', 'service', 'insurance']
            },
            {
                name: 'AutoBãi Cháy',
                rating: 4.7,
                address: '100 Cái Dăm, Bãi Cháy, Hạ Long',
                phone: '+84 203 112 2334',
                hours: '8:00 - 18:00',
                services: ['sales', 'service']
            },
            {
                name: 'Cẩm Phả Motors',
                rating: 4.6,
                address: '33 Trần Phú, Cẩm Phả',
                phone: '+84 203 778 8990',
                hours: '8:30 - 18:30',
                services: ['sales', 'parts', 'insurance']
            }
        ]
    },
    thanhhoa: {
        name: 'Thanh Hóa',
        region: 'North',
        locations: [
            {
                name: 'Thanh Hóa Auto',
                rating: 4.6,
                address: '301 Lê Lợi, TP. Thanh Hóa',
                phone: '+84 237 334 5678',
                hours: '8:00 - 18:00',
                services: ['sales', 'service', 'insurance']
            },
            {
                name: 'Sầm Sơn Motors',
                rating: 4.8,
                address: '77 Nguyễn Du, Sầm Sơn',
                phone: '+84 237 889 9001',
                hours: '8:30 - 18:30',
                services: ['sales', 'parts']
            },
            {
                name: 'Lam Sơn Auto',
                rating: 4.7,
                address: '12 Đại lộ Lê Lợi, TP. Thanh Hóa',
                phone: '+84 237 112 2334',
                hours: '8:00 - 19:00',
                services: ['sales', 'service']
            }
        ]
    },
    nghean: {
        name: 'Nghệ An',
        region: 'Central',
        locations: [
            {
                name: 'AutoCenter Vinh',
                rating: 4.8,
                address: '15 Quang Trung, TP. Vinh',
                phone: '+84 238 123 9876',
                hours: '8:00 - 19:00',
                services: ['sales', 'service', 'parts']
            },
            {
                name: 'Cửa Lò Motors',
                rating: 4.7,
                address: '29 Bình Minh, Cửa Lò',
                phone: '+84 238 654 3210',
                hours: '8:30 - 18:00',
                services: ['sales', 'insurance']
            },
            {
                name: 'Prestige Auto Vinh',
                rating: 4.9,
                address: '100 Lê Lợi, TP. Vinh',
                phone: '+84 238 222 5555',
                hours: '9:00 - 20:00',
                services: ['luxury sales', 'certified service']
            }
        ]
    },
    hue: {
        name: 'Thừa Thiên Huế',
        region: 'Central',
        locations: [
            {
                name: 'Imperial Auto Huế',
                rating: 4.8,
                address: '66 Lê Lợi, TP. Huế',
                phone: '+84 234 2233 5566',
                hours: '8:00 - 18:00',
                services: ['sales', 'service']
            },
            {
                name: 'Perfume River Motors',
                rating: 4.7,
                address: '12 Nguyễn Huệ, TP. Huế',
                phone: '+84 234 7788 9900',
                hours: '8:30 - 18:30',
                services: ['sales', 'insurance']
            },
            {
                name: 'RoyalCar Huế',
                rating: 4.9,
                address: '101 Hùng Vương, TP. Huế',
                phone: '+84 234 1122 3344',
                hours: '9:00 - 19:00',
                services: ['luxury sales', 'service']
            }
        ]
    },
    vungtau: {
        name: 'Bà Rịa - Vũng Tàu',
        region: 'South',
        locations: [
            {
                name: 'Coastline Motors',
                rating: 4.8,
                address: '10 Lê Lợi, TP. Vũng Tàu',
                phone: '+84 254 3344 5566',
                hours: '8:00 - 18:00',
                services: ['sales', 'service']
            },
            {
                name: 'BlueOcean Auto',
                rating: 4.7,
                address: '77 Trương Công Định, TP. Vũng Tàu',
                phone: '+84 254 6677 8899',
                hours: '8:30 - 19:00',
                services: ['sales', 'insurance']
            },
            {
                name: 'Prestige Drive Vũng Tàu',
                rating: 4.9,
                address: '02 Thùy Vân, TP. Vũng Tàu',
                phone: '+84 254 4455 6677',
                hours: '9:00 - 19:00',
                services: ['luxury sales', 'certified service']
            }
        ]
    },
    binhdinh: {
        name: 'Bình Định',
        region: 'Central',
        locations: [
            {
                name: 'Seaside Auto Quy Nhơn',
                rating: 4.8,
                address: '11 Nguyễn Tất Thành, TP. Quy Nhơn',
                phone: '+84 256 3344 5566',
                hours: '8:00 - 18:00',
                services: ['sales', 'service']
            },
            {
                name: 'BinhDinh Motors',
                rating: 4.7,
                address: '25 Lê Hồng Phong, Quy Nhơn',
                phone: '+84 256 6677 8899',
                hours: '8:30 - 18:30',
                services: ['sales', 'parts']
            },
            {
                name: 'CentralCar Quy Nhơn',
                rating: 4.9,
                address: '89 Trần Phú, Quy Nhơn',
                phone: '+84 256 2233 4455',
                hours: '9:00 - 19:00',
                services: ['sales', 'insurance', 'service']
            }
        ]
    },
    bacninh: {
        name: 'Bắc Ninh',
        region: 'North',
        locations: [
            {
                name: 'Kinh Bắc Auto',
                rating: 4.8,
                address: '1 Lý Thái Tổ, TP. Bắc Ninh',
                phone: '+84 222 123 4567',
                hours: '8:00 - 18:00',
                services: ['sales', 'service', 'parts']
            },
            {
                name: 'Yên Phong Motors',
                rating: 4.7,
                address: 'KCN Yên Phong, Bắc Ninh',
                phone: '+84 222 765 4321',
                hours: '8:30 - 18:30',
                services: ['sales', 'insurance']
            },
            {
                name: 'Auto Từ Sơn',
                rating: 4.7,
                address: '55 Trần Phú, Từ Sơn',
                phone: '+84 222 333 4444',
                hours: '8:00 - 19:00',
                services: ['sales', 'service']
            }
        ]
    },
    lamdong: {
        name: 'Lâm Đồng',
        region: 'Central',
        locations: [
            {
                name: 'Đà Lạt Motors',
                rating: 4.9,
                address: '10 Phan Đình Phùng, Đà Lạt',
                phone: '+84 263 223 3445',
                hours: '8:30 - 18:30',
                services: ['luxury sales', 'certified service']
            },
            {
                name: 'Auto Bảo Lộc',
                rating: 4.6,
                address: '55 Trần Phú, Bảo Lộc',
                phone: '+84 263 778 8990',
                hours: '8:00 - 18:00',
                services: ['sales', 'service']
            },
            {
                name: 'Highland Auto Center',
                rating: 4.7,
                address: '200 Hùng Vương, Đà Lạt',
                phone: '+84 263 111 2222',
                hours: '8:00 - 19:00',
                services: ['sales', 'service', 'insurance']
            }
        ]
    },
    vinhphuc: {
        name: 'Vĩnh Phúc',
        region: 'North',
        locations: [
            {
                name: 'Vĩnh Yên Auto',
                rating: 4.7,
                address: '50 Mê Linh, TP. Vĩnh Yên',
                phone: '+84 211 112 3344',
                hours: '8:00 - 18:00',
                services: ['sales', 'service']
            },
            {
                name: 'Phúc Yên Motors',
                rating: 4.9,
                address: '12 Hai Bà Trưng, Phúc Yên',
                phone: '+84 211 556 7788',
                hours: '8:30 - 19:00',
                services: ['sales', 'service', 'insurance']
            },
            {
                name: 'Tam Đảo Auto',
                rating: 4.8,
                address: 'Khu du lịch Tam Đảo',
                phone: '+84 211 998 8776',
                hours: '9:00 - 17:00',
                services: ['luxury sales', 'service']
            }
        ]
    },
    daklak: {
        name: 'Đắk Lắk',
        region: 'Central',
        locations: [
            {
                name: 'Highlands Auto',
                rating: 4.7,
                address: '99 Nguyễn Tất Thành, Buôn Ma Thuột',
                phone: '+84 262 998 8776',
                hours: '8:00 - 18:00',
                services: ['sales', 'service', 'parts']
            },
            {
                name: 'Buôn Ma Thuột Cars',
                rating: 4.8,
                address: '12 Lê Duẩn, Buôn Ma Thuột',
                phone: '+84 262 112 2335',
                hours: '8:30 - 18:30',
                services: ['sales', 'service', 'insurance']
            },
            {
                name: 'Central Highlands Motors',
                rating: 4.6,
                address: '50 Y Jut, Buôn Ma Thuột',
                phone: '+84 262 334 4556',
                hours: '8:00 - 18:00',
                services: ['sales', 'service']
            }
        ]
    },
    kiengiang: {
        name: 'Kiên Giang',
        region: 'South',
        locations: [
            {
                name: 'Phú Quốc Motors',
                rating: 4.9,
                address: '120 Trần Hưng Đạo, Dương Đông, Phú Quốc',
                phone: '+84 297 112 2339',
                hours: '9:00 - 19:00',
                services: ['luxury sales', 'service']
            },
            {
                name: 'Rạch Giá Auto',
                rating: 4.7,
                address: '33 Nguyễn Trung Trực, Rạch Giá',
                phone: '+84 297 887 7665',
                hours: '8:00 - 18:00',
                services: ['sales', 'service', 'insurance']
            },
            {
                name: 'Hà Tiên AutoHub',
                rating: 4.6,
                address: '5 Mạc Công Tử, Hà Tiên',
                phone: '+84 297 223 3448',
                hours: '8:30 - 18:00',
                services: ['sales', 'service']
            }
        ]
    },
    longan: {
        name: 'Long An',
        region: 'South',
        locations: [
            {
                name: 'Tân An Auto',
                rating: 4.7,
                address: '15 Hùng Vương, TP. Tân An',
                phone: '+84 272 556 6778',
                hours: '8:00 - 18:00',
                services: ['sales', 'service', 'parts']
            },
            {
                name: 'Bến Lức Cars',
                rating: 4.6,
                address: '88 QL1A, Bến Lức',
                phone: '+84 272 223 3445',
                hours: '8:30 - 18:30',
                services: ['sales', 'service']
            },
            {
                name: 'Đức Hòa Auto Center',
                rating: 4.8,
                address: 'KCN Đức Hòa, Long An',
                phone: '+84 272 998 8771',
                hours: '8:00 - 19:00',
                services: ['sales', 'service', 'insurance']
            }
        ]
    }
};


        // Tham chiếu phần tử DOM
        const mapPaths = document.querySelectorAll('.map-svg path');
        const regionNameEl = document.getElementById('region-name');
        const locationCountEl = document.getElementById('location-count');
        const storeListEl = document.getElementById('store-list');

        // Chuẩn hoá chuỗi (bỏ dấu, lower case) để tìm kiếm dễ hơn
        function normalizeText(str) {
            return str
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .trim();
        }

        // Danh sách tỉnh/thành có showroom (từ storeData)
        const provincesWithStore = Object.entries(storeData).map(([id, region]) => ({
            id,
            name: region.name
        }));

        // Tô màu nhẹ cho các tỉnh có showroom
        mapPaths.forEach(path => {
            const regionId = path.getAttribute('name');
            if (!regionId) return;

            if (storeData[regionId]) {
                path.classList.add('has-store');
                return;
            }

            // Trường hợp name trên SVG khác key storeData (dùng normalize để so)
            const normalizedName = normalizeText(regionId);
            const match = provincesWithStore.some(p => normalizeText(p.name) === normalizedName);
            if (match) {
                path.classList.add('has-store');
            }
        });



        // Chức năng cập nhật sidebar với thông tin cửa hàng
        function updateSidebar(regionId) {
            const regionData = storeData[regionId];

            // Xóa những kết quả phía trước
            storeListEl.innerHTML = '';

            if (regionData && regionData.locations.length > 0) {
                // Cập nhật nội dung header
                regionNameEl.textContent = regionData.name;
                locationCountEl.textContent = `${regionData.region} ・ Showing ${regionData.locations.length} locations`;

                // Tạo và thêm thẻ cửa hàng
                regionData.locations.forEach(store => {
                    // Tạo danh sách các dịch vụ được phân tách bằng dấu phẩy
                    const servicesHTML = store.services.map(service => `<span>${service}</span>`).join('');
                    
                    const storeCardHTML = `
                        <div class="store-card">

                            <div class="card-header">
                                <h3>${store.name}</h3>
                                <span class="rating">⭐ ${store.rating}</span>
                            </div>
                            
                            <div class="details">
                                <p>📍 ${store.address}</p>
                                <p>📞 ${store.phone}</p>
                                <p>🕘 ${store.hours}</p>
                            </div>

                            <hr>
                            <div class="tservices">
                                ${servicesHTML}
                            </div>

                        </div>
                    `;
                    storeListEl.innerHTML += storeCardHTML;
                });

            } else {
                // Xử lý trường hợp không có dữ liệu
                regionNameEl.textContent = 'No Data Available';
                locationCountEl.textContent = 'Please select another region.';
                storeListEl.innerHTML = '<p class="initial-message">Sorry, no dealerships found here.</p>';
            }
        }

// Thêm trình lắng nghe sự kiện nhấp chuột vào từng đường dẫn bản đồ
// Đảm bảo không kéo di chuyển các hình dạng
mapPaths.forEach(p => {
  if (p && p.style) p.style.userSelect = 'none';
  p.addEventListener('dragstart', e => e.preventDefault());
});

mapPaths.forEach(path => {
            path.addEventListener('click', (event) => {
                // Bỏ class 'active' khỏi tất cả path
                mapPaths.forEach(p => p.classList.remove('active'));
                
                // Thêm class 'active' cho path được click
                const currentPath = event.currentTarget;
                currentPath.classList.add('active');

                // Lấy giá trị name của path
                const regionId = currentPath.getAttribute('name');

                // Cập nhật panel thông tin bên phải
                updateSidebar(regionId);
            });
        });
// ====== SEARCH PROVINCES ======

const searchInput = document.getElementById('province-search');
const searchButton = document.getElementById('province-search-btn');
const suggestionsList = document.getElementById('province-suggestions');

// Chọn tỉnh từ search (dùng key của storeData)
function selectRegion(regionKey) {
    if (!regionKey) return;

    // Tìm path tương ứng trên map
    let targetPath = null;

    mapPaths.forEach(p => {
        const nameAttr = p.getAttribute('name');
        if (nameAttr === regionKey) {
            targetPath = p;
        }
    });

    // Nếu chưa thấy, thử so theo normalize tên
    if (!targetPath) {
        const normalizedKey = normalizeText(regionKey);
        mapPaths.forEach(p => {
            const nameAttr = p.getAttribute('name') || '';
            if (normalizeText(nameAttr) === normalizedKey) {
                targetPath = p;
            }
        });
    }

    // Active trên map
    if (targetPath) {
        mapPaths.forEach(p => p.classList.remove('active'));
        targetPath.classList.add('active');
    }

    // Cập nhật sidebar
    updateSidebar(regionKey);
}

// Render gợi ý khi người dùng gõ
function renderSuggestions() {
    if (!searchInput || !suggestionsList) return;

    const value = searchInput.value;
    const normalizedQuery = normalizeText(value);

    if (!normalizedQuery) {
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
        return;
    }

    const matches = provincesWithStore.filter(p => {
        const byName = normalizeText(p.name).includes(normalizedQuery);
        const byId = normalizeText(p.id).includes(normalizedQuery);
        return byName || byId;
    });

    if (!matches.length) {
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
        return;
    }

    suggestionsList.innerHTML = matches
        .slice(0, 6)
        .map(p => `<li data-region-id="${p.id}">${p.name}</li>`)
        .join('');

    suggestionsList.style.display = 'block';
}

// Xử lý khi bấm nút 🔍 hoặc nhấn Enter
function handleSearch() {
    if (!searchInput) return;
    const query = normalizeText(searchInput.value);
    if (!query) return;

    const match = provincesWithStore.find(p => {
        const byName = normalizeText(p.name).includes(query);
        const byId = normalizeText(p.id).includes(query);
        return byName || byId;
    });

    if (match) {
        // Ẩn gợi ý, fill lại full name
        if (suggestionsList) {
            suggestionsList.innerHTML = '';
            suggestionsList.style.display = 'none';
        }
        searchInput.value = match.name;
        selectRegion(match.id);
    } else {
        regionNameEl.textContent = 'No Result';
        locationCountEl.textContent = '';
        storeListEl.innerHTML = '<p class="initial-message">Không tìm thấy showroom cho tỉnh/thành này.</p>';
    }
}

// Gắn event
if (searchInput && suggestionsList) {
    // Gõ là hiện gợi ý
    searchInput.addEventListener('input', renderSuggestions);

    // Nhấn Enter để search
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    });

    // Click vào gợi ý
    suggestionsList.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        const regionId = target.getAttribute('data-region-id');
        const regionItem = provincesWithStore.find(p => p.id === regionId);

        if (regionId && regionItem) {
            searchInput.value = regionItem.name;
            suggestionsList.innerHTML = '';
            suggestionsList.style.display = 'none';
            selectRegion(regionId);
        }
    });

    // Click ra ngoài thì ẩn gợi ý
    document.addEventListener('click', (event) => {
        const el = event.target;
        if (!(el instanceof Element)) return;
        if (!el.closest('.search-input-wrapper')) {
            suggestionsList.style.display = 'none';
        }
    });
}

// Nút kính lúp
if (searchButton) {
    searchButton.addEventListener('click', handleSearch);
}

        // =======================
        // Logic phần pops up 
        // =======================
        // Hàm mở Modal và Đóng băng vị trí cuộn
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex"; // Hiển thị modal (flex để căn giữa)

        // Lưu vị trí cuộn hiện tại
        const scrollY = window.scrollY;
        document.body.dataset.scrollY = scrollY;

        // Đóng băng vị trí cuộn
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        document.body.style.overflowY = "hidden"; // Ẩn cuộn trong modal
    }
}

// Hàm đóng Modal và KHÔNG CUỘN VỀ ĐẦU TRANG
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";

        // Lấy vị trí cuộn đã lưu
        const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);

        // Khôi phục thuộc tính body
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflowY = "";

        // Giữ nguyên vị trí cuộn cũ (không nhảy về đầu)
        window.scrollTo({ top: scrollY, behavior: "instant" });
    }
}

// Đóng modal khi click ra ngoài
window.onclick = function(event) {
    if (event.target.classList.contains('service-popups')) {
        closeModal(event.target.id);
    }
}

// Đóng modal khi nhấn Escape
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const modals = document.getElementsByClassName('service-popups');
        for (let i = 0; i < modals.length; i++) {
            if (modals[i].style.display === "flex") {
                closeModal(modals[i].id);
                break;
            }
        }
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
