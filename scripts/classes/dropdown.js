import { tags } from "../utils/search.js";
import { updateTags } from "../utils/tag.js";

export class Dropdown {
  constructor(elt, type) {
    this.elt = elt;
    this.type = type;
    this.data = [];
  }

  init() {
    // add input event on each dropdown
    this.addInputEvent();
    
    // add click event on each dropdown
    this.addClickEvent();
  }
  
  // EVENTS
  addClickEvent() {
    const arrow = this.elt.querySelector("div.dropdown-button > img");
    arrow.addEventListener("click", () => this.toggleDropdown());
  }

  addInputEvent() {
    const input = this.elt.querySelector("div.dropdown-button > form > input");
    input.addEventListener("input", (e) => this.filteredListDropdown(null, e));
  }

  // TAGS SECTION
  getNameTagSelected() {
    let names = [];

    if (tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        names.push(tags[i].name);
      }
    }

    return names;
  }

  addTag(name) {
    // add tag selected in tag array
    tags.push({
      name: name,
      type: this.type,
    });

    // update tags array
    updateTags(tags);

    // clear input
    const input = this.elt.querySelector("div.dropdown-button > form > input");
    input.value = "";
  }

  // DROPDOWN SECTION
  toggleDropdown() {
    console.log(this.elt);
    const allDropdowns = document.querySelectorAll("div.dropdown");
    const arrowDropdown = this.elt.querySelector("div.dropdown-button > img");

    // change arrow if dropdown is open or close
    if (this.elt.dataset.open === "false") {
      // close all dropdowns if open new dropdown
      allDropdowns.forEach((element) => {
        const arrow_elt = element.querySelector("div.dropdown-button > img");
        
        arrow_elt.src = "assets/icons/arrow-down.svg";
        element.dataset.open = "false";
        element.classList.remove("w-full");
        element.children[1].classList.remove("flex");
      })
      
      // display arrow up img
      arrowDropdown.src = "assets/icons/arrow-up.svg";

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

  renderList(items) {
    const listElt = this.elt.querySelector("div.dropdown-list");
    listElt.innerHTML = "";

    const ul = document.createElement("ul");
    const namesTags = this.getNameTagSelected();

    if (items.length > 0) {
      items.filter(item => !namesTags.includes(item)).forEach((name) => {
        const li = document.createElement("li");
        li.tabIndex = 0;
        li.innerHTML = name;

        // create event listener & pass name in add tag function
        li.addEventListener("click", () => this.addTag(name));
        li.addEventListener("keypress", (e) => {
          if (e.key === 'Enter') {
            this.addTag(name);
            e.preventDefault();
          }
        });

        ul.appendChild(li);
      });
      
    } else {
      // create not found message
      const li = document.createElement("li");
      li.innerHTML = "Aucun résultat";
      ul.appendChild(li);
    }

    listElt.appendChild(ul);
  }

  filteredListDropdown(data, event) {
    if(data) {
      this.data = data;
    }
    
    // return full data if not input event
    if (!event) return this.renderList(this.data);

    const searchString = event.target.value.toLowerCase();
    let response = new Array();

    // if input value is superior at 2
    if (searchString.length > 0) {
      for (let i = 0; i < this.data.length; i++) {
        const name = this.data[i].toLowerCase();

        // check if value is present in this.data
        if (name.includes(searchString)) {
          response.push(name);
        }
      }
    } else {
      response = this.data;
    }

    return this.renderList(response);
  }
}
