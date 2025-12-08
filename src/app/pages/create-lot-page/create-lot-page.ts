import {Component, Inject, inject, OnInit} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
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

  selectedFiles: FileList | null = null;
  uploadingImages = false;

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
    endTime: this.fb.control(''),
  });

  createLot() {

    let finalTime: Date;

    if (this.form.value.endTime) {
      // rawEnd: "2025-12-08T21:30"
      const local = new Date(this.form.value.endTime);
      // Remove timezone offset so 21:30 stays 21:30 when serialized as UTC
      finalTime = new Date(local.getTime() - local.getTimezoneOffset() * 60000);
    } else {
      finalTime = new Date();
    }

    let newLot: Lot = {
      id: 0,
      lotNumber: 0,
      title: this.form.value.title ?? '',
      description: this.form.value.description ?? '',
      startingPrice: this.form.value.startingPrice ?? 0,
      estimatedPrice: this.form.value.estimatedPrice ?? 0,
      auctionId: Number(this.auctionId),
      endTime: this.form.value.endTime ? finalTime : new Date(),
      isClosed: false,
    }

    let headers = this.loginService.getLoginHeader()

    this.http.post<Lot>(this.apiUrl, newLot, {headers}).subscribe({
      next: (res: Lot) => {
        this.uploadImagesIfAny(res.id)
        console.log('Lot created successfully:', res);
        this.router.navigate(['/']).then(r => alert(r));
      },
      error: (err) => {
        console.log('Lot failed:', err);
        alert('Noget gik galt med dit lot.');
      }
    });
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFiles = input.files;
  }

  uploadImagesIfAny(lotId: number) {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      return; // nothing to upload
    }

    this.uploadingImages = true;

    this.apiService.uploadImages(lotId, this.selectedFiles).subscribe({
      next: images => {
        console.log('Uploaded images:', images);
        this.uploadingImages = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error uploading images', err);
        this.uploadingImages = false;
      }
    });
  }
}
