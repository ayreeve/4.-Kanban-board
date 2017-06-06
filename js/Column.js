function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.element = createColumn();

    function createColumn() {
        // CREATING COMPONENTS OF COLUMN 
        var column = $('<div class="column"></div>'),
            columnTitle = $('<h2 class="column-title">' + self.name + '</h2>'),
            columnCardList = $('<ul class="card-list"></ul>'),
            columnDelete = $('<button class="btn-delete">x</button>'),
            columnAddCard = $('<button class="column-add-card">Add card</button>');

        // ADDING EVENTS
        columnDelete.click(function () {
            self.deleteColumn();
        });

        columnAddCard.click(function (event) {
            var cardName = swal({
                    title: "Card name",
                    text: "Enter the card name:",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "card name"
                },
                function (inputValue) {
                    if (inputValue === false) return false;

                    if (inputValue === "") {
                        swal.showInputError("Your card need a name");
                        return false
                    }

                    swal("OK", "Card " + "'" + inputValue + "'" + " created", "success");
                });
            event.preventDefault();
            event.preventDefault();
            $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                    name: cardName,
                    bootcamp_kanban_column_id: self.id
                },
                success: function (response) {
                    var card = new Card(response.id, cardName);
                    self.createCard(card);
                }
            });
        });

        // CREATING COLUMN ELEMENT
        column.append(columnTitle)
            .append(columnDelete)
            .append(columnAddCard)
            .append(columnCardList);
        return column;
    }
}

Column.prototype = {
    createCard: function (card) {
        this.element.children('ul').append(card.element);
    },
    deleteColumn: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function (response) {
                self.element.remove();
            }
        });
    }
};
