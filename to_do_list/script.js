
(() => { 

    window.onload = () => {
      displayTasks();
    };
    /* 显示储存的任务清单 */
    const displayTasks = () => {
      let tasks = Object.keys(localStorage);
      
      /* 清楚当前显示内容 */
      const ul = document.querySelector(".toDoList");
      ul.innerHTML = '';

      /* 显示所有任务 */
      for (let key of tasks) {
        let taskValue = localStorage.getItem(key);
        addItemToDOM(key , taskValue);
        addItemToArray(key, taskValue);
      }
    };
    const updateStorage = (index, taskValue) => {
      localStorage.setItem(index, taskValue);
      displayTasks();
    };

    /* 状态变量 */
    let toDoListArray = [];

    /* ui 变量 */
    const form = document.querySelector(".form"); 
    const input = form.querySelector(".form_input");
    const ul = document.querySelector(".toDoList"); 
  
    /* 事件监听 */
    form.addEventListener('submit', e => {
      
      /* 页面重新加载时防止默认行为 */
      e.preventDefault();
      
      /* 为项提供唯一 ID */
      let itemId = String(Date.now());
      
      /* 获取和分配输入值 */
      let toDoItem = input.value;
      
      /* 添加任务到本地储存 */
      updateStorage(itemId, toDoItem);

      /* 清除输入框 */
      input.value = '';
    });
    
    ul.addEventListener('click', e => {
      let id = e.target.getAttribute('data-id')
      if (!id) return 
      
      /* 移除任务显示 */
      removeItemFromDOM(id);
      removeItemFromArray(id);
      /* 移除任务本地存储 */
      localStorage.removeItem(id)
    });
    
    function addItemToDOM(itemId, toDoItem) {    
      
      // 创建一个列表
      const li = document.createElement('li')
      li.setAttribute("data-id", itemId);
      
      // 将 todoItem 中的内容添加到列表中
      li.innerText = toDoItem
      
      // 将 li 添加到 DOM
      ul.appendChild(li);
    }
    
    function addItemToArray(itemId, toDoItem) {
      
      // 将项作为 ID 为的对象添加到数组中，以便以后可以查找和删除它
      toDoListArray.push({ itemId, toDoItem});
      console.log(toDoListArray)
    }
    
    function removeItemFromDOM(id) {
    
      // 按数据 ID 获取列表项
      var li = document.querySelector('[data-id="' + id + '"]');
      
      // 删除列表项
      ul.removeChild(li);
    }
    
    function removeItemFromArray(id) {
      
      // 创建一个新的 toDoListArray，包含所有与 ID 不匹配的列表
      toDoListArray = toDoListArray.filter(item => item.itemId !== id);
      console.log(toDoListArray);
    }
    
  })();