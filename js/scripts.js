// jslint devel: true
$(function () {

    // RANDOM STRING
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ',
            str = '';
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    // COLUMN
    function Column(name) {
        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            // creating components of column
            var $column = $('<div>').addClass('column'),
                $columnTitle = $('<h2>').addClass('column-title').text(self.name),
                $columnCardList = $('<ul>').addClass('column-card-list'),
                $columnDelete = $('<button>').addClass('btn-delete').text('x'),
                $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

            // adding events
            $columnDelete.click(function () {
                self.removeColumn();
            });

            $columnAddCard.click(function () {
                self.addCard(new Card(prompt("Enter the name of the card")));
            });

            // construction column element
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);

            // return of created column
            return $column;
        }
    }

    Column.prototype = {
        addCard: function (card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function () {
            this.$element.remove();
        }
    };

    // CARD
    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard(); //

        function createCard() {
            // creating the blocks
            var $card = $('<li>').addClass('card'),
                $cardDescription = $('<p>').addClass('card-description').text(self.description),
                $cardDelete = $('<button>').addClass('btn-delete').text('x');

            // adding events
            $cardDelete.click(function () {
                self.removeCard();
            });

            // return of created card
            $card.append($cardDelete).append($cardDescription);
            return $card;
        }
    }

    Card.prototype = {
        removeCard: function () {
            this.$element.remove();
        }
    }

    // BOARD
    var board = {
        name: 'Kanban Board',
        addColumn: function (column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    $('.create-column')
        .click(function () {
            var name = prompt('Enter a column name'),
                column = new Column(name);
            board.addColumn(column);
        });

    // ADDING:
    // column
    var todoColumn = new Column('To do'),
        doingColumn = new Column('Doing'),
        doneColumn = new Column('Done');

    // column to board
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // new cards
    var card1 = new Card('New task'),
        card2 = new Card('Create kanban boards');

    // cards to column
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
});
