import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Users } from 'src/user';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.scss']
})
export class EditPhotoComponent implements OnInit {

  userId!: number;
  user!: Users;

  constructor(private profileService: ProfileService, private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit(): void {
    this.user = this.profileService.getUser();
    this.userId = this.route.snapshot.params['userId'];
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        this.user.photo = event.target?.result as string;
      }
      this.profileService.updateProfile(this.userId, this.user);
    }
  }
}
