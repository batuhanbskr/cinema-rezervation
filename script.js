const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seat = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();
container.addEventListener('click', function (e) {
    // seat classına sahip olanlar ve reserved klasına sahip olmayanlar gelsin
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();


    }

});

select.addEventListener('change', function (e) {
    calculateTotal();
})

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function (seat) {
        selectedSeatArr.push(seat);
    });

    seat.forEach(function(seat){
        seatsArr.push(seat);
    })

    let selectedSeatIndexs = selectedSeatArr.map(function(seat){
        return seatsArr.indexOf(seat);
    })

    let selectedSeatCount = container.querySelectorAll('.seat.selected').length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
    //LOCALSTORAGE'DAN SEÇİLEN KOLTUK VE FİLM BİLGİLERİNİ ALIYORUZ
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seat.forEach(function(seat, index){
            if (selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs){
    //SEÇİLEN KOLTUKLARIN INDEX NUMARALARINI LOKALDE SAKLAMA
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}


