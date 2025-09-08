  //book
    const carousel = document.querySelector('.book-carousel');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const bookCovers = document.querySelectorAll('.book-cover');
    const bookTitle = document.getElementById('book-title');
    const bookAuthor = document.getElementById('book-author');
    const bookDescription = document.getElementById('book-description');

    let currentIndex = 0;
    
    // Book data
    const books = [
      {
        title: "Indanaya",
        author: "Oen Aumi",
        description: "This book is Manifesto of new system. The new Democracy that can relate for our era."
      },
      {
        title: "judul dummy 2",
        author: "No Name",
        description: "deskripsi ini cuma Dummy untuk semua."
      },
      {
        title: "judul dummy 3",
        author: "No Name",
        description: "deskripsi ini cuma Dummy untuk semua."
      },
      {
        title: "judul dummy 4",
        author: "No Name",
        description: "deskripsi ini cuma Dummy untuk semua."
      },
      {
        title: "judul dummy 5",
        author: "No Name",
        description: "deskripsi ini cuma Dummy untuk semua."
      }
    ];

    function updateCarousel() {
      // Deactivate all covers
      bookCovers.forEach(cover => cover.classList.remove('active'));
      // Activate the center cover
      bookCovers[currentIndex].classList.add('active');
      
      // Update book details
      bookTitle.textContent = books[currentIndex].title;
      bookAuthor.textContent = `By: ${books[currentIndex].author}`;
      bookDescription.textContent = books[currentIndex].description;
      
      // Calculate transform for the carousel
      const coverWidth = bookCovers[0].offsetWidth + 20; // width + margin
      const offset = (bookCovers.length - 1) / 2 - currentIndex;
      carousel.style.transform = `translateX(${offset * coverWidth}px)`;
    }

    prevButton.addEventListener('click', () => {
      // Loop back to the end if at the beginning
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : bookCovers.length - 1;
      updateCarousel();
    });

    nextButton.addEventListener('click', () => {
      // Loop back to the beginning if at the end
      currentIndex = (currentIndex < bookCovers.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });

    bookCovers.forEach((cover, index) => {
      cover.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    // Initial load
    updateCarousel();

    const rail = document.querySelector('.rail');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Tambahkan class untuk mengubah kursor saat menggeser
    rail.addEventListener('mousedown', (e) => {
      isDown = true;
      rail.classList.add('active');
      startX = e.pageX - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
    });

    rail.addEventListener('mouseleave', () => {
      isDown = false;
      rail.classList.remove('active');
    });

    rail.addEventListener('mouseup', () => {
      isDown = false;
      rail.classList.remove('active');
    });

    rail.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - rail.offsetLeft;
      const walk = (x - startX) * 2;
      rail.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    rail.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
    });

    rail.addEventListener('touchend', () => {
      isDown = false;
    });

    rail.addEventListener('touchcancel', () => {
      isDown = false;
    });

    rail.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - rail.offsetLeft;
      const walk = (x - startX) * 2;
      rail.scrollLeft = scrollLeft - walk;
    });

    // Skrip JavaScript untuk tata letak masonry dinamis
    function resizeMasonryItem(item) {
      const grid = document.querySelector('.masonry');
      const rowGap = parseFloat(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      const rowHeight = parseFloat(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      const itemHeight = item.querySelector('img').getBoundingClientRect().height;
      const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
      item.style.gridRowEnd = `span ${rowSpan}`;
    }

    function resizeAllMasonryItems() {
      const allItems = document.querySelectorAll('.figure-badged');
      allItems.forEach(item => {
        resizeMasonryItem(item);
      });
    }

    function waitForImagesToLoad(callback) {
      const images = document.querySelectorAll('.figure-badged img');
      let loadedCount = 0;
      images.forEach(img => {
        if (img.complete) {
          loadedCount++;
        } else {
          img.addEventListener('load', () => {
            loadedCount++;
            if (loadedCount === images.length) {
              callback();
            }
          });
        }
      });
      if (images.length === loadedCount) {
        callback();
      }
    }

    // Jalankan ulang skrip saat jendela diubah ukurannya
    window.addEventListener('resize', resizeAllMasonryItems);

    // Jalankan skrip setelah semua gambar dimuat
    window.onload = function() {
      waitForImagesToLoad(resizeAllMasonryItems);
    };
