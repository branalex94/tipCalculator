const tipOptions = document.querySelectorAll(".tipOption");
const billValue = document.querySelector("#billAmount");
const peopleAmount = document.querySelector("#peopleAmount");
const tipPerPerson = document.querySelector("#tipPerPerson");
const totalPerPerson = document.querySelector("#totalPerPerson");
const resetBtn = document.querySelector(".resetBtn");

resetBtn.addEventListener("click", () => {
  billValue.value = "";
  peopleAmount.value = "";
  tipPerPerson.textContent = "0";
  totalPerPerson.textContent = "0";
  tipOptions.forEach((option) => {
    if (option.classList.contains("tipOptionActive")) {
      option.classList.remove("tipOptionActive");
    }
  });
});

billValue.addEventListener("change", (e) => {
  let bill = Number(e.target.value) <= 0 ? null : Number(e.target.value);
  // Iterate through the options
  tipOptions.forEach((option) => {
    // Add an onclick event to each of them
    option.addEventListener("click", (e) => {
      if (option.classList.contains("customTip")) {
        return;
      } else if (!option.classList.contains("tipOptionActive")) {
        tipOptions.forEach((item) => {
          // Check whether clicked option is already active
          if (item !== option) {
            // If it isn't remove the highlight
            item.classList.remove("tipOptionActive");
          }
        });
        // Sets option to active
        e.target.classList.toggle("tipOptionActive");
        peopleAmount.addEventListener("keyup", (e) => {
          const discountPeople = Number(e.target.value <= 0)
            ? null
            : Number(e.target.value);
          // Parse discount string to number and divide it by 100
          const discount =
            Number(
              option.textContent.slice(0, option.textContent.indexOf("%"))
            ) / 100;
          // Calculate discount from bill
          const discountAmount = bill * discount;
          // Set values per person
          tipPerPerson.textContent = !discountPeople
            ? "0"
            : (discountAmount / discountPeople).toFixed(2);
          totalPerPerson.textContent = !discountPeople
            ? "0"
            : (bill / discountPeople).toFixed(2);
        });
      }
    });
  });
});
