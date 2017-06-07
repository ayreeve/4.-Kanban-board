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
        var columnName = "";

        swal({
                title: "Column name",
                text: "Enter the column name:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "column name"
            },
            function (inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("Your column need a name");
                    return false
                }

                columnName = inputValue;

                $.ajax({
                    url: baseUrl + '/column',
                    method: 'POST',
                    data: {
                        name: columnName
                    },
                    success: function (response) {
                        var column = new Column(response.id, columnName);
                        board.createColumn(column);
                    }
                });
                swal("OK", "Column " + "'" + inputValue + "'" + " created", "success");
            });
    });

function initSortable() {
    $('.card-list').sortable({
        connectWith: '.card-list',
        placeholder: 'card-placeholder'
    });
}
