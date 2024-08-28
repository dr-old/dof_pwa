import React from "react";

interface FormContainerProps {
  name: string;
  iconSuffix?: React.ReactNode;
  iconPrefix?: React.ReactNode;
  children: React.ReactNode;
  error?: React.ReactNode;
  labelLeft?: string;
  labelRight?: string;
  className?: string;
}

const FormContainer: React.FC<FormContainerProps> = ({
  name,
  iconSuffix,
  iconPrefix,
  labelLeft,
  labelRight,
  children,
  error,
  className,
}) => {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <div className="flex flex-row items-center justify-between">
        {labelLeft && (
          <label
            htmlFor={name}
            className="block text-xs font-normal leading-6 text-gray-400 uppercase mr-3 dark:text-gray-300">
            {labelLeft}
          </label>
        )}
        {labelRight && (
          <label
            htmlFor={name}
            className="block text-xs font-normal leading-6 text-gray-400 lowercase ml-3 dark:text-gray-300">
            {labelRight}
          </label>
        )}
      </div>
      <div className="flex-1">
        <div className={`relative flex items-center`}>
          {iconPrefix}
          {children}
          {iconSuffix}
        </div>
        {error}
      </div>
    </div>
  );
};

export default FormContainer;
