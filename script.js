/* ------------DARK MODE------------ */

    var aside = document.querySelector('.aside');
    var main = document.querySelector('.main');

    var darkModeBtn = document.querySelector('.btn--dark-theme');

    darkModeBtn.addEventListener('click', function() {
        aside.classList.toggle('dark-aside');
        main.classList.toggle('dark-main');
    })

/* --------------------------------- */


UIController = (function() {

    var DOMStrings = {
        inputLink: ".input__link",
        inputName: ".input__name",
        addButton: ".btn--add",
        listContainer: ".section__links",
    }

    return {

        getDOMStrings: function() {
            return DOMStrings;
        },

        getInput: function() {
            return {
                link: document.querySelector(DOMStrings.inputLink).value,
                name: document.querySelector(DOMStrings.inputName).value,
            }
        },

        validateInput: function(input) {
           if(input.link !== "" && input.name !== ""){
               return true;
           } else {
               return false;
           }
        },

        addItemToList: function(item) {
            var html, newHtml;

            // create a new html element
            html = '<div class="link__container" id="link-%id%"><a class="link__address" href="%url%"  target="_blank">%name%</a><i class="btn btn--delete"><img src="./images/close.png" alt="delete"></i></div>'

            // replace placeholders with item's data
            newHtml = html.replace('%id%', item.id);
            newHtml = newHtml.replace('%url%', item.link);
            newHtml = newHtml.replace('%name%', item.name);

            // insert html into the dom
            document.querySelector(DOMStrings.listContainer).insertAdjacentHTML('beforeend', newHtml);
        },

        clearInput: function() {
            document.querySelector(DOMStrings.inputName).value = "";
            document.querySelector(DOMStrings.inputLink).value = "";
            
            document.querySelector(DOMStrings.inputLink).focus();
        }

    }

})();

dataController = (function() {

    var Link = function(id, link, name) {
        this.id = id;
        this.link = link;
        this.name = name;
    }

    var data = [];

    return{

        addItem: function(link, name) {
            var ID;

            // 1. create a new id
            if(data.length > 0){
                ID = data[data.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // 2. create new Link item with the ID
            var newItem = new Link(ID, link, name);

            // 3. push new item to the data array
            data.push(newItem);

            // 4. return new item
            return newItem;
        }

    }

})();

controller = (function(UICtrl, dataCtrl) {

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.addButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
    
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
    
        });
    }

    var ctrlAddItem = function() {
        var input, item;

        // 1. get input from the ui controller
        input = UICtrl.getInput();

        if(UICtrl.validateInput(input)) {

            // 2. add item to the data controller
            item = dataCtrl.addItem(input.link, input.name);

            // 3. display the item on the ui
            UICtrl.addItemToList(item);

            // 4. clear inputs 
            UICtrl.clearInput();
        }

    }

    return {
        init: function() {
            setupEventListeners();
        }

    }

})(UIController, dataController);

controller.init();