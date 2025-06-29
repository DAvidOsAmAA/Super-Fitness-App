import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthApiService } from 'apps/SuperFitnessApp/src/lib/auth-api/src/public-api';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent {
  private ngUnsubscribe = new Subject<void>();
  private _authApiService = inject(AuthApiService);
  private fb = inject(FormBuilder);
  private _router = inject(Router);

  forgetForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  errorMessage = '';
  successMessage = '';

  submit() {
    if (this.forgetForm.invalid) return;
    this._authApiService.Forgetpass(this.forgetForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.successMessage = 'Check your email for the verification code.';
          this.errorMessage = '';
          // Optionally navigate to OTP page
          this._router.navigate(['/auth/otp-code']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Failed to send reset email.';
          this.successMessage = '';
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
