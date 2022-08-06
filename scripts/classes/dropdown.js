import { tags } from "../utils/search.js";
import { updateTags } from "../utils/tag.js";

export class Dropdown {
  constructor(elt, data, type) {
    this.elt = elt;
    this.data = data;
    this.type = type;
  }

  renderList() {
    const listElt = this.elt.querySelector("div.dropdown-list");
    listElt.innerHTML = "";

    const ul = document.createElement("ul");

    if (this.data) {
      for (let i = 0; i < this.data.length; i++) {
        const li = document.createElement("li");
        const name = this.data[i];
        li.innerHTML = name;
        // pass name & type in add tag function
        li.addEventListener("click", () => this.addTag(name));

        ul.appendChild(li);
      }
    }

    listElt.appendChild(ul);

    // add click event on each dropdown
    this.addClickEvent();
  }

  addClickEvent() {
    const arrow = this.elt.querySelector("div.dropdown-button > img");
    arrow.addEventListener("click", () => this.toggleDropdown());
  }

  toggleDropdown() {
    const activeArrow = this.elt.querySelector("div.dropdown-button > img");
    const allDropdowns = document.querySelectorAll("div.dropdown");

    // change arrow if dropdown is open or close
    if (activeArrow.dataset.open === "false") {
      activeArrow.dataset.open = "true";
      activeArrow.src = "assets/icons/arrow-up.svg";

      // remove w-full in all dropdown
      for (let i = 0; i < allDropdowns.length; i++) {
        const element = allDropdowns[i];
        element.classList.remove("w-full");
        element.children[1].classList.remove("flex");
      }

      // add w-full in active dropdown
      this.elt.classList.add("w-full");
      this.elt.children[1].classList.add("flex");
    } else {
      activeArrow.src = "assets/icons/arrow-down.svg";
      activeArrow.dataset.open = "false";

      // add w-full in active dropdown
      this.elt.classList.remove("w-full");
      this.elt.children[1].classList.remove("flex");
    }



  }

  // tag
  addTag(name) {
    // add tag selected in tag array
    tags.push({
      name: name,
      type: this.type,
    });

    // update tags array
    updateTags(tags);
  }
}
