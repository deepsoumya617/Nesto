// app/components/VerifyForm.tsx
import { FormEvent } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from './ui/input-otp'
import { Button } from './ui/button'

interface VerifyFormProps {
  handleVerify: (e: FormEvent) => void
  code: string
  setCode: (value: string) => void
}

const VerifyForm = ({ handleVerify, code, setCode }: VerifyFormProps) => {
  console.log(code)
  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleVerify}>
        <div className="font-geist">
          <div className="flex flex-col rounded-md border px-8 py-6">
            <h1 className="text-left text-xl font-bold">
              Complete verification
            </h1>
            <p className="text-muted-foreground">
              Enter your OTP to verify yourself.
            </p>
            <div className="mt-9">
              <InputOTP maxLength={6} value={code} onChange={(e) => setCode(e)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button className="mt-4 mb-4 tracking-wider cursor-pointer" type="submit">
              Verify
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default VerifyForm
