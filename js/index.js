/// <reference types="../@types/jquery"/>

let customers = [
    {
        "id": 1,
        "name": "Ahmed Ali"
    },
    {
        "id": 2,
        "name": "Aya Elsayed"
    },
    {
        "id": 3,
        "name": "Mina Adel"
    },
    {
        "id": 4,
        "name": "Sarah Reda"
    },
    {
        "id": 5,
        "name": "Mohamed Sayed"
    }
];


let transactions = [
    {
        "id": 20,
        "customer_id": 1,
        "date": "2022-03-03",
        "amount": 35
    },
    {
        "id": 21,
        "customer_id": 1,
        "date": "2022-07-08",
        "amount": 560
    },
    {
        "id": 22,
        "customer_id": 1,
        "date": "2022-05-022",
        "amount": 1789
    },
    {
        "id": 23,
        "customer_id": 1,
        "date": "2022-01-014",
        "amount": 2550
    },
    {
        "id": 20,
        "customer_id": 1,
        "date": "2022-04-08",
        "amount": 1150
    },
    {
        "id": 21,
        "customer_id": 2,
        "date": "2022-01-05",
        "amount": 8000
    },
    {
        "id": 22,
        "customer_id": 3,
        "date": "2022-01-05",
        "amount": 1200
    },
    {
        "id": 23,
        "customer_id": 4,
        "date": "2022-01-05",
        "amount": 210
    },
    {
        "id": 24,
        "customer_id": 5,
        "date": "2022-01-05",
        "amount": 3358
    },
    {
        "id": 25,
        "customer_id": 1,
        "date": "2022-01-06",
        "amount": 1766
    },
    {
        "id": 26,
        "customer_id": 2,
        "date": "2022-01-06",
        "amount": 458
    },
    {
        "id": 27,
        "customer_id": 3,
        "date": "2022-01-06",
        "amount": 1825
    },
    {
        "id": 28,
        "customer_id": 4,
        "date": "2022-01-06",
        "amount": 1236
    },
    {
        "id": 29,
        "customer_id": 5,
        "date": "2022-01-06",
        "amount": 540
    }
];


let mainData = [];
let searchInput = document.getElementById('searchInput')
function filterData() {
    customers.forEach((customer) => {
        let customerTransactions = transactions.filter(transaction => transaction.customer_id === customer.id);
        let totalAmount = customerTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        let combinedData = {
            customer_id: customer.id,
            customer_name: customer.name,
            balance: totalAmount,
            transactions: customerTransactions.map(transaction => ({
                transaction_id: transaction.id,
                date: transaction.date,
                amount: transaction.amount
            }))
        };
        mainData.push(combinedData);
    });
}

function displayMain(arr) {
    let mainBox = ``;

    for (let i = 0; i < arr.length; i++) {
        function getDayOfWeek(dateString) {
            let date = new Date(dateString);
            let options = { weekday: 'long' };
            let dayOfWeek = date.toLocaleDateString('EN-us', options);
            return dayOfWeek;
        }
        let Details = ``;
        arr[i].transactions.forEach(transaction => {
            Details += `
            <div class="row  footer border border-top border-1 mt-2  ">
                <div class="col-4">
                    <div class="inner-footer ">
                        <p class="fw-bold">${getDayOfWeek(transaction.date)}</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="inner-footer">
                        <p class="fw-bold">${transaction.date}</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="inner-footer">
                        <p class="fw-bold">${transaction.amount}$</p>
                    </div>
                </div>
            </div>
            `;
        });

        mainBox += `
        <div class="row mt-2 main p-1 d-flex align-items-center justify-content-center">
            <div class="col-3">
                <div class="inner">
                    <img src="images/1-${arr[i].customer_id}.jpg" alt="" class="">
                </div>
            </div>
            <div class="col-3">
                <div class="inner">
                    <p class="fw-bold">${arr[i].customer_name}</p>
                </div>
            </div>
            <div class="col-3">
                <div class="inner">
                    <p class="fw-bold flex-wrap">${arr[i].balance}$</p>
                </div>
            </div>
            <div class="col-3">
                <div class="inner">
                    <button id="${arr[i].customer_id}" class="btn btn-success" onclick="showDetails(${i})">Details</button>
                </div>
            </div>
        </div>
        <footer id="footer-${i}" class="mt-2 d-none">
            ${Details}
            <canvas id="chart-${i}" width="auto" height="auto"></canvas>
        </footer>
        `;
    }

    document.getElementById("mainCard").innerHTML = mainBox;

    arr.forEach((data, index) => {
        let ctx = document.getElementById(`chart-${index}`).getContext('2d');
        let labels = data.transactions.map(transaction => transaction.date);
        let amounts = data.transactions.map(transaction => transaction.amount);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Transactions Amount',
                    data: amounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}
$('.form-control').on('input', function () {
    search(searchInput.value);
});

function search(term) {
    let mainBox = ``;

    for (let i = 0; i < mainData.length; i++) {
        if (mainData[i].customer_name.toLowerCase().includes(term.toLowerCase()) || mainData[i].balance == term) {
            function getDayOfWeek(dateString) {
                let date = new Date(dateString);
                let options = { weekday: 'long' };
                return date.toLocaleDateString('en-US', options);
            }
    
            let Details = ``;
            mainData[i].transactions.forEach(transaction => {
                Details += `
                <div class="row footer border border-top border-1 mt-2">
                    <div class="col-4">
                        <div class="inner-footer">
                            <p class="fw-bold">${getDayOfWeek(transaction.date)}</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="inner-footer">
                            <p class="fw-bold">${transaction.date}</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="inner-footer">
                            <p class="fw-bold">${transaction.amount}$</p>
                        </div>
                    </div>
                </div>
                `;
            });
    
            mainBox += `
            <div class="row mt-2 main p-1 d-flex align-items-center justify-content-center ">
                <div class="col-3">
                    <div class="inner">
                        <img src="images/1-${mainData[i].customer_id}.jpg" alt="" class="">
                    </div>
                </div>
                <div class="col-3">
                    <div class="inner">
                        <p class="fw-bold">${mainData[i].customer_name}</p>
                    </div>
                </div>
                <div class="col-3">
                    <div class="inner">
                        <p class="fw-bold flex-wrap">${mainData[i].balance}$</p>
                    </div>
                </div>
                <div class="col-3">
                    <div class="inner">
                        <button id="${mainData[i].customer_id}" class="btn btn-success" onclick="showDetails(${i})">Details</button>
                    </div>
                </div>
            </div>
            <footer id="footer-${i}" class="mt-2 d-none">
                ${Details}
                <canvas id="chart-${i}" width="auto" height="auto"></canvas>
            </footer>
            `;
        }
    }
    
    if (mainBox === ``) {
        mainBox = `
        <img src="images/3363936.webp" alt="" class="w-50 not-found">
        `;
    }
    
    document.getElementById("mainCard").innerHTML = mainBox;

    mainData.forEach((data, index) => {
        let ctx = document.getElementById(`chart-${index}`).getContext('2d');
        let labels = data.transactions.map(transaction => transaction.date);
        let amounts = data.transactions.map(transaction => transaction.amount);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Transactions Amount',
                    data: amounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}


function showDetails(index) {
    let footer = $(`#footer-${index}`);
    if (footer.hasClass('d-none')) {
        footer.removeClass('d-none').slideDown(200);
    } else {
        footer.slideUp(200, function () {
            footer.addClass('d-none');
        });
    }
}

filterData();
displayMain(mainData);
