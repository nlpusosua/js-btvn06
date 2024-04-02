// Lấy danh sách dòng chó chính từ API
fetch('https://dog.ceo/api/breeds/list/all')
  .then(response => response.json())
  .then(data => {
    const mainBreedsSelect = document.getElementById('main-breeds');
    const breeds = data.message;
    for (const breed in breeds) {
      const option = document.createElement('option');
      option.value = breed;
      option.textContent = breed;
      mainBreedsSelect.appendChild(option);
    }
  });

// Tải danh sách dòng chó phụ khi dòng chó chính thay đổi
function loadSubBreeds() {
  const mainBreedsSelect = document.getElementById('main-breeds');
  const selectedMainBreed = mainBreedsSelect.value;

  // Xóa danh sách dòng chó phụ hiện tại
  const subBreedsList = document.getElementById('sub-breeds');
  subBreedsList.innerHTML = '';

  // Kiểm tra nếu dòng chó chính đã được chọn
  if (selectedMainBreed) {
    // Lấy danh sách dòng chó phụ từ API
    fetch(`https://dog.ceo/api/breed/${selectedMainBreed}/list`)
      .then(response => response.json())
      .then(data => {
        const subBreeds = data.message;
        if (subBreeds.length > 0) {
          for (const subBreed of subBreeds) {
            const listItem = document.createElement('li');
            listItem.textContent = subBreed;
            listItem.onclick = () => loadRandomImage(selectedMainBreed, subBreed);
            subBreedsList.appendChild(listItem);
          }
        } else {
          const listItem = document.createElement('li');
          listItem.textContent = 'Không có dòng chó phụ.';
          subBreedsList.appendChild(listItem);
        }
      });
  }
}

// Tải hình ảnh ngẫu nhiên của dòng chó phụ
function loadRandomImage(mainBreed, subBreed) {
  const randomImageDiv = document.getElementById('random-image');
  randomImageDiv.innerHTML = 'Đang tải...';

  // Lấy hình ảnh ngẫu nhiên từ API
  fetch(`https://dog.ceo/api/breed/${mainBreed}/${subBreed}/images/random`)
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.message;
      randomImageDiv.innerHTML = `<img src="${imageUrl}" alt="Hình ảnh chó phụ">`;
    });
}