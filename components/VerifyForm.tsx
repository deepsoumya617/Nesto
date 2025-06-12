// app/components/VerifyForm.tsx
import { FormEvent } from 'react';

interface VerifyFormProps {
  handleVerify: (e: FormEvent) => void;
  code: string;
  setCode: (value: string) => void;
}

const VerifyForm = ({ handleVerify, code, setCode }: VerifyFormProps) => {
  return (
    <div className="flex justify-center mt-12 items-center md:mt-20">
      <div className="h-auto bg-blue-700 rounded-xl md:rounded-3xl w-80 md:w-96">
        <div className="p-6 md:p-8">
          <h1 className="mb-6 text-3xl font-light text-white">Verification Code</h1>
          <form onSubmit={handleVerify}>
            <input
              value={code}
              className="block w-full pb-4 pl-4 mb-3 text-sm font-light bg-transparent border-0 border-b-2 h-37 border-blue-900 text-white caret-slate-700 focus:border-white"
              id="code"
              name="code"
              onChange={(e) => setCode(e.target.value)}
            />

            <button
              className="w-full h-12 mb-6 text-sm font-light text-white hover:text-blue-900 hover:bg-white bg-slate-700 rounded-md"
              type="submit"
            >
              Complete sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyForm;
