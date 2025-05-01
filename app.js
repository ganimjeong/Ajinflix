
//API
const API_KEY = '0b66a4836a6d9c04a78c2e813dde960a';

let allMovies = []; 

// 카드 적용
const fetchMoviecards = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`);
        const data = await response.json();
        // console.log(data.results[1]['title']);
        // console.log(data['results'][1]['poster_path']);
        // console.log(data['results'][1]['vote_average']);
        // console.log(data['results'][1]['vote_count']);
        // console.log(data['results'][1]['overview']);
        const movies = data.results;
        allMovies = movies; 
        movies.forEach((movie, index) => {

            const title = movie.title;
            const poster_path = movie.poster_path;
            const vote_average = movie.vote_average;
            const vote_count = movie.vote_count;
            const overview = movie.overview;
            
            console.log(movie.title)
            let temp_html = `<div class="col">
            <div class="card h-100">
              <img src="https://image.tmdb.org/t/p/w500${poster_path}" 
              class="card-img-top" alt="poster img">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${vote_average}점 (${vote_count})</p>
                <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#modal-${index}">
                  상세 설명 보기
                </button>

              </div>
            </div>
          </div>`;

          let modal_html = `<div class="modal fade custom-dark-modal" id="modal-${index}" tabindex="-1" aria-labelledby="modalLabel-${index}" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="modalLabel-${index}">${title}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="닫기"></button>
                </div>
                <div class="modal-body">
                  ${overview}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-light" data-bs-dismiss="modal">뒤로</button>
                </div>
              </div>
            </div>
          </div>
        `;
        document.getElementById('card').insertAdjacentHTML('beforeend', temp_html);
        document.body.insertAdjacentHTML('beforeend', modal_html);
        
        });

    } catch (error) {
        console.error('에러:', error);
    }
};
fetchMoviecards();

//검색기능

// 검색 버튼 클릭 시 필터링 실행
document.addEventListener('DOMContentLoaded', () => {
    fetchMoviecards();
  
    document.getElementById('searchBtn').addEventListener('click', () => {
      const query = document.getElementById('searchInput').value.trim();
      const filteredMovies = allMovies.filter(movie =>
        movie.title.includes(query)
      );
      renderFilteredMovies(filteredMovies);
    });
  });
  
  
  // 영화 목록을 필터링해서 다시 그리는 함수
  function renderFilteredMovies(movies) {
    const cardContainer = document.getElementById('card');
    const noResults = document.getElementById('noResults');
    cardContainer.innerHTML = ''; // 기존 카드 초기화
  
    // 기존 모달 제거
    document.querySelectorAll('.modal').forEach(modal => modal.remove());
  
    if (movies.length === 0) {
        noResults.style.display = 'block'; // 결과 없음
        return;
      } else {
        noResults.style.display = 'none'; // 결과 있음
      }


    movies.forEach((movie, index) => {
      const { title, poster_path, vote_average, vote_count, overview } = movie;
  
      const temp_html = `
        <div class="col">
          <div class="card h-100">
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" 
            class="card-img-top" alt="poster img">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${vote_average}점 (${vote_count})</p>
              <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#modal-${index}">
                상세 설명 보기
              </button>
            </div>
          </div>
        </div>`;
  
      const modal_html = `
        <div class="modal fade custom-dark-modal" id="modal-${index}" tabindex="-1" aria-labelledby="modalLabel-${index}" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="modalLabel-${index}">${title}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="닫기"></button>
              </div>
              <div class="modal-body">
                ${overview}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">뒤로</button>
              </div>
            </div>
          </div>
        </div>`;
  
      cardContainer.insertAdjacentHTML('beforeend', temp_html);
      document.body.insertAdjacentHTML('beforeend', modal_html);
    });
  }
  