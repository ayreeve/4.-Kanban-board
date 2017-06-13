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

/* request to server (get board content) */
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
        card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        col.createCard(card);
    });
    /* modify card */
    $('.card p').dblclick(function () {
        var newCardName = "",
            $cardDescription = $(this),
            cardID = $cardDescription.closest('.card').data('.card');

        swal({
                title: "Changing card name",
                text: "Enter new name for chosen card:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "new card name"
            },
            function (inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("Your card need a name");
                    return false
                }

                newCardName = inputValue;

                $.ajax({
                    url: baseUrl + '/card' + cardID,
                    method: 'PUT',
                    data: {
                        id: cardID,
                        name: newCardName
                    },
                    success: function () {
                        $cardDescription.text(newCardName);
                    }
                });

                swal("OK", "Card renamed", "success");
            });
    });
}
