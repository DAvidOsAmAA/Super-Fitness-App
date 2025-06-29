import { Component, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthApiService } from 'apps/SuperFitnessApp/src/lib/auth-api/src/public-api';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp-code.component.html',
  styleUrls: ['./otp-code.component.scss']
})
export class OtpCodeComponent {
  private ngUnsubscribe = new Subject<void>();
  private _authApiService = inject(AuthApiService);
  private fb = inject(FormBuilder);
  private _router = inject(Router);

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  otpForm: FormGroup = this.fb.group({
    digit1: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
    digit2: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
    digit3: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
    digit4: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
    digit5: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
    digit6: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]]
  });

  errorMessage = '';
  successMessage = '';

  moveToNext(event: any, nextInput: number) {
    const input = event.target;
    if (input.value.length === 1 && nextInput < 6) {
      this.otpInputs.toArray()[nextInput].nativeElement.focus();
    }
    if (event.inputType === 'deleteContentBackward' && nextInput > 0 && !input.value) {
      this.otpInputs.toArray()[nextInput - 1].nativeElement.focus();
    }
  }

  submit() {
    if (this.otpForm.invalid) return;
    const resetCode = Object.values(this.otpForm.value).join('');
    this._authApiService.VerifyCode({ resetCode })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.successMessage = 'Code verified. You can now reset your password.';
          this.errorMessage = '';
          this._router.navigate(['/auth/reset-password']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Invalid code.';
          this.successMessage = '';
        }
      });
  }

  resendCode() {
    // Implement resend logic if needed
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
