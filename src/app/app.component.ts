import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsComponent } from './reactiveForm/reactive-forms/reactive-forms.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef | undefined;
  studentObj: Student = new Student();
  studentList: Student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('students-details');
    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModal() {
    const modal = document.getElementById('myModal');
    if (modal !== null) {
      modal.style.display = 'block';
    }
  }

  editStudent(item: Student) {
    this.studentObj = item;
    this.openModal();
  }

  updateStudent() {
    const currentRecord = this.studentList.find(
      (x) => x.id == this.studentObj.id
    );
    if (currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.mobile = this.studentObj.mobile;
      currentRecord.city = this.studentObj.city;
      currentRecord.state = this.studentObj.state;
      currentRecord.pincode = this.studentObj.pincode;
      currentRecord.address = this.studentObj.address;
      currentRecord.email = this.studentObj.email;
      localStorage.setItem(
        'students-details',
        JSON.stringify(this.studentList)
      );
      this.closeModal();
    }
  }

  deleteStudent(item: Student) {
    const isConfirm = confirm('Are you sure you want to delete this record?');
    if (isConfirm) {
      const currentRecord = this.studentList.findIndex((x) => x.id == item.id);
      this.studentList.splice(currentRecord, 1);
      localStorage.setItem(
        'students-details',
        JSON.stringify(this.studentList)
      );
    }
  }

  closeModal() {
    this.studentObj = new Student();
    if (this.modal != null) {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  saveStudent() {
    // debugger;
    const isLocalPresent = localStorage.getItem('students-details');
    if (isLocalPresent != null) {
      const students = JSON.parse(isLocalPresent);
      this.studentObj.id = students.length + 1;
      students.push(this.studentObj);
      this.studentList = students;
      localStorage.setItem('students-details', JSON.stringify(students));
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('students-details', JSON.stringify(newArr));
    }
    this.closeModal();
  }
}

export class Student {
  id: number = 0;
  name: string = '';
  mobile: string = '';
  city: string = '';
  state: string = '';
  pincode: string = '';
  address: string = '';
  email: string = '';

  constructor() {
    this.id = 0;
    this.name = '';
    this.mobile = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.address = '';
    this.email = '';
  }
}
