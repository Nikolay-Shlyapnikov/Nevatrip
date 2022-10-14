window.onload = function() {
        let price = { //Объект, в который записывается количество билетов и направление движения
            route: 'formAtoB',
            count: '1', //По умолчанию имеет указанные значения, при изменении направления объект также будет изменяться
        }
        const routeSelect = document.querySelector('.select__route'),
            timesCollection = document.querySelectorAll('.select__time-choice'),
            printCurrentTime = () => { //Функция для вывода корректного времени
                const currentTimeZoneOffsetInHours = new Date().getTimezoneOffset() / 60;
                for (let i = 0; i < timesCollection.length; i++) {
                    /*При загрузке страницы через цикл в нужные контейнеры добавляются
                     элементы select с учетом часового пояса пользователя*/
                    if (timesCollection[i].classList.contains('fromAtoB')) {
                        timesCollection[i].innerHTML = `
                        <div class="select__wrapper">
                            <label for="fromAtoB">Выберите время</label>
                            <select name="fromAtoB" class='select' id="fromAtoB">
                                <option selected value="${18+currentTimeZoneOffsetInHours+':00'}">${18+currentTimeZoneOffsetInHours+':00'}(из A в B)</option>
                                <option value="${18+currentTimeZoneOffsetInHours+':30'}">${18+currentTimeZoneOffsetInHours+':30'}(из A в B)</option>
                                <option value="${18+currentTimeZoneOffsetInHours+':45'}">${18+currentTimeZoneOffsetInHours+':45'}(из A в B)</option>
                                <option value="${19+currentTimeZoneOffsetInHours+':00'}">${19+currentTimeZoneOffsetInHours+':00'}(из A в B)</option>
                                <option value="${19+currentTimeZoneOffsetInHours+':15'}">${19+currentTimeZoneOffsetInHours+':15'}(из A в B)</option>
                                <option value="${21+currentTimeZoneOffsetInHours+':00'}">${21+currentTimeZoneOffsetInHours+':00'}(из A в B)</option>
                            </select>
                        </div>`;
                    }
                    if (timesCollection[i].classList.contains('fromBtoA')) {
                        timesCollection[i].innerHTML = `
                        <div class="select__wrapper">
                            <label for="fromBtoA">Выберите время</label>
                            <select name="fromBtoA" class='select' id="fromBtoA">
                                <option selected value="${18+currentTimeZoneOffsetInHours+':30'}">${18+currentTimeZoneOffsetInHours+':30'}(из B в A)</option>
                                <option value="${18+currentTimeZoneOffsetInHours+':45'}">${18+currentTimeZoneOffsetInHours+':45'}(из B в A)</option>
                                <option value="${19+currentTimeZoneOffsetInHours+':00'}">${19+currentTimeZoneOffsetInHours+':00'}(из B в A)</option>
                                <option value="${19+currentTimeZoneOffsetInHours+':15'}">${19+currentTimeZoneOffsetInHours+':15'}(из B в A)</option>
                                <option value="${19+currentTimeZoneOffsetInHours+':35'}">${19+currentTimeZoneOffsetInHours+':35'}(из B в A)</option>
                                <option value="${21+currentTimeZoneOffsetInHours+':50'}">${21+currentTimeZoneOffsetInHours+':50'}(из B в A)</option>
                                <option value="${21+currentTimeZoneOffsetInHours+':55'}">${21+currentTimeZoneOffsetInHours+':55'}(из B в A)</option>
                            </select>
                        </div>`;
                    }
                    if (timesCollection[i].classList.contains('fromAtoBandBack')) {
                        timesCollection[i].innerHTML = `
                    <div class="select__wrapper">
                        <label for="fromAtoBandBack">Выберите время отплытия</label>
                        <select name="fromAtoBandBack" class="select" id="fromAtoBandBack">
                            <option selected value="${18+currentTimeZoneOffsetInHours+':00'}">${18+currentTimeZoneOffsetInHours+':00'}(из A в B)</option>
                            <option value="${18+currentTimeZoneOffsetInHours+':30'}">${18+currentTimeZoneOffsetInHours+':30'}(из A в B)</option>
                            <option value="${18+currentTimeZoneOffsetInHours+':45'}">${18+currentTimeZoneOffsetInHours+':45'}(из A в B)</option>
                            <option value="${19+currentTimeZoneOffsetInHours+':00'}">${19+currentTimeZoneOffsetInHours+':00'}(из A в B)</option>
                            <option value="${19+currentTimeZoneOffsetInHours+':15'}">${19+currentTimeZoneOffsetInHours+':15'}(из A в B)</option>
                            <option value="${21+currentTimeZoneOffsetInHours+':00'}">${21+currentTimeZoneOffsetInHours+':00'}(из A в B)</option>
                        </select>
                    </div>
                    <div class="select__wrapper">
                        <label for="fromBtoAandBack">Выберите время обратного рейса</label>
                        <select name="fromBtoAandBack" class="select" id="fromBtoAandBack">
                            <option disabled value="${18+currentTimeZoneOffsetInHours+':30'}">${18+currentTimeZoneOffsetInHours+':30'}(из B в A)</option>
                            <option disabled value="${18+currentTimeZoneOffsetInHours+':45'}">${18+currentTimeZoneOffsetInHours+':45'}(из B в A)</option>
                            <option selected value="${19+currentTimeZoneOffsetInHours+':00'}">${19+currentTimeZoneOffsetInHours+':00'}(из B в A)</option>
                            <option value="${19+currentTimeZoneOffsetInHours+':15'}">${19+currentTimeZoneOffsetInHours+':15'}(из B в A)</option>
                            <option value="${19+currentTimeZoneOffsetInHours+':35'}">${19+currentTimeZoneOffsetInHours+':35'}(из B в A)</option>
                            <option value="${21+currentTimeZoneOffsetInHours+':50'}">${21+currentTimeZoneOffsetInHours+':50'}(из B в A)</option>
                            <option value="${21+currentTimeZoneOffsetInHours+':55'}">${21+currentTimeZoneOffsetInHours+':55'}(из B в A)</option>
                        </select>
                    </div>
                    `;
                    }
                }
            };
        printCurrentTime();

        function setCurrentBackTime() { //Функция для корректировки времени маршрута из В в А, с учетом выбранного времени из A в B и времени в пути
            const fromAtoBandBackSelect = document.querySelector('#fromAtoBandBack'),
                fromBtoAandBackSelect = document.querySelector('#fromBtoAandBack');
            fromAtoBandBackSelect.addEventListener('change', (e) => {
                let isSelected = false; // Булевая переменная для назначения дефолтного значения второго селекта
                for (let i = 0; i < fromBtoAandBackSelect.children.length; i++) {
                    fromBtoAandBackSelect.children[i].removeAttribute('selected');
                    fromBtoAandBackSelect.children[i].removeAttribute('disabled'); // Убираем со всех старых неподходящих options атрибут disabled
                    if ((getMinuteValue(fromAtoBandBackSelect.value) <= getMinuteValue(fromBtoAandBackSelect.children[i].value)) && (getMinuteValue(fromBtoAandBackSelect.children[i].value) < (Number(getMinuteValue(fromAtoBandBackSelect.value)) + Number(50)))) {
                        // С помощью преобразования сравниваем значение времени старта + 50 минут с временем обратного рейса
                        // Если время обратного рейса выпадает на время в пути, то к нему добавляется атрибут disabled и его выбрать нельзя
                        fromBtoAandBackSelect.children[i].setAttribute("disabled", "disabled");
                    } else { //Если время не совпадает с временем в пути, то этот options назначается дефолтным  
                        if (isSelected == false) {
                            fromBtoAandBackSelect.children[i].setAttribute('selected', 'selected');
                            isSelected = true; //Это действие необходимо выполнить только 1 раз, поэтому меняем значение isSelected
                        }
                    }

                }

                function getMinuteValue(value) { //Для корректного сравнения двух значений, необходимо формат HH:MM привести к формату MM
                    let timeArray = value.split(':') //Преобразование HH:MM в массив вида ['HH', 'MM'];
                    return Number(timeArray[0]) * 60 + Number(timeArray[1]); //На всякий случай оба значения конвертируем в числовой тип данных
                }
            })
        };
        setCurrentBackTime();
        routeSelect.addEventListener('change', (e) => {
            for (let i = 0; i < timesCollection.length; i++) {
                timesCollection[i].style.display = 'none';
                if (timesCollection[i].classList.contains(routeSelect.value)) {
                    timesCollection[i].style.display = 'flex';
                }
            }
            price.route = routeSelect.value;
        });
        const getCountBtn = document.querySelector('.getCount'),
            resultBlock = document.querySelector('.resultPrice'),
            countOfTicketInput = document.querySelector('.countTickets');
        countOfTicketInput.addEventListener('change', (e) => {
            price.count = e.target.value;
        })
        getCountBtn.addEventListener('click', (e) => {
                    if (price.route == 'fromAtoBandBack') {
                        resultBlock.innerHTML = `
                        <p class='main-text'>Вы выбрали следующее количество билетов: ${price.count},
                        для поездки по направлению ${routeSelect.options[routeSelect.selectedIndex].textContent}<br>
                        Время отплытия: ${document.querySelector(`#fromAtoBandBack`).value}<br>
                        Время обратного рейса: ${document.querySelector(`#fromBtoAandBack`).value}<br>
                        Общее время в пути: 100 минут.<br>
                        Стоимость одного билета: 1200 рублей<br>
                        Общая стоимость: ${price.count*1200}
                        </p>`;
                    }
                   else{
                    resultBlock.innerHTML = `
                    <p class='main-text'>Вы выбрали следующее количество билетов: ${price.count},
                     для поездки по направлению ${routeSelect.options[routeSelect.selectedIndex].textContent}<br>
                    Время отплытия: ${document.querySelector(`#${routeSelect.value}`).value}<br>
                    Время в пути: 50 минут.<br>
                    Стоимость одного билета: 700 рублей<br>
                    Общая стоимость: ${price.count*700}
                    </p>
                    `;
                   } 
    })
}

const showMoreButton = document.querySelector('.show-more');
showMoreButton.addEventListener('click', () =>{
    
    showMoreButton.parentNode.insertAdjacentHTML('beforeend', `
    <div class="cart__times-item">12:00</div>
    <div class="cart__times-item">12:00</div>
    <div class="cart__times-item">12:00</div>
    `);
    showMoreButton.parentNode.removeChild(showMoreButton);
});