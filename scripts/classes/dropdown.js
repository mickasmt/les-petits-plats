import { tags } from "../utils/search.js";
import { updateTags } from "../utils/tag.js";

export class Dropdown {
  constructor(elt, data, type) {
    this.elt = elt;
    this.data = data;
    this.type = type;
  }

  getNameTagSelected() {
    let names = [];

    if (tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        names.push(tags[i].name);
      }
    }

    return names;
  }

  renderList() {
    const listElt = this.elt.querySelector("div.dropdown-list");
    listElt.innerHTML = "";

    const ul = document.createElement("ul");
    const items = this.data;
    const namesTags = this.getNameTagSelected();

    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const name = items[i];

        if(namesTags.length > 0) {
          if(namesTags.includes(name)) {
            continue;
          }
        }

        const li = document.createElement("li");
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
    const allDropdowns = document.querySelectorAll("div.dropdown");
    const arrowDropdown = this.elt.querySelector("div.dropdown-button > img");

    // change arrow if dropdown is open or close
    if (this.elt.dataset.open === "false") {
      arrowDropdown.src = "assets/icons/arrow-up.svg";
      
      // remove w-full in all dropdown
      for (let i = 0; i < allDropdowns.length; i++) {
        const element = allDropdowns[i];
        element.classList.remove("w-full");
        element.children[1].classList.remove("flex");
      }
      
      // add w-full in active dropdown
      this.elt.dataset.open = "true";
      this.elt.classList.add("w-full");
      this.elt.children[1].classList.add("flex");
    } else {
      arrowDropdown.src = "assets/icons/arrow-down.svg";
      
      // add w-full in active dropdown
      this.elt.dataset.open = "false";
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
