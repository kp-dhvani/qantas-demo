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
