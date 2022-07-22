class Dropdown {
  constructor(elt, data) {
    this.elt = elt;
    this.data = data;
  }

  renderList() {
    const listElt = this.elt.querySelector("div.dropdown-list");
    listElt.innerHTML = '';

    this.elt.classList.add('w-full');

    const ul = document.createElement("ul");

    this.data.forEach((name) => {
      const li = document.createElement("li");
      li.innerHTML = name;
      ul.appendChild(li);
    });

    listElt.appendChild(ul);
  }

  openDropdown() {
    this.elt.classlist.add('w-full');
  }

  closeDropdown() {}
}
