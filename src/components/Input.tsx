/**
 * Input Component
 * 
 * Best Practice TextField with:
 * - Label
 * - Placeholder
 * - Icon (left/right)
 * - Helper text (errors)
 * - React Hook Form support
 * - TanStack Form support
 */

import React, { forwardRef } from 'react';

// ============== TYPES ==============

export type InputVariant = 'default' | 'error' | 'success';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label above the input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Icon can be placed left or right */
  icon?: React.ReactNode;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Helper text below (error/success) */
  helperText?: string;
  /** Input variant (default, error, success) */
  variant?: InputVariant;
  /** Full width */
  fullWidth?: boolean;
}

// ============== MAIN COMPONENT ==============

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      icon,
      iconPosition = 'left',
      helperText,
      variant = 'default',
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const wrapperClasses = [
      'flex flex-col',
      fullWidth && 'w-full',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [
      'block text-sm font-medium text-gray-700 mb-1',
      disabled && 'opacity-50',
    ]
      .filter(Boolean)
      .join(' ');

    const inputWrapperClasses = [
      'flex items-center w-full bg-white border rounded-lg',
      'transition-colors duration-200',
      'h-10',
      variant === 'error' && 'border-red-500 focus-within:ring-2 focus-within:ring-red-500/20',
      variant === 'success' && 'border-green-500 focus-within:ring-2 focus-within:ring-green-500/20',
      variant === 'default' && 'border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20',
      disabled && 'bg-gray-50 opacity-50 cursor-not-allowed',
    ]
      .filter(Boolean)
      .join(' ');

    const iconClasses = [
      'flex items-center justify-center',
      iconPosition === 'left' ? 'pl-3 pr-2' : 'pr-3 pl-2',
      'text-gray-400',
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      'flex-1 bg-transparent outline-none',
      'placeholder:text-gray-400 text-gray-900',
      'disabled:cursor-not-allowed',
      '[appearance:none] [-webkit-appearance:none]',
      iconPosition === 'left' && 'pl-0',
      iconPosition === 'right' && 'pr-0',
    ]
      .filter(Boolean)
      .join(' ');

    const helperClasses = [
      'mt-1 text-xs',
      variant === 'error' && 'text-red-600',
      variant === 'success' && 'text-green-600',
      variant === 'default' && 'text-gray-500',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className={labelClasses}>
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
          <div className={inputWrapperClasses}>
            {icon && iconPosition === 'left' && (
              <span className={iconClasses}>{icon}</span>
            )}
            
            <input
              ref={ref}
              placeholder={placeholder}
              disabled={disabled}
              className={inputClasses}
              {...props}
            />
            
            {icon && iconPosition === 'right' && (
              <span className={iconClasses}>{icon}</span>
            )}
          </div>
        </div>
        
        {helperText && (
          <span className={helperClasses}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ============== REACT HOOK FORM INPUT ==============

export interface ReactHookFormInputProps extends Omit<InputProps, 'onChange' | 'onBlur' | 'value' | 'variant'> {
  /** Error message from react-hook-form */
  error?: string;
}

export const ReactHookFormInput = forwardRef<HTMLInputElement, ReactHookFormInputProps>(
  ({ error, helperText, ...props }, ref) => {
    const variant: InputVariant = error ? 'error' : 'default';
    const finalHelperText = error || helperText;

    return (
      <Input
        ref={ref}
        {...props}
        variant={variant}
        helperText={finalHelperText}
      />
    );
  }
);

ReactHookFormInput.displayName = 'ReactHookFormInput';

// ============== TANSTACK FORM INPUT ==============

/**
 * TanStack Form Input
 * 
 * Usage with TanStack Form + Zod:
 * 
 *   import { useForm } from '@tanstack/react-form';
 *   import { zodValidator } from '@tanstack/zod-form-adapter';
 *   import { z } from 'zod';
 *   
 *   const form = useForm({
 *     defaultValues: { email: '' },
 *     validators: { onChange: zodValidator(z.object({ email: z.string().email() })) }
 *   });
 *   
 *   // In your component:
 *   <TanStackFormInput form={form} name="email" label="Email" placeholder="..." />
 * 
 * Or use FormField from @tanstack/react-form:
 * 
 *   <FormField name="email" validators={{ onChange: z.string().email() }}>
 *     {({ field }) => <Input {...field} label="Email" />}
 *   </FormField>
 */

export interface TanStackFormInputProps extends Omit<InputProps, 'onChange' | 'onBlur' | 'value' | 'name' | 'variant'> {
  /** Field name */
  name: string;
  /** The form instance from useForm */
  form: any;
  /** Optional helper text */
  helperText?: string;
}

export const TanStackFormInput = forwardRef<HTMLInputElement, TanStackFormInputProps>(
  ({ name, form, helperText: externalHelperText, ...props }, ref) => {
    // Get field from form - useField requires form in options
    const field = form?.getField?.(name);
    
    const error = field?.meta?.errors?.join(', ');
    const variant: InputVariant = error ? 'error' : 'default';
    const finalHelperText = error || externalHelperText;

    return (
      <Input
        ref={ref}
        {...props}
        name={name}
        value={field?.state?.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => field?.handleChange?.(e)}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => field?.handleBlur?.(e)}
        variant={variant}
        helperText={finalHelperText}
      />
    );
  }
);

TanStackFormInput.displayName = 'TanStackFormInput';

// ============== DEFAULT EXPORT ==============

export default Input;