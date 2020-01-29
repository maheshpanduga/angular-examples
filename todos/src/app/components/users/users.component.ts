import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  editing = {};
  rows = [];
  columns = [];
  selected:any[] = [];
  userForm:FormGroup;
  sequence:number = 10;

  @ViewChild('customCheckbox', {static: true}) public customCheckbox: TemplateRef<any>;
  @ViewChild('editBtn', {static: true}) public editBtn: TemplateRef<any>;

  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, 
    private userService: UsersService) {

    this.userService.getUsers().subscribe(data => {
      this.rows = data;
    });

    this.userForm = formBuilder.group({
      ID: new FormControl(''),
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.columns = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerCheckboxable: true,
        checkboxable: true,
        width: 100
      },
      { name: 'ID', prop: 'ID' },
      { name: 'User Name', prop: 'UserName' },
      { name: 'Password', prop: 'Password' },
      { name: 'Options', width: 100, cellTemplate: this.editBtn}
    ];
  }
  
  addUser(dialog:string){
    this.userForm.setValue({
      ID: '',
      UserName: '',
      Password: ''
    });
    this.modalService.open(dialog, {ariaLabelledBy: 'modal-basic-title'});
  }

  onSelect(row:any) {
    console.log(row);
  }

  updateUser(dialog:any, row:any){
    console.log('ROW :: '+row);
    this.userForm.setValue({
      ID: (row['ID'] ? row['ID'] : ''),
      UserName: (row['UserName'] ? row['UserName'] : ''),
      Password: (row['Password'] ? row['Password'] : '')
    });
    this.modalService.open(dialog, {ariaLabelledBy: 'modal-basic-title'});
  }

  saveUser(isUpdate:boolean){
    let user = {
      ID: this.userForm.get('ID'),
      UserName: this.userForm.get('UserName'),
      Password: this.userForm.get('Password')
    };
    if(isUpdate){
      this.userService.saveUser(user);
    }else{
      this.userService.updateUser(user);
    }
  }

}
