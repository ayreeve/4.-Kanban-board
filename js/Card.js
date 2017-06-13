// KANBAN CARD CLASS
function Card(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.element = createCard();

    /* create card */
    function createCard() {
        var card = $('<li data-card-id-"' + this.id + '" class="card"></li>'),
            cardDeleteBtn = $('<button class="btn-delete"><img src="images/buttons/delete_button.png" alt="delete button"></button>'),
            cardDescription = $('<p class="card-description"></p>');

        /* click event - remove card */
        cardDeleteBtn.click(function () {
            self.removeCard();
        });

        /* append elements to card */
        card.append(cardDeleteBtn);
        cardDescription.text(self.name);
        card.append(cardDescription);
        return card;
    }
}

/* remove card */
Card.prototype = {
    removeCard: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function () {
                self.element.remove();
            }
        });
    }
};
