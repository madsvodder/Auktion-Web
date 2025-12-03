import {Component, Inject, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../services/api-service';
import {Auction} from '../../interfaces/auction';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login-service';

@Component({
  selector: 'app-create-auctions-page',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-auction-page.html',
  styleUrl: './create-auction-page.css',
})
export class CreateAuctionPage {

  apiUrl: string = "http://localhost:5264/api/Auction"

  private router = inject(Router);
  private loginService = inject(LoginService);

  constructor(private http: HttpClient, public apiService: ApiService) {}

  fb = inject(NonNullableFormBuilder)

  // Form
  form = this.fb.group({
    title: this.fb.control(''),
    description: this.fb.control(''),
  })

  createAuction() {
    let newAuction: Auction = {
      id: 0,
      title: this.form.value.title ?? '',
      description: this.form.value.description ?? '',
      startDate: new Date(),
      endDate: new Date(),
    }

    let headers = this.loginService.getLoginHeader()

    this.http.post(this.apiUrl, newAuction, {headers}).subscribe({
      next: (res) => {
        console.log('Auction created successfully:', res);
        this.router.navigate(['/']).then(r => alert(r));
      },
      error: (err) => {
        console.log('Auction failed:', err);
        alert('Noget gik galt med din auktion.');
      }
    });
  }
}
