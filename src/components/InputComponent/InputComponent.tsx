import { InputProps } from '@/@types/components/InputComponent/InputComponent';
import { forwardRef, useId } from 'react';

// eslint-disable-next-line react/display-name
export const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, error, ...props }, ref) => {
    const inputId = useId();

    return (
      <div className="relative flex h-20 flex-col">
        <input
          placeholder=""
          id={inputId}
          type={type}
          ref={ref}
          {...props}
          className={`peer rounded-lg border-2 bg-color1 px-2 py-2 text-black ${
            error ? 'border-[red]' : 'border-color2'
          }`}
        />

        <label
          htmlFor={inputId}
          className="absolute -top-3 left-2 scale-x-90 cursor-text bg-color1 px-1 text-black duration-200 peer-placeholder-shown:left-2 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:scale-x-90"
        >
          {label}
        </label>

        {error && <p className="text-sm text-[red]">{error}</p>}
      </div>
    );
  },
);
