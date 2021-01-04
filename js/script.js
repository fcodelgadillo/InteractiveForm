app();

// principal function to run the app
function app() {

    /*========================
            Variables
    ======================= */

    // variable representing total cost of activities
    let activitiesTotalCost = 0;

    // regex variables
    const nameRegex = /\S+/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const creditCardRegex = /^\d{13,16}$/;
    const zipCodeRegex = /^\d{5}$/;
    const cvvRegex = /^\d{3}$/;


    /*=======================
    Initial Form Settings
    ======================= */

    // name field focus at first loading
    selectorIdGenerator("name").focus();

    // hide the field other job role at start
    selectorIdGenerator("other-job-role").style.display = "none";

    // disable color field
    selectorIdGenerator("color").disabled = true;

    /*=========================
    Auxiliary Functions
    ======================== */

    // a function to generate id selectors where needed
    function selectorIdGenerator(id) {
        return document.getElementById(id);
    }

    // a function to generate event listeners where needed
    function listenerGenerator (selector, eventToListen, correspondingFunction) {
        return selector.addEventListener(eventToListen, correspondingFunction);
    }

    // checked activities validation function
    const checkActivitiesBox = () => {
        const activityCollection = selectorIdGenerator("activities-box").querySelectorAll('input[type="checkbox"]');
        let counter = 0;
        activityCollection.forEach(element => {
            if (element.checked) {counter++}
        })
        return counter > 0;
    }

    // data field validation function
    function dataValidation (regexVariable, idField) {
        return regexVariable.test(selectorIdGenerator(idField).value);
    }

    // a function to style input fields according to requirements fulfillment
    function toggleInputField(inputField, validationFunction) {
        const parentNode = inputField.parentNode;
        if (validationFunction) {
            parentNode.classList.remove('not-valid');
            parentNode.classList.add('valid');
            parentNode.querySelector('.hint').style.display = 'none';
        } else {
            parentNode.classList.add('not-valid');
            parentNode.classList.remove('valid');
            parentNode.querySelector('.hint').style.display = 'inherit';
        }
    }

    /*========================
    Listeners Functions
    ======================== */

    // colorMenu function for listener
    const colorMenu = (event) => {
        if (event.target.value === "js puns") {
            selectorIdGenerator("color").disabled = false;
            selectorIdGenerator("color").innerHTML = ` <option selected hidden>Select a design theme above</option>
                <option data-theme="js puns" value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
                <option data-theme="js puns" value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
                <option data-theme="js puns" value="gold">Gold (JS Puns shirt only)</option>`;
        } else if (event.target.value === "heart js") {
            selectorIdGenerator("color").disabled = false;
            selectorIdGenerator("color").innerHTML = `<option selected hidden>Select a design theme above</option>
                <option data-theme="heart js" value="tomato">Tomato (I &#9829; JS shirt only)</option>
                <option data-theme="heart js" value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
                <option data-theme="heart js" value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>`;
        } else {
            selectorIdGenerator("color").disabled = true;
        }
    }

    // jobRoleField function for listener
    const jobRoleField = (event) => {
        if (event.target.value === 'other') {
            selectorIdGenerator("other-job-role").style.display = "inline";
        } else {
            selectorIdGenerator("other-job-role").style.display = "none";
        }
    }

    // totalCostUpdate function for listener
    const totalCostUpdate = (event) => {
        if (event.target.checked) {
            activitiesTotalCost += +(event.target).getAttribute('data-cost');
        } else if (event.target.checked === false) {
            activitiesTotalCost -= +(event.target).getAttribute('data-cost');
        }
        selectorIdGenerator("activities-cost").innerHTML = `<p id="activities-cost" class="activities-cost">Total: $${activitiesTotalCost}</p>`;
    }

    // updatePaymentMethod function for listener
    const updatePaymentMethod = (event) => {
        if (event.target.value === "credit-card") {
            selectorIdGenerator("credit-card").removeAttribute('hidden');
            selectorIdGenerator("paypal").setAttribute('hidden', 'true');
            selectorIdGenerator("bitcoin").setAttribute('hidden', 'true');
        } else if (event.target.value === "paypal") {
            selectorIdGenerator("paypal").removeAttribute('hidden');
            selectorIdGenerator("credit-card").setAttribute('hidden', 'true');
            selectorIdGenerator("bitcoin").setAttribute('hidden', 'true');
        } else if (event.target.value === "bitcoin") {
            selectorIdGenerator("bitcoin").removeAttribute('hidden');
            selectorIdGenerator("paypal").setAttribute('hidden', 'true');
            selectorIdGenerator("credit-card").setAttribute('hidden', 'true');
        }
    }

    // checkSelectedActivities function for listener
    const checkSelectedActivities = (event) => {
        const activityCollection = selectorIdGenerator("activities-box").querySelectorAll('input[type="checkbox"]');
        activityCollection.forEach(element => {
            if (event.target.getAttribute('data-day-and-time') === element.getAttribute('data-day-and-time')
                && event.target !== element) {
                element.disabled = event.target.checked;
            }
        })
    }

    /*=============================
    Validation
    ============================= */

    // form submission requirements validation function
    const formValidation = (event) => {
        if (selectorIdGenerator('payment').value === 'credit-card') {
            if(!(dataValidation(nameRegex, 'name') &&
                dataValidation(emailRegex, 'email') &&
                dataValidation(creditCardRegex, 'cc-num') &&
                dataValidation(zipCodeRegex, 'zip') &&
                dataValidation(cvvRegex, 'cvv') &&
                checkActivitiesBox())) {
                event.preventDefault();
                toggleInputField(selectorIdGenerator("name"), dataValidation(nameRegex,"name"));
                toggleInputField(selectorIdGenerator("email"), dataValidation(emailRegex, "email"));
                toggleInputField(selectorIdGenerator("cc-num"), dataValidation(creditCardRegex, "cc-num"));
                toggleInputField(selectorIdGenerator("zip"), dataValidation(zipCodeRegex, "zip"));
                toggleInputField(selectorIdGenerator("cvv"), dataValidation(cvvRegex, "cvv"));
                toggleInputField(selectorIdGenerator("activities-box"), checkActivitiesBox());
            } else {
                selectorIdGenerator('form').submit();
            }
        } else {
            if(!(dataValidation(nameRegex, 'name') &&
                dataValidation(emailRegex, 'email') &&
                checkActivitiesBox())) {
                event.preventDefault();
                toggleInputField(selectorIdGenerator("name"), dataValidation(nameRegex,"name"));
                toggleInputField(selectorIdGenerator("email"), dataValidation(emailRegex, "email"));
                toggleInputField(selectorIdGenerator("activities-box"), checkActivitiesBox());
            } else {
                selectorIdGenerator('form').submit();
            }
        }
    }

    // checkbox real time validation
    listenerGenerator(selectorIdGenerator("activities-box"), 'change', () => {
        let counter = 0;
        selectorIdGenerator("activities").querySelectorAll('input[type="checkbox"]').forEach(activity =>{
            if(activity.checked) {
                counter++;
            }
        })
        if (counter > 0) {
            selectorIdGenerator("activities").className = 'activities valid';
            selectorIdGenerator("activities-hint").style.display = 'none';
        } else {
            selectorIdGenerator("activities").className = 'activities not-valid';
            selectorIdGenerator("activities-hint").style.display = 'inherit';
        }
    })

    //Real time validation fields
    realTimeValidationFieldFunction("name", 'keyup', nameRegex);
    realTimeValidationFieldFunction("email", 'keyup', emailRegex);
    realTimeValidationFieldFunction("cc-num", 'keyup', creditCardRegex);
    realTimeValidationFieldFunction("zip", 'keyup', zipCodeRegex);
    realTimeValidationFieldFunction("cvv", 'keyup', cvvRegex);


    // Real time validation field function
    function realTimeValidationFieldFunction (fieldId, eventType, regexVariable) {
        listenerGenerator(selectorIdGenerator(fieldId), eventType, (event) => {
            if(selectorIdGenerator(fieldId).value.length > 0 || event.code === 'Backspace') {
                toggleInputField(selectorIdGenerator(fieldId), dataValidation(regexVariable, fieldId))
            }
        });
    }

    /*=======================
    Event Listeners
    ======================= */

    // show "other job role" under suited conditions
    listenerGenerator(selectorIdGenerator("title"), 'change', jobRoleField);

    // enable and personalize color menu according to design selected
    listenerGenerator(selectorIdGenerator("design"), 'change', colorMenu);

    // edit total cost according to selected activities
    listenerGenerator(selectorIdGenerator("activities"), 'change', totalCostUpdate);

    // update payment section according to selected option
    listenerGenerator(selectorIdGenerator("payment"), 'change', updatePaymentMethod);

    // preventing user from selecting same day and time activities
    listenerGenerator(selectorIdGenerator("activities"), 'change', checkSelectedActivities);

    // form validation for submission
    listenerGenerator(selectorIdGenerator("form"), 'submit', formValidation);
}
