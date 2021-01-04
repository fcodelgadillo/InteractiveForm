# InteractiveForm
This project consists in a web interactive form that extensively uses JavaScript to achieve validation 


# Real time validation and error messages

1) The "user-name" field has real time validation that checks if the user has entered a name, if not, there will be an alert icon and message.
2) The "email" field also has a real time validation that checks if the user has entered a valid email, this is done by using regex testing.
3) The "register activities" checkbox has also a real time validation that is triggered if the user doesn´t select any activity when submitting the form.
4) If the credit card payment method is selected, the form validates in real time the following aspects:
              1.1) credit card number validation with regex
              1.2) zip code number validation with regex
              1.3) cvv number validation with regex
              
# Form Submitting

When the requirements are met, the register button (on click) will submit the form, triggering the page refreshment.

If one or more of the requirements are not met, the validation will show error messages and icons when trying to submit. 
