$(function () {

    // SUPPORT FUNCTIONS
    function initSortable() {
        $('.card-list').sortable({
            connectWith: '.card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split(),
            str = '',
            i;
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    // BOARD
    var board = {
        name: 'Kanban board',
        createColumn: function (column) {
            this.element.append(column.element);
            initSortable();
        },
        element: $('#board .column-container')
    };

    $('.create-column')
        .click(function () {
            board.createColumn(new Column(prompt('Wpisz nazwę kolumny')));
        });

    // KANBAN COLUMN CLASS
    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.element = createColumn();

        function createColumn() {
            // CREAING COMPONENTS OF COLUMN
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
                event.preventDefault();
                self.createCard(new Card(prompt("Card name")));
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
            this.element.remove();
        }
    };

    // KANBAN CARD CLASS
    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.element = createCard();

        function createCard() {
            // creating the blocks
            var card = $('<li class="card"></li>'),
                cardDeleteBtn = $('<button class="btn-delete">x</button>'),
                cardDescription = $('<p class="card-description"></p>');

            // adding events
            cardDeleteBtn.click(function () {
                self.removeCard();
            });

            // return of created card
            card.append(cardDeleteBtn);
            cardDescription.text(self.description);
            card.append(cardDescription)
            return card;
        }
    }
    Card.prototype = {
        removeCard: function () {
            this.element.remove();
        }
    }

    // ADDING:
    // new columns
    var todoColumn = new Column('To do'),
        doingColumn = new Column('In progress'),
        doneColumn = new Column('Done');

    // column to board
    board.createColumn(todoColumn);
    board.createColumn(doingColumn);
    board.createColumn(doneColumn);

    // new cards
    var card1 = new Card('New task'),
        card2 = new Card('create Kanban board');

    // cards to column
    todoColumn.createCard(card1);
    doingColumn.createCard(card2);
})
