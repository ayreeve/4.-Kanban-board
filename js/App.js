// GENERAL

/* API url, headings */
var baseUrl = 'https://kodilla.com/pl/bootcamp-api',
    myHeaders = {
        'X-Client-Id': '1825',
        'X-Auth-Token': '7b73de17951b0f270846af3ca241bf07'
    };

/* assigning headings for all request */
$.ajaxSetup({
    headers: myHeaders
});

/* request to serwer (get board content) */
$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function (response) {
        setupColumns(response.columns);
    }
});

/* setup columns */
function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
    });
}

/* setup cards */
function setupCards(col, cards) {
    cards.forEach(function (card) {
        var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        col.createCard(card);
    })
}
