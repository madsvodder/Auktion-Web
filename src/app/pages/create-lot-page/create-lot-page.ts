import {Component, Inject, inject, OnInit} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../services/api-service';
import {Auction} from '../../interfaces/auction';
import {Lot} from '../../interfaces/lot';
import {LoginService} from '../../services/login-service';

@Component({
  selector: 'app-create-lot-page',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './create-lot-page.html',
  styleUrl: './create-lot-page.css',
})
export class CreateLotPage implements OnInit {

  public auctionId: string | null = "";

  ngOnInit() {
    this.auctionId = this.route.snapshot.paramMap.get('id');
  }

  apiUrl: string = "http://localhost:5264/api/Lot"

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private loginService = inject(LoginService);


  constructor(private http: HttpClient, public apiService: ApiService) {}

  fb = inject(NonNullableFormBuilder)

  // Form
  form = this.fb.group({
    title: this.fb.control(''),
    description: this.fb.control(''),
    estimatedPrice: this.fb.control(0),
    startingPrice: this.fb.control(0),
  });

  createLot() {
    let newLot: Lot = {
      id: 0,
      lotNumber: 0,
      title: this.form.value.title ?? '',
      description: this.form.value.description ?? '',
      startingPrice: this.form.value.startingPrice ?? 0,
      estimatedPrice: this.form.value.estimatedPrice ?? 0,
      auctionId: Number(this.auctionId),
    }

    let headers = this.loginService.getLoginHeader()

    this.http.post(this.apiUrl, newLot, {headers}).subscribe({
      next: (res) => {
        console.log('Lot created successfully:', res);
        this.router.navigate(['/']).then(r => alert(r));
      },
      error: (err) => {
        console.log('Lot failed:', err);
        alert('Noget gik galt med dit lot.');
      }
    });
  }
}
