import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit {
  
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit() {
  }
  
  isCheck(){
    if(this.todo.completed==true)
      return true;
    else  
      return false;
  }

  setClasses(){
    let completed = this.isCheck();
    let classes = {
      todo:true,
      'is-complete': completed
    }
    return classes;
  }

  onToggle(todo){
    // toggle in UI
    todo.completed = !this.isCheck();

    // toggle on server
    this.todoService.toggleCompleted(todo).subscribe(
      todo=>console.log(todo)
    );
  }

  onDelete(todo){
    this.deleteTodo.emit(todo);
  }
}
