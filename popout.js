document.querySelector('.create-todo').addEventListener('click', function(){
  document.querySelector('.new-item').style.display='block';
});

document.querySelector('.new-item button').addEventListener('click', function(){
  var itemName = document.querySelector('.new-item input').value;

  if(itemName != ''){

    if(localStorage.getItem('todo-items') == null){
      localStorage.setItem("todo-items", "[]")
    }
    var itemsStorage = localStorage.getItem('todo-items');

    // console.log(itemsStorage);
    var itemsArr = JSON.parse(itemsStorage);
    console.log(itemsArr);
    itemsArr.push({"item": itemName, "status": 0});
    console.log(itemsArr);

    saveItems(itemsArr);
    fetchItems();
    document.querySelector('.new-item input').value='';
    document.querySelector('.new-item').style.display='none';

  }
});

function fetchItems(){
  const itemsList = document.querySelector('ul.todo-items');
  itemsList.innerHTML = '';
  var newItemHTML = '';
  try{
    var itemsStorage = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(itemsStorage)

    for (var i = 0; i < itemsArr.length; i++) {
      var status = '';
      if(itemsArr[i].status == 1){
        status = 'class="done"';
      };
      newItemHTML += `<li data-itemindex="${i}" ${status}>
      <span class="item">${itemsArr[i].item}</span>
      <div><span class="itemComplete">✅</span><span class="itemDelete">🗑</span></div>
    </li>`;
    };

    itemsList.innerHTML = newItemHTML;

    var itemsListUL = document.querySelectorAll('ul li');
    for (var i = 0; i < itemsListUL.length; i++) {
      itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function(){
        var index = this.parentNode.parentNode.dataset.itemindex;
        itemComplete(index)
      });
      itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function(){
        var index = this.parentNode.parentNode.dataset.itemindex;
        itemDelete(index)
      });
    }

  }catch(e){
    // create a default list 
  }
}

function itemComplete(index){
  var itemsStorage = localStorage.getItem('todo-items');
  var itemsArr = JSON.parse(itemsStorage);

  console.log(itemsArr);
  console.log(index);

  itemsArr[index].status = 1;
  
  saveItems(itemsArr);

  document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className='done';
}

function itemDelete(index){
  var itemStorage = localStorage.getItem('todo-items');
  var itemsArr = JSON.parse(itemStorage)

  itemsArr.splice(index, 1);

  saveItems(itemsArr);

  document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').remove();  
}

function saveItems(obj){
  var string = JSON.stringify(obj);
  localStorage.setItem('todo-items', string)
}

fetchItems()