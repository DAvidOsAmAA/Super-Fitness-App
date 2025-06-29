import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthApiService } from 'apps/SuperFitnessApp/src/lib/auth-api/src/public-api';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent {
  private ngUnsubscribe = new Subject<void>();
  private _authApiService = inject(AuthApiService);
  private fb = inject(FormBuilder);
  private _router = inject(Router);

  resetForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]]
  });

  errorMessage = '';
  successMessage = '';

  submit() {
    if (this.resetForm.invalid) return;
    this._authApiService.resetpass(this.resetForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.successMessage = 'Password reset successfully. You can now login.';
          this.errorMessage = '';
          // Optionally navigate to login page
          this._router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Failed to reset password.';
          this.successMessage = '';
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
