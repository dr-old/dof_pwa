import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { styled } from "@mui/material";
import { PasswordElement, TextFieldElement } from "react-hook-form-mui";

interface FormProps {
  title?: string;
  footer?: any;
  defaultValues: any;
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  card?: boolean;
  className?: string;
}

export const Form: React.FC<FormProps> = ({
  title,
  footer,
  defaultValues,
  children,
  onSubmit,
  card,
  className,
}) => {
  const methods = useForm({ defaultValues });

  const handleSubmit = async (data: any) => {
    await onSubmit(data);
    methods.reset();
  };

  if (card) {
    return (
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={className}>
          {Array.isArray(children)
            ? children.map((child) => {
                return child.props.name
                  ? React.createElement(child.type, {
                      ...{
                        ...child.props,
                        register: methods.register,
                        key: child.props.name,
                        errors: methods.formState.errors,
                      },
                    })
                  : child;
              })
            : children}
        </form>
      </FormProvider>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {Array.isArray(children)
          ? children.map((child) => {
              return child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      register: methods.register,
                      key: child.props.name,
                      errors: methods.formState.errors,
                    },
                  })
                : child;
            })
          : children}
      </form>
    </FormProvider>
  );
};

interface InputProps {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

const BorderlessTextField = styled(TextFieldElement)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius * 2.5,
    backgroundColor: theme.palette.background.paper,
    "& fieldset": {
      // borderWidth: 1,
      // borderColor: theme.palette.divider,
      border: "none",
    },
    "&:hover fieldset": {
      // borderWidth: 1,
      // borderColor: theme.palette.divider,
      border: "none",
    },
    "&.Mui-focused fieldset": {
      // borderWidth: 1,
      // borderColor: theme.palette.divider,
      border: "none",
    },
    "& input": {
      fontSize: "0.75rem", // Set font size for input text
      padding: "12px 15px", // Adjust padding for input text
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.75rem", // Set font size for the label if needed
    color: theme.palette.text,
    paddingTop: "3px",
  },
}));

const BorderlessPassword = styled(PasswordElement)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius * 2.5,
    backgroundColor: theme.palette.background.paper,
    "& fieldset": {
      // borderWidth: 1,
      // borderColor: theme.palette.divider,
      border: "none",
    },
    "&:hover fieldset": {
      // borderWidth: 1,
      // borderColor: theme.palette.divider,
      border: "none",
    },
    "&.Mui-focused fieldset": {
      // borderWidth: 1,
      // borderColor: theme.palette.divider,
      border: "none",
    },
    "& input": {
      fontSize: "0.75rem", // Set font size for input text
      padding: "12px 15px", // Adjust padding for input text
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.75rem", // Set font size for the label if needed
    color: theme.palette.text,
    paddingTop: "3px",
  },
}));

export const Input: React.FC<InputProps> = ({ name, label, type, ...rest }) => {
  if (type === "password") {
    return (
      <BorderlessPassword
        name={name}
        label={label}
        type={type}
        size="small"
        margin="normal"
        {...rest}
      />
    );
  }

  return (
    <BorderlessTextField
      name={name}
      label={label}
      type={type}
      size="small"
      margin="normal"
      {...rest}
    />
  );
};

// interface TextareaProps {
//   register?: any;
//   name: string;
//   iconSuffix?: ReactNode;
//   iconPrefix?: ReactNode;
//   rules?: any;
//   errors?: any;
//   className?: string;
//   [key: string]: any;
// }

// export const Textarea: React.FC<TextareaProps> = ({
//   register,
//   name,
//   placeholder,
//   iconSuffix,
//   iconPrefix,
//   rules,
//   errors,
//   className,
//   ...rest
// }) => {
//   return (
//     <FormContainer
//       name={name}
//       labelLeft={name}
//       error={errors[name] && <ErrorMessage message={errors[name].message} />}
//       className={className}
//       iconPrefix={iconPrefix}
//       iconSuffix={iconSuffix}>
//       <textarea
//         {...register(name, rules)}
//         {...rest}
//         rows={3}
//         placeholder={placeholder}
//         className={`block w-full text-xs rounded-lg py-3 px-3 md:py-2 md text-gray-900 dark:text-gray-100 bg-gray-100/40 dark:bg-gray-700/30 border-[1px] placeholder:text-gray-400 dark:placeholder-gray-500 focus:border-[1px] sm:text-xs sm:leading-6 ${
//           errors[name]
//             ? "border-red-500 dark:border-red-600"
//             : "border-gray-200 dark:border-gray-600 focus:border-indigo-600"
//         }`}
//       />
//     </FormContainer>
//   );
// };

// interface SelectProps {
//   register?: any;
//   name: string;
//   placeholder?: string;
//   type?: number;
//   options: any;
//   iconSuffix?: ReactNode;
//   iconPrefix?: ReactNode;
//   rules?: any;
//   errors?: any;
//   className?: string;
//   [key: string]: any;
// }

// export const SelectOption: React.FC<SelectProps> = ({
//   register,
//   name,
//   type = 1,
//   options,
//   placeholder,
//   iconSuffix,
//   iconPrefix,
//   rules,
//   errors,
//   className,
//   ...rest
// }) => {
//   return (
//     <FormContainer
//       name={name}
//       labelLeft={name}
//       error={errors[name] && <ErrorMessage message={errors[name].message} />}
//       className={className}
//       iconPrefix={iconPrefix}
//       iconSuffix={iconSuffix}>
//       <select
//         {...register(name, rules)}
//         {...rest}
//         placeholder={placeholder}
//         className={`block w-full appearance-none text-xs rounded-lg py-3 px-3 md:py-2 md text-gray-900 dark:text-gray-100 bg-gray-100/40 dark:bg-gray-700/30 border-[1px] placeholder:text-gray-400 dark:placeholder-gray-500 focus:border-[1px] sm:text-xs sm:leading-6 ${
//           errors[name]
//             ? "border-red-500 dark:border-red-600"
//             : "border-gray-200 dark:border-gray-600 focus:border-indigo-600"
//         }`}>
//         {/* Default empty option */}
//         <option value="">{placeholder || `Select ${name}`}</option>
//         {/* Render options based on type */}
//         {type === 2
//           ? options.map((i: any) => (
//               <option key={i.value} value={i.value}>
//                 {i.label}
//               </option>
//             ))
//           : options.map((value: any) => (
//               <option key={value} value={value}>
//                 {value}
//               </option>
//             ))}
//       </select>
//     </FormContainer>
//   );
// };

// interface RadioProps {
//   register?: any;
//   name: string;
//   options: { value: string; label: string }[];
//   rules?: any;
//   errors?: any;
//   className?: string;
//   [key: string]: any;
// }

// export const Radio: React.FC<RadioProps> = ({
//   register,
//   name,
//   options,
//   rules,
//   errors,
//   className,
//   ...rest
// }) => {
//   return (
//     <FormContainer
//       name={name}
//       labelLeft={name}
//       className={className}
//       error={errors[name] && <ErrorMessage message={errors[name].message} />}>
//       <div className={`flex flex-col space-y-2`}>
//         {options.map((option) => (
//           <label key={option.value} className="flex items-center space-x-2">
//             <input
//               type="radio"
//               value={option.value}
//               {...register(name, rules)}
//               {...rest}
//               className={`text-blue-500 dark:text-blue-400 bg-gray-100/40 dark:bg-gray-700/30 border-[1px] focus:ring-0 ${
//                 errors[name]
//                   ? "border-red-500 dark:border-red-600"
//                   : "border-gray-200 dark:border-gray-600"
//               }`}
//             />
//             <span className="text-gray-900 dark:text-gray-100 text-xs">
//               {option.label}
//             </span>
//           </label>
//         ))}
//       </div>
//     </FormContainer>
//   );
// };

// interface CheckboxProps {
//   register?: any;
//   name: string;
//   label: string;
//   rules?: any;
//   errors?: any;
//   className?: string;
//   [key: string]: any;
// }

// export const Checkbox: React.FC<CheckboxProps> = ({
//   register,
//   name,
//   label,
//   rules,
//   errors,
//   className,
//   ...rest
// }) => {
//   return (
//     <FormContainer
//       name={name}
//       labelLeft={name}
//       className={className}
//       error={errors[name] && <ErrorMessage message={errors[name].message} />}>
//       <label className="flex items-center space-x-2">
//         <input
//           type="checkbox"
//           {...register(name, rules)}
//           {...rest}
//           className={`text-blue-500 dark:text-blue-400 bg-gray-100/40 dark:bg-gray-700/30 border-[1px] focus:ring-0 ${
//             errors[name]
//               ? "border-red-500 dark:border-red-600"
//               : "border-gray-200 dark:border-gray-600"
//           }`}
//         />
//         <span className="text-gray-900 dark:text-gray-100 text-xs">
//           {label}
//         </span>
//       </label>
//     </FormContainer>
//   );
// };

// interface ButtonProps {
//   disabled?: boolean;
//   label: string;
//   type?: string;
//   mode?: string;
//   className?: string;
//   onClick?: () => void;
//   preffix?: any;
//   suffix?: any;
//   [key: string]: any;
// }

// export const Button = ({
//   mode,
//   type,
//   disabled,
//   label,
//   onClick,
//   className,
//   preffix,
//   suffix,
//   ...rest
// }: ButtonProps) => {
//   let clr =
//     "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-200 dark:ring-gray-500 dark:hover:bg-gray-500";
//   if (mode === "danger") clr = "bg-red-600 hover:bg-red-500 text-white";
//   if (mode === "success") clr = "bg-green-600 hover:bg-green-500 text-white";
//   if (mode === "primary") clr = "bg-blue-600 hover:bg-blue-500 text-white";

//   if (type === "button") {
//     return (
//       <button
//         {...rest}
//         onClick={onClick}
//         disabled={disabled}
//         className={`inline-flex w-full justify-center ${clr} rounded-md  px-3 py-2 text-sm font-semibold shadow-sm sm:w-auto ${
//           disabled ? "opacity-50 cursor-not-allowed" : ""
//         } ${className}`}>
//         {preffix}
//         {label}
//         {suffix}
//       </button>
//     );
//   }

//   return (
//     <button
//       {...rest}
//       type="submit"
//       disabled={disabled}
//       className={`inline-flex w-full justify-center ${clr} rounded-md  px-3 py-2 text-sm font-semibold shadow-sm sm:w-auto ${
//         disabled ? "opacity-50 cursor-not-allowed" : ""
//       } ${className}`}>
//       {label}
//     </button>
//   );
// };
