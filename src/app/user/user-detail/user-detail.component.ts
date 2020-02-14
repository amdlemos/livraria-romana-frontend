import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: []
})
export class UserDetailComponent implements OnInit, OnDestroy {
 

  selectedUser: User;
  private userIndex: number;
  private subscription: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,) { }

    ngOnInit() {    
      console.log("user datail init")
      this.subscription = this.route.params.subscribe(
        (params: any) => {
          this.userIndex = params['id'];                  
          this.userService.get(this.userIndex)
            .toPromise()
            .then(data => this.selectedUser = data);          
        }
      )
    }
  
    onEdit() {
      this.router.navigate(['/user', this.userIndex, 'edit']);
    }
  
    onCancel() {
      this.navigateBack();
    }
  
    private navigateBack() {
      this.router.navigate(['/user']);
    }
  
    onDelete(){
      // refatorar
      if (confirm("Você tem certeza que deseja excluir o usuário: " + this.selectedUser.username + "?")) {
        this.userService.delete(this.userIndex)
          .subscribe(
            data => {            
              this.userService.refreshList();
              this.toastr.success("Usuário excluido com sucesso.")
              this.router.navigate(["user"]);
            },
            err => {
              alert("Usuário não removido.");
            }
          );
      }
    }
  
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
