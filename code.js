window.onload = function (){

        const recipesIngredients = {
            lasagne: "2 tbsp olive oil, plus a little for the dish 750g lean beef mince 90g pack prosciutto tomato sauce 200ml hot beef stock a little grated nutmeg 300g pack fresh lasagne sheets white sauce 125g ball mozzarella, torn into thin strips",

            paella: "20-24 raw shell-on king prawns 2 tbsp olive oil 500g monkfish, cut into chunks 1 large onion, finely chopped 500g paella rice 4 garlic cloves, sliced 2 tsp smoked paprika 1 tsp cayenne pepper (optional) one pinch of saffron ½ x 400g can chopped tomatoes (save the rest for the stock, below) 500g mussels, cleaned 100g frozen peas 100g frozen baby broad beans handful parsley leaves, roughly chopped" 
        };
        // nit: call a spade a spade - `shoppingListItems`
        let shoppingListIngredientsUser = [];

        // nit: naming again - `createShoppingListItem`
        function createListItem(name) {
            if (name != "") {
                let p = document.createElement("p");
                p.setAttribute("class", "inputValue");
                p.textContent = name;
                shoppingListIngredientsUser.push(name.toLowerCase());
                return p;

            } else{
                // Single Responsibility Principle
                // why does a function `createListItem` also create an alert to the user?
                // create another function `createShoppingListAlert` and out put this
                // then have the calling code decide which function it wants to call
                let alert = document.createElement("p");
                alert.setAttribute("id", "alert");
                alert.textContent = "Please enter a valid shopping list item"
                document.getElementById("containerShppingListInput").appendChild(alert);
            }
        }

        // it's good that you tried to separate out some of the DOM manipulation from the business logic
        // try to do that with more things down below
        function createDeleteButton() {
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.setAttribute("class", "deleteButton");

            let deleteButtonIcon = document.createElement("i");
            deleteButtonIcon.setAttribute("class", "fa-solid fa-trash-can fa-fw");

            deleteButton.appendChild(deleteButtonIcon);
            return deleteButton;
        }

        function createTickButton() {
            let tickButton = document.createElement("button");
            tickButton.setAttribute("class", "tickButton");
            tickButton.textContent = "Done";

            let tickButtonIcon = document.createElement("i");
            tickButtonIcon.setAttribute("class", "fa-solid fa-check fa-fw");

            tickButton.appendChild(tickButtonIcon);
            return tickButton;
        }

            //add items to shopping list - start
        let button = document.getElementById("addToListButton");
        button.onclick = listOperation;

        let inputEl = document.getElementById("shoppingListInput");

        inputEl.onkeydown = function(event) {
            if (event.key === "Enter") {
                button.click();
            }
        };

        function listOperation() {
            let containerShoppingListDisplay = document.getElementById("containerShoppingListDisplay");
            let newListItemValue = document.getElementById("shoppingListInput").value;

            let content = containerShoppingListDisplay.appendChild(createListItem(newListItemValue));

            content.appendChild(createDeleteButton());
            content.appendChild(createTickButton());            
            
            //input box: clear and focus 
            document.getElementById("shoppingListInput").value = "";
            document.getElementById("shoppingListInput").focus();

            //delete and tick shopping list items - start
            let deleteButton = document.getElementsByClassName("deleteButton");
            let tickButton = document.getElementsByClassName("tickButton");
            let inputValue = document.getElementsByClassName("inputValue");

                // nit: watch your indentations. Why is this for loop indented further than other code at the same level?
                // only indent code when you enter a new block, and be consistent with it
                // in a good pro environment there will be a linter nagging you about this sort of thing,
                // so you don't have to worry about it as much. But try to get into good habits with indentation
                for (let i = 0; i < shoppingListIngredientsUser.length; i++) {
                    deleteButton[i].onclick = function() {

                        this.parentElement.remove();                 
                    }
                    // try also to be consistent with placing empty lines
                    // usually, the convention in JS is not to have them at the top or bottom of a block
                    // only between lines in a block
                    tickButton[i].onclick = function(){
                        inputValue[i].style.textDecoration = "line-through";
                        
                    }  
                }
          // more strange indentations here. 2 spaces where you've used 4 elsewhere. be consistent
          const generateButton = document.getElementById("generateButton");
          generateButton.onclick = matchRecipe;
 
        }
                //delete and tick shopping list items - finish
                //add items to shopping list - finish
            // nit: watch your indentations. Why is this function indented further than other code at the same level?
            // only indent code when you enter a new block
            function matchRecipe() {
                let regExArray = [];
                let martchingIngredients = []; // typo: matchingIngredients?
                let recipesList = [];
                let counter = {};
                let recipesForDisplay = [];
                const minNoOfShopListEntries = 10;
                const minNoOfRecipeCount = 6;

                if (shoppingListIngredientsUser.length >= minNoOfShopListEntries) {
                        //only use this feature if there are at least a certain number of items on shopping list items array

                    // ideally, don't try to shape the user's input to your liking
                    // give them an example of the kind of input you'll accept and validate their input against those rules
                    // if they provide an input you don't want, give them an error
                    // if you really want to edit the user input I think this could be put in a separate function
                    for (let i = 0; i < shoppingListIngredientsUser.length; i++) {
                            //eliminate digits from shopping list user input
                        regExArray.push(shoppingListIngredientsUser[i].match(/\D+/gu).join(" "))
                    }

                                    //if the user's shopping list items are included in the recipes DB, then store the recipes names
                            for (let[key, value] of Object.entries(recipesIngredients)) {
                        
                                for (let i = 0; i < regExArray.length; i++) {

                                    // I'm confused as to what `regExArray` is and I think it might be another naming issue
                                    // is it the shopping list items? As I said before: call a spade a spade
                                    if (value.includes(regExArray[i])) {

                                        martchingIngredients.push(regExArray[i]);
                                        recipesList.push(key);
                                    }
                                }
                            }
                                        //count how many ingredients are part of the recipes based on user's input
                            // I'm starting to become really confused here. What is `iterator`?
                            // I think you need to separate all this business logic in `matchRecipe` into different
                            // functions and name them according to what they are actually doing
                            // "code is for humans, not computers" ;)
                            for (const iterator of recipesList) {
                                    
                                if (counter[iterator]) {
                                    
                                    counter[iterator]++;
                                } else {

                                    counter[iterator] = 1;
                                }
                            }
                                        //if a recipe has a certain number of ingredinets contained in the user's shopping list, then display those recipes
                            for (let[key, value] of Object.entries(counter)) {

                                if (value >= minNoOfRecipeCount) {
                                    
                                    recipesForDisplay.push(key);

                                }                                
                            }
                            displayMatchedRecipe(recipesForDisplay);
                            
                }             
            }
            // the argument to this function parameter isn't a recipeName, it's a list of recipesForDisplay
            function displayMatchedRecipe(recipeName) {

                const [recipe1, recipe2] = recipeName;
                    
                const recipesContainer = document.getElementById("recipesContainer");
                    
                            //recipe 1 container display
                const recipe1Container = document.createElement("div");
                    
                const recipe1Button = document.createElement("button");
                recipe1Button.setAttribute("class", "collapseButton");
                recipe1Button.innerHTML = recipe1[0].toUpperCase() + recipe1.slice(1);
                    
                const recipe1Content = document.createElement("div");
                recipe1Content.setAttribute("class", "content");
                    
                const recipe1IFrame = document.createElement("iframe");
                recipe1IFrame.setAttribute("class", "iframe");
                recipe1IFrame.src = `${recipe1}.html`;
                    
                recipesContainer.appendChild(recipe1Container);
                recipe1Container.appendChild(recipe1Button);
                recipe1Container.appendChild(recipe1Content);
                recipe1Content.appendChild(recipe1IFrame);
                    
                    
                            //recipe 2 container display
                    // more unnecessary indentation
                    if (recipeName.length > 1) {
                        const recipe2Container = document.createElement("div");
                        
                        const recipe2Button = document.createElement("button");
                        recipe2Button.setAttribute("class", "collapseButton");
                        recipe2Button.innerHTML = recipe2[0].toUpperCase() + recipe2.slice(1);
    
                        const recipe2Content = document.createElement("div");
                        recipe2Content.setAttribute("class", "content");
                    
                        const recipe2IFrame = document.createElement("iframe");
                        recipe2IFrame.setAttribute("class", "iframe");
                        recipe2IFrame.src = `${recipe2}.html`;
                        
                        recipesContainer.appendChild(recipe2Container);
                        recipe2Container.appendChild(recipe2Button);
                        recipe2Container.appendChild(recipe2Content);
                        recipe2Content.appendChild(recipe2IFrame); 
                    }
                    
                                    //add event listner to the button for opening up the collapsible
                const allButtons = document.getElementsByClassName("collapseButton"); 

                    // unnecessary indentation
                    for (let i = 0; i < allButtons.length; i++) {
                                
                        allButtons[i].onclick = function() {
                    
                            const content = this.nextElementSibling;
                            content.className === "content" ? content.className = "collapse" : content.className = "content";
    
                            this.className === "collapseButton" ? this.className = "active" : this.className = "collapseButton";
    
                        }
                    }
            }
};
