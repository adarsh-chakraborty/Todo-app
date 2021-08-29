class TodoItem {
	constructor(todo) {
		this.todo = todo;
		this.isCompleted = false;
		this.isNewTodo = true;
	}
}

let todoData = JSON.parse(localStorage.getItem('persistantData')) ?? [];

const inputBox = document.getElementById('inputBox');
const btnAdd = document.getElementById('btnAdd');
const listData = document.getElementById('listData');

inputBox.addEventListener('keydown', ({ key }) => {
	if (key === 'Enter') {
		addNewTodo();
	}
});

btnAdd.addEventListener('click', addNewTodo);

{
	/* <div class="bg-gray-300 rounded-md shadow-lg p-2">
                    <div class="flex justify-between px-2">
                        <div>
                            todo Item 1
                        </div>
                        <div class="flex space-x-1 text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>

                        </div>
                    </div>
                </div>
                <!--Card Ends here-- > */
}

function refresh() {
	if (todoData.length > 0) {
		// has data
		let html = '';
		for ([index, todo] of todoData.entries()) {
			html += `
            <div class="${
							todo.isCompleted ? 'bg-green-300' : 'bg-gray-300'
						} rounded-md shadow-lg p-2 ${
				todo.isNewTodo ? `newtodo hidden` : ''
			}">
                    <div class="flex justify-between px-2">
                        <p class="w-64 font-poppins">
                            ${todo.todo}
                        </p>
                        <div class="flex space-x-1 text-gray-800 items-center">
                            ${
															!todo.isCompleted
																? `<div
																	id="completeTodo"
																	onClick="completeTodo(${index});"
																	class="cursor-pointer"
																>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		class="h-6 w-6"
																		fill="none"
																		viewBox="0 0 24 24"
																		stroke="currentColor"
																	>
																		<path
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			stroke-width="2"
																			d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
																		/>
																	</svg>
																</div>`
																: `<div
																	id="uncompleteTodo"
																	onClick="undocompleteTodo(${index});"
																	class="cursor-pointer"
																>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		class="h-6 w-6"
																		fill="none"
																		viewBox="0 0 24 24"
																		stroke="currentColor"
																	>
																		<path
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			stroke-width="2"
																			d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
																		/>
																	</svg>
																</div>`
														}

                            <div id="deleteTodo" onClick="deleteTodo(${index});" class="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg></div>

                            <div id="moveUp" onClick="moveItemUp(${index});" class="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg></div>

                            <div id="moveDown" onClick="moveItemDown(${index});" class="cursor-pointer">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg></div>

                        </div>
                    </div>
                </div>
            `;
		}

		listData.innerHTML = html;
	} else {
		listData.innerHTML = `<h1>Your todo list is empty..</h1>`;
	}
	addNewTodoAnimation();
}

function addNewTodoAnimation() {
	const item = document.querySelector('.newtodo');
	if (item) {
		$(item).show('slow').removeClass('newtodo');
		todoData[todoData.length - 1].isNewTodo = false;
		localStorage.setItem('persistantData', JSON.stringify(todoData));
	}
}

function completeTodo(currentIndex) {
	const item = document.querySelector('.todocompleted');
	// $(item).toggleClass('bg-gray-300 bg-green-300');
	todoData[currentIndex].isCompleted = true;
	localStorage.setItem('persistantData', JSON.stringify(todoData));
	refresh();
}

function undocompleteTodo(currentIndex) {
	todoData[currentIndex].isCompleted = false;
	localStorage.setItem('persistantData', JSON.stringify(todoData));
	refresh();
}

function deleteTodo(currentIndex) {
	todoData = todoData.filter((item, index) => {
		if (currentIndex != index) return item;
	});
	refresh();
}

function moveItemUp(currentIndex) {
	if (currentIndex == 0) {
		return;
	}
	let temp = todoData[currentIndex - 1];
	todoData[currentIndex - 1] = todoData[currentIndex];
	todoData[currentIndex] = temp;
	refresh();
	console.log(currentIndex);
	console.log(currentIndex);
}

function moveItemDown(currentIndex) {
	if (currentIndex == todoData.length - 1) {
		return;
	}
	let temp = todoData[currentIndex + 1];
	todoData[currentIndex + 1] = todoData[currentIndex];
	todoData[currentIndex] = temp;
	refresh();
	console.log(currentIndex);
}

function addNewTodo() {
	if (!inputBox.value.trim()) {
		alert('Enter something to add to your list!');
		return;
	}
	let todoItem = new TodoItem(inputBox.value);
	inputBox.value = '';
	// do something with todoItem
	todoData.push(todoItem);
	refresh();
}

refresh();