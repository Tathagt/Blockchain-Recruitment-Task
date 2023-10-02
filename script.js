const list_l = document.getElementById("list");
const create_btn_l = document.getElementById("create");

let list = [];

create_btn_l.addEventListener('click', CreateNewList);

function CreateNewList () {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    list.unshift(item);

    const{item_l, input_l} = CreateListElement(item);

    list_l.prepend(item_l);

    input_l.removeAttribute("disabled");
    input_l.focus();

    keep();
}

function CreateListElement(item) {
    const item_l = document.createElement("div");
    item_l.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if(item.complete) {
        item_l.classList.add("complete");
    }

    const input_l = document.createElement("input");
    input_l.type = "text";
    input_l.value = item.text;
    input_l.setAttribute("disabled", "");

    const actions_l = document.createElement("div");
    actions_l.classList.add("actions");

    const edit_btn_l = document.createElement("button");
    edit_btn_l.classList.add("material-icons");
    edit_btn_l.innerText = "edit";

    const remove_btn_l = document.createElement("button");
    remove_btn_l.classList.add("material-icons", "remove-btn");
    remove_btn_l.innerText = 'remove_circle';

    actions_l.append(edit_btn_l);
    actions_l.append(remove_btn_l);

    item_l.append(checkbox);
    item_l.append(input_l);
    item_l.append(actions_l);

    checkbox.addEventListener("change", ()=> {
        item.complete = checkbox.checked;

        if(item.complete) {
            item_l.classList.add("complete");
        }
        else {
            item_l.classList.remove("complete");
        }

        keep();
    });

    input_l.addEventListener("input", ()=>{
        item.text = input_l.value;
    });

    input_l.addEventListener("blur", () => {
        input_l.setAttribute("disabled", "");
        keep();
    });

    edit_btn_l.addEventListener("click", () => {
        input_l.removeAttribute("disabled");
        input_l.focus();
    });

    remove_btn_l.addEventListener("click", () => {
        list = list.filter(t => t.id != item.id);

        item_l.remove();

        keep();
    });

    return { item_l, input_l, edit_btn_l, remove_btn_l}
}

function display() {
    Load();

    for(let i = 0; i<list.length;i++){
        const item = list[i];

        const { item_l } = CreateListElement(item);

        list_l.append(item_l);
    }
}

display();

function keep() {
    const keep = JSON.stringify(list);

    localStorage.setItem("mytasks", keep);
}


function Load() {
    const data = localStorage.getItem("mytasks");

    if(data) {
        list = JSON.parse(data);
    }
}