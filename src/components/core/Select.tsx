import React from "react";

interface Option {
	value: string;
	label: string;
}

interface SelectProps {
	options: Option[];
	value: string;
	onChange: (value: string) => void;
	label?: string;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	required?: boolean;
	name?: string;
	id?: string;
}

const Select: React.FC<SelectProps> = ({
	options,
	value,
	onChange,
	label,
	placeholder = "Select an option",
	className = "",
	disabled = false,
	required = false,
	name,
	id,
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value);
	};

	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label htmlFor={id} className="text-sm font-medium text-gray-700">
					{label}
				</label>
			)}
			<select
				id={id}
				name={name}
				value={value}
				onChange={handleChange}
				disabled={disabled}
				required={required}
				className={`
          block w-full px-3 py-2 
          bg-white border border-gray-300 rounded-md 
          shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
          focus:border-blue-500 text-sm
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"}
          ${className}
        `}
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
