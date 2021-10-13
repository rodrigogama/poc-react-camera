import React, { HtmlHTMLAttributes } from 'react';

type SelectProps = {
  label?: string;
} & HtmlHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = ({
  children,
  label,
  ...selectProps
}) => {
  return (
    <label className="text-left w-full md:max-w-md mb-6">
      {label && <span>{label}</span>}
      <select className="select w-full mt-1" {...selectProps}>
        {children}
      </select>
    </label>
  );
};
